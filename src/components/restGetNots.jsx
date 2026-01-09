import { useEffect, useState } from "react";
export function GetNotifications({notURL, tableClick, notsRefresh}){
//alert(notURL);
var [items, setItems] = useState([]);
var itemIdLength;
var itemAffectedLength = 0;
    useEffect(() => {
        async function fetchNotifications() {
            try{

                    const loginResponse = await fetch(notURL, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        credentials: "include"
                    });
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
    }, []);//platzhalter. sobald sich jwtToken ändert läuft er useeffect durch
                        for(var i = 0; i < items.length;i++)
                        { 
                            const affected = items[i].affected;
                            //console.log(i, affected);
                            if(affected.length > itemAffectedLength)
                            {
                            //    console.log(affected.length, " is bigger than ",itemAffectedLength);
                                itemAffectedLength = affected.length+2;
                            }
                        }
                        for(var i = 0; i < items.length;i++)
                        {
                            const affected = items[i].affected;
                            const itemID = items[i].id;
                            for(var j = 0; j<(itemAffectedLength-affected.length);j++)
                            {
                                if(((itemAffectedLength-affected.length)-j) >= 1)
                                {
                                    items[i].affected = items[i].affected+"\u00A0";
                                }
                            } 
                            if((itemID <10))
                            {
                                items[i].affected = items[i].affected+"\u00A0";
                            }
//console.log("length of ",affected," is",(itemAffectedLength-affected.length)-j);

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