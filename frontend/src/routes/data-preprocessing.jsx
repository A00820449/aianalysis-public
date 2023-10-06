import React, { useState } from 'react';
import styled from "styled-components";
import axios from "axios";
import { cleanDataURL } from "../config/backendURL";

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

const DataPreprocessing = () => {
  const [message, setMessage] = useState("");  // Nuevo estado para almacenar el mensaje del backend
  const apiUrl = cleanDataURL;

  const cleanHere = () => {
    axios.get(apiUrl, { params: { operation: 'clean' } })
      .then((response) => {
        // Cuando el backend responde, establece el mensaje en el estado
        setMessage(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error Cleaning Data:', error);
      });
  };

  const patchHere = () => {
    axios.get(apiUrl, { params: { operation: 'patch' } })
      .then((response) => {
        // Cuando el backend responde, establece el mensaje en el estado
        setMessage(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error Patching Data:', error);
      });
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Data Preprocessing</Title>
        <Description>Select file</Description>
        
      </HeaderWrapper>
      <button onClick={cleanHere}>Clean Here!</button>
      <button onClick={patchHere}>Patch Here!</button>

      {/* Mostrar el mensaje del backend */}
      <div>
        <strong>Changes:</strong> {message}
      </div>
    </Wrapper>
  );
};

export default DataPreprocessing;
