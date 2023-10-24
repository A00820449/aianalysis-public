import React, { useEffect, useRef } from "react";
import { Flex, Card } from "antd";
import useFetchFiles from "../../hooks/use-fetch-files";
import styled from "styled-components";

function FileSelect({ selectedFile, setSelectedFile }) {
  const [files, setFiles] = useFetchFiles();

  return (
    <>
      <h1>Select File</h1>
      <p>Select the file you want to preprocess</p>
      <div>
        <Flex vertical gap="middle">
          {files.map((file, i) => (
            <React.Fragment key={file.uid}>
              <FileItem
                type="radio"
                name="card-list"
                id={file.uid}
                value={file.file_name}
                checked={selectedFile === file.file_name}
                onChange={(event) => setSelectedFile(event.target.value)}
              ></FileItem>
              <label htmlFor={file.uid}>
                <Card hoverable>{file.file_name}</Card>
              </label>
            </React.Fragment>
          ))}
        </Flex>
      </div>
    </>
  );
}

const FileItem = styled.input`
  display: none;
  &:checked + label {
    border-radius: 8px;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px #1890ff;
  }
`;

export default FileSelect;
