import React from 'react';
import './FileBar.css';

const fileBar = props =>{

    let size = (Math.round((parseFloat(props.size)/1000000)*100)/100).toString()+" MB"; /* show size in MBs with two digits after point*/
    if (size=="0 MB"){

        size = (Math.round((parseFloat(props.size)/1000)*100)/100).toString()+" KB";
    }

    return (
        <React.Fragment>
            <tr className="file-bar">
                <td className="file-bar-property file-name-property">{props.filename}</td>
                <td className="file-bar-property">{size}</td>
                <td className="file-bar-property"><form method="GET" action={"/files/download/"+encodeURIComponent(props.fileId)}><button className="download-btn">{"⇩"}</button></form></td>
                <td className="file-bar-property"><div onClick={props.onDelete}>❌</div></td>
                <td className="file-bar-property"><div onClick={props.onCopy}>📋</div></td>
                <td className="file-bar-property">{props.uploadDate}</td>
                <td className="file-bar-property">{props.fileDescription}</td>



            </tr>
        </React.Fragment>
    );
}
export default fileBar;