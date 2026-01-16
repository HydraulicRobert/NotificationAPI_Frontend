import { useEffect, useState } from "react";
import { getFetch} from "./restSendFetch.jsx";
export async function GetNewestNotTime({newestNotTimeUrl, newestNotTime}){
    var intTime;
                try{
    
                const loginResponse = await getFetch(newestNotTimeUrl); 
                intTime = await loginResponse.text();
                intTime = (String(intTime).split(" ")[1].split(".")[0]);
                }catch(error){
                    console.error("login error", error);
                }
                console.log(intTime);
            
    return (intTime);

}
