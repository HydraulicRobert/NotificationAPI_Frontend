import { useEffect, useState } from "react";
import { getFetch} from './restSendFetch.jsx';
export async function GetSettingsTime({settingsUrl, settingsTime}){
    //console.log("url, ",settingsUrl,";time ",settingsTime,";token ",jwtToken); 
    var intTime;
                try{
    
                const loginResponse = await getFetch(settingsUrl);
                intTime = await loginResponse.text();
                intTime = (String(intTime).split(" ")[1].split(".")[0]);
                }catch(error){
                    console.error("login error", error,intTime);
                }
            
    return (intTime);

}
