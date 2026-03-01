import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import './upload.css'
const UploadQRPage = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [link,setlink]=useState()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:5000/food/upload_qr",
          formData
        );
        console.log(response.data)
        setUploadStatus(response.data.success);
        setlink( response.data.qr_data)
      } catch (error) {
        
        setUploadStatus("File upload failed");
        console.error("Error uploading file:", error);
      }
    },
  });

  return (
    <div style={{width:"50%",marginLeft:"10%"}}>
      
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
      {link&& <button className="btn btn-primary" onClick={()=>{
        var k =
        "width=" +
        (window.screen.availWidth + 500) +
        ",height=" +
        window.screen.availHeight +
        "fullscreen=yes focus=true";
      
      
  
      window.open(link, "_blank", k);
      }}>View History</button>}
    </div>
  );
};

export default UploadQRPage;
