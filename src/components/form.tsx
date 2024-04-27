"use client";
import React, { useState } from "react";
import axios from "axios";
import { Box, Button, CircularProgress } from "@mui/material";
import QRCode from "react-qr-code";

const CustomForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [uploadedFile, setUploadedFile] = useState<string | undefined>();

  const upload = () => {
    console.log(file);
    setUploadedFile("");
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:5000/upload-file", formData)
        .then((res) => {
          const path = res.data.path;
          if (path) {
            setUploadedFile("http://localhost:5000/" + path);
          } else {
            alert("Something Went Wrong..!!!");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error("No file selected");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedFile("");
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
console.log(uploadedFile);

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

      {uploadedFile && (
        <section className="bg-white shadow-lg p-10 m-10 max-w-sm mx-auto border rounded-sm flex items-center justify-center">
          <QRCode
            size={256}
            style={{ height: "200px", width: "200px" }}
            value={uploadedFile}
          />
        </section>
      )}
    </section>
  );
};

export default CustomForm;
