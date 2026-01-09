import { useEffect, useState } from "react";
export function GetNewestNotTime({newestNotTimeUrl, newestNotTime, setNewestNotTime}){
//    console.log("url, ",newestNotTimeUrl,";time ",newestNotTime,";token ",jwtToken); 
    var intTime;
        useEffect(() => {
            async function fetchNotsTime() {
                try{
    
                const loginResponse = await fetch(newestNotTimeUrl, {
                method: "GET",
                'credentials': "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                });
                intTime = await loginResponse.text();
                setNewestNotTime(intTime.split(" ")[1].split(".")[0]);
                }catch(error){
                    console.error("login error", error);
                }
            }
            fetchNotsTime();
        }, [newestNotTime]);
    return (intTime);

}
