import React from "react";
import useFetchFiles from "../../hooks/use-fetch-files";
import styled from "styled-components";
import { Flex, Card } from "antd";

function FileSelect({ selectedFile, setSelectedFile }) {
  const { files } = useFetchFiles();

  return (
    <>
      <Description>Select the file you want to preprocess</Description>
      <Flex vertical gap="middle">
        {files.map((file, i) => (
          <React.Fragment key={file.uid}>
            <FileItem
              type="radio"
              name="card-list"
              id={file.uid}
              value={file.file_name}
              checked={selectedFile === file.file_name}
              readOnly
            ></FileItem>
            <label
              htmlFor={file.uid}
              onClick={() => setSelectedFile(file.file_name)}
            >
              <Card hoverable>{file.file_name}</Card>
            </label>
          </React.Fragment>
        ))}
      </Flex>
    </>
  );
}

const Description = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0 0 1.5rem;
`;

const FileItem = styled.input`
  display: none;
  &:checked + label {
    border-radius: 8px;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px #1890ff;
  }
`;

export default FileSelect;
