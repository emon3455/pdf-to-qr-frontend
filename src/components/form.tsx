"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import QRCode from "react-qr-code";

const backendURL = 'https://pdf-to-qr-backend.onrender.com/'

const CustomForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [fileId, setFileId] = useState<string | undefined>();

  const upload = () => {
    console.log(file);
    setFileId("");
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB. Please select a smaller file.");
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${backendURL}/file/upload-file`, formData)
        .then((res) => {
          const fileId = res.data.fileId;
          if (fileId) {
            setFileId(fileId);
          } else {
            alert("Something Went Wrong..!!!");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("No file selected");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileId("");
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleScan = () => {
    if (fileId) {
      window.location.href = `${backendURL}/file/download-file/${fileId}`;
    } else {
      console.error("No file uploaded");
    }
  };

  return (
    <section className="bg-white shadow-lg p-10 m-10 max-w-xl mx-auto border rounded-sm">
      {!isLoading ? (
        <form className="flex justify-between flex-col md:flex-row space-y-2">
          <input type="file" onChange={handleFileChange} />
          <Button variant="contained" onClick={upload}>
            Generate QR
          </Button>
        </form>
      ) : (
        <section className="flex items-center justify-center">
          <CircularProgress />
        </section>
      )}

      {fileId && (
        <section className="bg-white shadow-lg p-10 m-10 max-w-sm mx-auto border rounded-sm flex items-center justify-center">
          <QRCode
            size={256}
            style={{ height: "200px", width: "200px" }}
            value={`${backendURL}/file/download-file/${fileId}`}
            onClick={handleScan}
          />
        </section>
      )}
    </section>
  );
};

export default CustomForm;
