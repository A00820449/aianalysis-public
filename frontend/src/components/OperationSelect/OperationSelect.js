import React from "react";
import styled from "styled-components";

import { COLORS, WEIGHTS } from "../../constants";
import { dataPreprocessingOperations } from "../../dataPreprocessingOperations";
import { Flex, Card } from "antd";

function OperationSelect({
  selectedFile,
  selectedOperation,
  setSelectedOperation,
}) {
  const operationArray = Object.entries(dataPreprocessingOperations);
  return (
    <>
      <Description>
        Select the operation you want to perform on{" "}
        <SelectedFile>{selectedFile}</SelectedFile>
      </Description>
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

const Description = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0 0 1.5rem;
`;

const SelectedFile = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const FileItem = styled.input`
  display: none;
  &:checked + label {
    border-radius: 8px;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px #1890ff;
  }
`;

export default OperationSelect;
