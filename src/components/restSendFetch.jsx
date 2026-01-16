export async function postFetchUsernamePassword(username, password, restURL){
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
        token = await loginResponse;
        return token;
    }catch(error){
        console.error("login error", error);
    }
}
export async function getFetch(restURL){
    try{
        var token;
        const loginResponse = await fetch(restURL, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: "include",
                });
        token = await loginResponse;
        return token;
    }catch(error){
        console.error("login error", error);
    }
}