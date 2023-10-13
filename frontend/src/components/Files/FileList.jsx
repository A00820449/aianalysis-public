import React from "react";
import { FileOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Space, List, Button, Upload, message } from "antd";
import { blue } from "@ant-design/colors";
import {
  fileUploadURL,
  filesURL,
  getDeleteFileURL,
} from "../../config/backendURL";
import useFetchFiles from "../../hooks/use-fetch-files";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: false,
  action: fileUploadURL,
};

function FileList() {
  const [files, setFiles] = useFetchFiles();

  console.log(files);

  function handleOnChange(info) {
    console.log("Info", info);
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      const newFile = {
        file_name: info.file.name,
        file_size: info.file.size,
        uid: crypto.randomUUID(),
      };
      message.success(`${info.file.name} file uploaded successfully.`);
      setFiles([...files, newFile]);
    } else if (status === "error") {
      message.error(`${JSON.stringify(info.file.response)}`);
    }
  }

  function handleOnDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  }

  async function handleDelete(fileName) {
    const url = getDeleteFileURL(fileName);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const nextFiles = files.filter((file) => file.file_name !== fileName);
    setFiles(nextFiles);
  }

  return (
    <>
      {files.length === 0 ? (
        <Dragger
          {...props}
          onChange={(info) => handleOnChange(info)}
          onDrop={(e) => handleOnDrop(e)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      ) : (
        <>
          <Space
            direction="horizontal"
            align="baseline"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <h1>My Files</h1>
            <Upload
              {...props}
              showUploadList={false}
              onChange={(info) => handleOnChange(info)}
            >
              <Button icon={<UploadOutlined />}>Upload Files</Button>
            </Upload>
          </Space>

          <List
            dataSource={files}
            renderItem={({ file_name, file_size, uid }) => (
              <List.Item key={uid}>
                <List.Item.Meta
                  avatar={<FileOutlined style={{ fontSize: "24px" }} />}
                  title={`File: ${file_name}`}
                  description={`Size: ${file_size} bytes`}
                />
                <Button
                  type="primary"
                  danger
                  target="_blank"
                  onClick={() => handleDelete(file_name)}
                >
                  Delete
                </Button>
              </List.Item>
            )}
          ></List>
        </>
      )}
    </>
  );
}

export default FileList;
