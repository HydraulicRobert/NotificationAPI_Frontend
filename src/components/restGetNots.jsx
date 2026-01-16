import { useEffect, useState } from "react";
import { getFetch } from "./restSendFetch";
export function GetNotifications({notURL, tableClick, notDateTime}){
//alert(notURL);
var [items, setItems] = useState([]);
var itemIdLength;
var itemAffectedLength = 0;
    useEffect(() => {
        async function fetchNotifications() {
            try{
                setItems([]);
                    const loginResponse = await getFetch(notURL); 
                    /*await fetch(notURL, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        credentials: "include"
                    });*/
                    let notList = await loginResponse.text();
                    //alert(notList);
                    notList = notList.replace("'","");
                    notList = JSON.parse(notList);
//                    console.log(notList.length);
                    setItems(notList);
                        

            }catch(error){
                console.error("login error", error);
            }
            
        }
        fetchNotifications();
    }, [notDateTime]);
                        let maxBaselength = 0;
                        for(let i = 0; i < items.length;i++)
                        { 
                            const baseLength = String(items[i].affected).trim().length;
                            //const affected = items[i].affected;
                            if(baseLength > maxBaselength)
                            {
                                maxBaselength = baseLength;
                            }
                            
                        }
                        const targetLength = maxBaselength+2;
                        for(let i = 0; i < items.length;i++)
                        {
                            const affected = String(items[i].affected).trim();
                            const itemID = items[i].id;
                            let newAffected = affected.padEnd(targetLength,"\u00A0");
                            if((itemID <10))
                            {
                                newAffected+= "\u00A0";
                            }
                            items[i].affected = newAffected;
                        }

                        return(
                        <div id="NotificationTable">
                            {items.map(item => (
                                <div  id="NotificationTableEntries" key={item.id}
                                onClick ={() => tableClick(item)} >
                                    <table>
                                        <thead>

                                        </thead>
                                        <tbody style= {{color:'white'}}>
                                                    
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>cause: {item.affected}</td>
                                                <td>since: {item.startDate.split(".")[0]}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>prblm: {item.problem}</td>
                                                <td>until: {item.endDate.split(".")[0]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    )
}