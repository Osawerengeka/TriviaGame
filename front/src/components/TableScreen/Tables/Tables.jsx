import React from "react";
import classes from "./Tables.module.css";

export function TableGame(props){
    return (
        <tr>
            <td valign="center" align="center">{props.id}</td>
            <td align="center" valign="center">{props.type}</td>
            <td align="center" valign="center">{props.description}</td>
            <td align="center" valign="center">{props.maxPlayers}</td>
        </tr>
    );
}



export function Tables(props) {
    let tables =props.tablesPage.tables.listOfTables.map(el => <TableGame id={el.id} type={el.type} description={el.description} maxPlayers={el.maxPlayers}/>)
    return (
        <div className={classes.tableScreen}>
            <table border="1" cellPadding="7" cellSpacing="0">
                <tr bgcolor="#D3EDF6">
                    <td width="25%" align="center" valign="center">id</td>
                    <td width="25%" align="center" valign="center">Type</td>
                    <td width="25%" align="center" valign="center">Description</td>
                    <td width="25%" align="center" valign="center">Players</td>
                </tr>
                {tables}
            </table>
        </div>

    );
}
