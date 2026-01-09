export function UiFooter({operatorName, lastSettingsUpdate, status, newestNotificationStartDate}){
    return(
        <footer id="FooterMain">
            <div id="FooterText">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    OPERATOR
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {(operatorName)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="FooterMiddle">
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    status
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {status}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    newest from
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {newestNotificationStartDate}
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>       
        </footer>
    )
}