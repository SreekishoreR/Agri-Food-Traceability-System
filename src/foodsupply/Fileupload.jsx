import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import './upload.css'
const Fileupload = ({setfile}) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          "http://localhost:5000/food/upload",
          formData
        );
        console.log(response.data)
        setUploadStatus(response.data.success);
        setfile( response.data.filename)
      } catch (error) {
        
        setUploadStatus("File upload failed");
        console.error("Error uploading file:", error);
      }
    },
  });

  return (
    <div style={{width:"50%",float:"right"}}>
      
      <div
        {...getRootProps()}
        className={`dropzone-container ${isDragActive && "active"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag 'n' drop a file here, or click to select a Bill</p>
        )}
      </div>
      <p>Status: {uploadStatus}</p>
    </div>
  );
};

export default Fileupload;
