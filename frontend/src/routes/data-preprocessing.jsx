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

const Dropdown = styled.select`
  padding: 0.2rem 0.5rem /* Ajusta el padding para hacer el dropdown más corto */
  width: 150px /* Ancho del dropdown */
  font-size: 0.9rem; /* Tamaño del texto del dropdown */
  background-color: black; /* Fondo negro */
  color: white; /* Texto blanco */
`;

const DataPreprocessing = () => {
  const [message, setMessage] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("clean");
  const apiUrl = cleanDataURL;


  const handleOperationChange = (event) => {
    setSelectedOperation(event.target.value);
  };

  const handleOperationSubmit = () => {
    // Hacer la solicitud al backend con la operación seleccionada
    axios.get(apiUrl, { params: { operation: selectedOperation } })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error Processing Data:', error);
      });
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Data Preprocessing</Title>
        <Description>Select file</Description>
        
      </HeaderWrapper>

      {/* Dropdown para seleccionar la operación */}
      <Dropdown value={selectedOperation} onChange={handleOperationChange}>
        <option value="clean">Clean</option>
        <option value="patch">Patch</option>
        <option value="Eliminate outliers">Eliminate outliers</option>
        {/* Agrega más opciones según tus necesidades */}
      </Dropdown>

      {/* Botón para enviar la operación seleccionada */}
      <button onClick={handleOperationSubmit}>Submit</button>

      {/* Mostrar el mensaje del backend */}
      <div>
        <strong>Changes:</strong> {message}
      </div>
    </Wrapper>
  );
};

export default DataPreprocessing;

