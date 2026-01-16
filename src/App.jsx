import {useEffect, useState} from 'react'
import { useRef } from 'react'
import './App.css'
import {getRestRefreshToken} from './components/restRefreshToken.jsx'
import {getRestAccessToken} from './components/restAccessToken.jsx'
import { GetSettingsTime } from './components/restGetSettingsTime.jsx'
import { GetNewestNotTime } from './components/restGetNewestNotTime.jsx'
import {GetNotifications} from './components/restGetNots.jsx'
import { LoginForm } from './components/loginForm.jsx'
import { UiFooter } from './components/UiFooter.jsx'
import { UiHeader } from './components/UiHeader.jsx'
import { UiHeaderNotLoggedIn } from './components/uiHeaderNotLoggedIn'
	
function App() {
	let webURLText = "  ";
	const headerVersionNumber = useRef(Math.floor(Math.random()*9)+1+"."+Math.floor(Math.random()*99)+1);
	const [count, setCount] = useState(0);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState({
		receivedRefreshToken: null,
		receivedAccessToken: null
	});
	const [accessStatus, setAccessStatus] = useState("");
	const [userData, setUserData] = useState([]);
	const [status, setStatus] = useState("N/A");
	const [currentNotTime, setCurrentNotTime] = useState("");
	const [currentSetTime, setCurrentSetTime] = useState("");
	const [setTimeHasChanged, setSetTimeHasChanged] = useState(false);
	const currentNotTimeRef = useRef(currentNotTime);
	const currentSetTimeRef = useRef(currentSetTime);
	const setTimeHasChangedRef = useRef(setTimeHasChanged);
//	const [settingsTime, setSettingsTime] = useState("");
//	const [newestNotTime, setNewestNotTime] = useState("");
	const [notAllRefresh, setNotAllRefresh] = useState(0);
	const [urls, setUrls] = useState({
			login: null,
			refresh: null,
			notAll: null,
			set: null,
			notTop1: null
		});	
	useEffect(()=>{
		currentNotTimeRef.current = currentNotTime;
	},[currentNotTime]);
	
	useEffect(()=>{
		currentSetTimeRef.current = currentSetTime;
	},[currentSetTime]);
	
	useEffect(()=>{
		setTimeHasChangedRef.current = setTimeHasChanged;
	},[setTimeHasChanged]);
	const handleNotifications = async() => {
		setStatus("loading");
		const notificationList = await getNotifications(loginStatus,  urls.notAll)
		setStatus("idle");
	};
	const handleLogin = 
		async({username, password})=> {
			setStatus("logging in");
			setUserData({
				username, 
				password
			});
			const receivedRefreshToken = await getRestRefreshToken(username,password, urls.login);
			const receivedAccessToken = await getRestAccessToken(urls.refresh);
			setLoginStatus({
				receivedRefreshToken: receivedRefreshToken,
				receivedAccessToken: receivedAccessToken
			});
//			console.log("status is: ",loginStatus.receivedRefreshToken);
			if((receivedRefreshToken == "200"))
			{
				setStatus("idle");
			}else{
				setStatus("login failed");
			}
	};
	const setRefresh = () => {
		console.log(notAllRefresh);
		setNotAllRefresh((prev) => prev+1);
	}
	const notClick = (item) => {
		alert(item.id+" "+item.affected+" "+item.problem);
	}
	useEffect(() => {
		async function init() {
		const response = await fetch(
			new URL('./variables/weburl.txt', import.meta.url)
		);

		const base = await response.text();

		setUrls({
			login: base + "auth/login",
			refresh: base+ "auth/refresh",
			notAll: base + "notifications",
			set: base + "settings/last-modified",
			notTop1: base + "notifications/latest-startdate",
		});
		}

		init();
	}, []);
	useEffect(() => {
		const updateAllDates = async() =>{
			setStatus("loading");
			if(loginStatus.receivedRefreshToken == "200"){
				const tmpCurrentSetTime = await GetSettingsTime({
							settingsUrl: urls.set,
							settingsTime:  currentSetTimeRef.current
				});
				if(tmpCurrentSetTime && tmpCurrentSetTime != currentSetTimeRef.current)
				{
					setCurrentSetTime(tmpCurrentSetTime);
					console.log("changed from ",currentSetTimeRef.current," to ",tmpCurrentSetTime);
					setSetTimeHasChanged(true);
				};
				if(setTimeHasChangedRef.current){
					setSetTimeHasChanged(false);
					const tmpCurrentNotTime = await GetSettingsTime({
							settingsUrl: urls.notTop1,
							settingsTime:  currentNotTimeRef.current
					});
					if(tmpCurrentNotTime && tmpCurrentNotTime != currentNotTimeRef.current)
					{
						setCurrentNotTime(tmpCurrentNotTime);
						console.log("nottime changed and reset");
					}
				};

			};
			setStatus("idle");
		}
		const checkDates = setInterval(updateAllDates,6000);
		updateAllDates();
	return () => clearInterval(checkDates);
	},[loginStatus.receivedRefreshToken,urls.set,urls.notTop1, currentSetTime]);
	if (!urls) {
    	return <p>loading</p>;
  	}
	return(
		<div id="mainBody">		
			<UiHeader 
				intVersion={headerVersionNumber.current}/>
			{(loginStatus == null) || !(loginStatus.receivedRefreshToken == "200")?(
				<>
				<UiHeaderNotLoggedIn />
				<LoginForm onLogin={handleLogin}/>
				</>
			): null}

			{(loginStatus != null && loginStatus.receivedRefreshToken == "200")?(
			<>
				<GetNotifications 
					notURL={urls.notAll} 
					tableClick={notClick} 
					notDateTime={currentNotTime}
				/>
			</>
			):null}
				<UiFooter 
					operatorName={((userData != null && 
						loginStatus != null && 
						loginStatus.receivedRefreshToken == "200")?userData.username:"N/A")}
					lastSettingsUpdate={((currentSetTime != null && 
						loginStatus != null && 
						loginStatus.receivedRefreshToken == "200")?currentSetTime:"N/A")} 
					status={status} 
					startDate={((currentSetTime != null && 
						loginStatus != null &&
						loginStatus.receivedRefreshToken == "200")?currentSetTime:"N/A")}
				/>
		</div>
	)
}

export default App
