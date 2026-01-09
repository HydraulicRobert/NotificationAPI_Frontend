import { useEffect, useState } from "react";
export function GetSettingsTime({settingsUrl, settingsTime, setSettingsTime}){
    //console.log("url, ",settingsUrl,";time ",settingsTime,";token ",jwtToken); 
    var intTime;
        useEffect(() => {
            async function fetchSettingsTime() {
                try{
    
                const loginResponse = await fetch(settingsUrl, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: "include",
                });
                intTime = await loginResponse.text();
      //          console.log(intTime);
                setSettingsTime(intTime.split(" ")[1].split(".")[0]);
                }catch(error){
                    console.error("login error", error,intTime);
                }
            }
            fetchSettingsTime();
        }, []);
        console.log(intTime);
    return (intTime);

}
