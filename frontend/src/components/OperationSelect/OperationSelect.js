import React from "react";
import { dataPreprocessingOperations } from "../../dataPreprocessingOperations";
import { Flex, Card } from "antd";
import styled from "styled-components";

function OperationSelect({
  selectedFile,
  selectedOperation,
  setSelectedOperation,
}) {
  const operationArray = Object.entries(dataPreprocessingOperations);
  return (
    <>
      <h1>Select Operation</h1>
      <p>Select the operation you want to perform on {selectedFile}</p>
      <div>
        <Flex gap="middle" wrap="wrap">
          {operationArray.map(([operationName, operationInfo]) => (
            <React.Fragment key={operationInfo.uid}>
              <FileItem
                type="radio"
                name="operation-list"
                id={operationInfo.uid}
                value={operationInfo.uid}
                checked={selectedOperation === operationInfo.uid}
                onChange={(event) => setSelectedOperation(event.target.value)}
              ></FileItem>
              <label
                htmlFor={operationInfo.uid}
                style={{ flex: 1, flexBasis: "300px" }}
              >
                <Card
                  hoverable
                  title={operationInfo.title}
                  style={{ height: "100%" }}
                >
                  {operationInfo.description}
                </Card>
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

export default OperationSelect;
