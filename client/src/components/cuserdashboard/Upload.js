import React, { Component } from "react";
import "./Upload.css";
import axios from "axios";
import Dropzone from "react-dropzone";
import FileBox from "./FileBox/FileBox";

class Upload extends Component {
  state = {
    files: [],
    description: ""
  };

  descriptionChangedHandler = event => {
    this.setState({ description: event.target.value });
  };

  submitFilesHandler = event => {
    event.target.value = "Uploading...";
    event.preventDefault();

    let headers = {
      Type: "formData",
      Authorization: this.props.tokenProp,
      UploadDescription: this.state.description
    };

    let formData = new FormData();
    this.state.files.forEach(file => {
      formData.append("files", file);
    });
    axios
      .post("/files/upload", formData, { headers: headers })
      .then(response => {
        window.location.href = window.location.href + "allfiles";
      })
      .catch(err => {
        this.props.logout();
      });
  };

  /**On adding a file */
  onDrop = files => {
    this.setState({ files: files });
  };

  onRemove = (event, index) => {
    event.preventDefault();
    event.stopPropagation(); //prevent clicking outer div
    let tempFiles = this.state.files.slice();
    tempFiles.splice(index, 1);
    this.setState({ files: tempFiles });
  };

  fileInputChangedHandler = event => {
    this.setState({ files: event.target.files });
  };

  render() {
    const style = {
      overflowY: "scroll",
      width: "400px"
    };

    return (
      <div className="upload-form">
        <form onSubmit={this.submitFilesHandler} encType="multipart/form-data">
          <table className="upload-tbl">
            <tbody>
              <tr>
                <th></th>
                <td>
                  <Dropzone
                    onDrop={this.onDrop.bind(this)}
                    className="dropzone"
                  >
                    {this.state.files.length === 0 ? (
                      <p>
                        Try dropping some files here, or click to select files
                        to upload.
                      </p>
                    ) : (
                      <div>
                        {this.state.files.map((f, index) => (
                          <FileBox
                            key={f.name}
                            fileName={f.name}
                            size={f.size}
                            onRemove={this.onRemove}
                            index={index}
                          />
                        ))}
                      </div>
                    )}
                  </Dropzone>
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  <input
                    maxlength="30"
                    placeholder="Describe your upload... (30 chars)"
                    type="text"
                    onChange={this.descriptionChangedHandler}
                  ></input>
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  <input type="submit" value="Upload!"></input>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default Upload;
