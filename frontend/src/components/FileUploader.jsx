import React, { useState } from "react";
import axios from "axios"
import styled from 'styled-components';
import { ImageConfig } from '../config/ImageConfig'; 
import { X } from "react-feather";

const FileUploader = () => {
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...files, ...selectedFiles]);
  }

  const handleUpload = async () => {
    if (files.length > 0) {
        console.log("Uploading files...");
  
        const formData = new FormData();
  
        // Loop through the array of files and append each file to the FormData
        for (let i = 0; i < files.length; i++) {
          formData.append("files[]", files[i]);
        }
  
        try {
          // Replace the URL with your server endpoint
          const response = await axios.post("http://127.0.0.1:5000/api/v1/upload", formData);
  
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
  };

  const fileRemove = (file) => {
    const updatedFiles = [...files];
    updatedFiles.splice(files.indexOf(file), 1);
    setFiles(updatedFiles);
  }

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Upload File</Title>
        <Description>Please upload a CSV file</Description>
      </HeaderWrapper>
      <FileDropZone>
          <span className="flex items-center space-x-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="font-medium">
                  Drop files to Attach, or <span className="text-blue-400 underline">browse</span>
              </span>
          </span>
          <input type="file" multiple name="file_upload" className="hidden" onChange={handleFileChange} />
      </FileDropZone>
      <FilePreview>
        {
            files.length > 0 ? (
                <>
                    <p>Ready to upload</p>
                    <FileList>
                        {
                            files.map((item, index) => (
                                <FileListItem key={index}>
                                    <img src={ImageConfig['default']} alt="" />
                                    <div>
                                        <p>{item.name}</p>
                                        <p>{item.size} bytes</p>
                                    </div>
                                    <DeleteButton onClick={() => fileRemove(item)}><X/></DeleteButton>
                                </FileListItem>
                            ))
                        }
                    </FileList>
                </>
            ) : null
        }
      </FilePreview>
      {files.length > 0 ? (<UploadButton onClick={handleUpload}>Upload file(s)</UploadButton>) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HeaderWrapper = styled.div`
  padding-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 3rem;
  line-height: 1;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.5;
  margin-top: 1rem;
`;

const FileDropZone = styled.label`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: hsla(210, 17%, 9%, 1.00);
  padding-left: 1rem;
  padding-right: 1rem;
  transition-property: all;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0s;
  border-width: 2px;
  border-style: dashed;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  outline: none;
  min-height: 250px;
`;

const FilePreview = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    & > p {
        font-size: 1.25rem;
    }
`;

const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const FileListItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    background-color: hsla(210, 13%, 9%, 1.00);
    padding: 16px;
    gap: 24px;
    border-radius: 4px;

    & img {
        width: 50px;
    }
`;

const DeleteButton = styled.span`
    background-color: hsla(235, 87%, 59%, 1.00);
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    cursor: pointer;
    opacity: 1;
`;

const UploadButton = styled.button`
    background-color: hsla(235, 87%, 59%, 1.00);
    border-radius: 4px;
    padding: 1.15rem;
    font-weight: bold;
    font-size: 1.15rem;
`;

export default FileUploader;