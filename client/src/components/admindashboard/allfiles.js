import React from "react";
import axios from "axios";

export default function AllFiles(props) {
  const viewHandler = async () => {
    console.log(props.FileName);

    axios
      .post("/pdf", { FileName: props.FileName })
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: "application/pdf"
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={viewHandler}> View File </button>{" "}
    </div>
  );
}
