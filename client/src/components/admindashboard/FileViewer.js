import React, {Component} from 'react';
import axios from 'axios';
import './FileViewer.css';
import FileBar from './FileBar/FileBar';
import { Route, Redirect } from "react-router-dom";


class FileViewer extends Component{

    state={
        files:[]
    }

/**Not done yet */
    sortBySize(){
        let tempFiles=[...this.state.files];
        tempFiles.sort((a,b)=>a-b);
        this.setState({files:tempFiles});
    }


    fetchData(){
        let headers = {
            'Authorization' : this.props.tokenProp,
        }

        axios.get('/files/all',{headers:headers})
        .then(response=>{
            let newFiles = response.data;
            this.setState({files:newFiles}, ()=>{
        });

        })
        .catch(err=>{
            if (err.response.status === 401){
                this.props.logout();
            }
        })
    }

    /**@param fileId string representing the file id */
    /**Handles click on a "copy-download-link-to-clipboard" button */
    onCopy(fileId){

        let tempEle = document.createElement("input");
        tempEle.value = window.location.host+"/files/download/"+fileId;
        document.body.appendChild(tempEle);
        tempEle.select();
        document.execCommand("copy");
        document.body.removeChild(tempEle);
    }

    /**@param fileId string representing the file id */
    /**Handles click on a "delete file" button */
    onDeleteHandler(fileId){

        let headers = {
            Authorization:this.props.tokenProp,
        }
        axios.delete('/files/'+fileId,{headers:headers})
        .then(response=>{
            this.fetchData();
        })
        .catch(err=>{
            if (err.response.status === 401){
                this.props.logout();
            }
        })
    }


    componentDidMount(){
        this.fetchData();
    }


    render(){
        return (
            <div className="allfiles-tbl-top-div">
                {this.state.files.length>0?
                (
                    <React.Fragment>

                        <div className="tbl-container">
                            <table>
                    
                                <thead>
                                    <tr id="top-row">
                                        <th className="file-name-property">
                                            {"File Name"}
                                        </th>
                                        <th>
                                            {"Size"}
                                        </th>
                                        <th>
                                            {"Download"}
                                        </th>
                                        <th>
                                            {"Delete"}
                                        </th>
                                        <th>
                                            {"Copy Link"}
                                        </th>
                                        <th>
                                            {"Upload Date"}
                                        </th>
                                        <th>
                                            {"File Description"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.files
                                    .map(f=>{
                                        return (<FileBar key={f._id}
                                            size={f.length}
                                            filename={f.filename}
                                            fileId={f._id}
                                            onDelete={this.onDeleteHandler.bind(this, f._id)}
                                            onCopy={this.onCopy.bind(this,f._id)}
                                            uploadDate={new Date(f.uploadDate).toLocaleString()}
                                            fileDescription={f.metadata.uploadDescription}/>)
                                            })}
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>

                )
                :
                (<h1>There are no files at the moment...</h1>)}
                {console.log(this.state.files[0])}
            </div>
            
        );   
    }
}


export default FileViewer;