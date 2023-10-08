import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { cleanDataURL } from "../config/backendURL";
import { blue } from "@ant-design/colors";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HeaderWrapper = styled.div`
  padding-bottom: 2.5rem;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.5;
  margin-top: 1rem;
`;

const Dropdown = styled.select`
  padding: 0.2rem 0.5rem 
  width: 150px;
  font-size: 0.9rem; 
  background-color: black;
  color: white; 
`;

const DataPreprocessing = () => {
  const [message, setMessage] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("clean");
  const apiUrl = cleanDataURL;

  const handleOperationChange = (event) => {
    setSelectedOperation(event.target.value);
  };

  const handleOperationSubmit = () => {
    axios
      .get(apiUrl, { params: { operation: selectedOperation } })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error Processing Data:", error);
      });
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <h1 style={{ fontSize: "32px", color: `${blue.primary}` }}>
          Data Preprocessing
        </h1>
        <Description>Select file</Description>
      </HeaderWrapper>

      {/* Dropdown */}
      <Dropdown value={selectedOperation} onChange={handleOperationChange}>
        <option value="clean">Clean</option>
        <option value="patch">Patch</option>
        <option value="outliers">Eliminate outliers</option>
        {/* Add more options */}
      </Dropdown>

      <button onClick={handleOperationSubmit}>Submit</button>

      <div>
        <strong>Changes:</strong> {message}
      </div>
    </Wrapper>
  );
};

export default DataPreprocessing;
