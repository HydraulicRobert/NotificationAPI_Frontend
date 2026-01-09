	export async function getRestAccessToken(restURL){
		try{
			var token;
			const loginResponse = await fetch(restURL, {
						method: "POST",
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						},
                        credentials: "include",
					});
			token = await loginResponse.status;
			return token;
		}catch(error){
			console.error("login error", error);
		}
	}
