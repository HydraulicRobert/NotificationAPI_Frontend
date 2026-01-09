	export async function getRestRefreshToken(username, password, restURL){
		try{
			var token;
			const loginResponse = await fetch(restURL, {
						method: "POST",
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						},
						body: JSON.stringify({
							username: username, 
							password: password
						}),
		                credentials: "include",
					});
			token = await loginResponse.status;
			return token;
		}catch(error){
			console.error("login error", error);
		}
	}
