import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { visualizeURL } from "../../../config/backendURL";
import { blue } from "@ant-design/colors";
import FileSelectDropdown from "../../../components/FileSelectDropdown";
import { useFetchVisualization } from "../../../hooks/use-fetch-visualization";
import { COLORS, WEIGHTS } from "../../../constants";

export default function ScatterVisualization() {
  const [filename, setFilename] = useState("");
  const { data, error } = useFetchVisualization(filename);

  /*useEffect(() => {
    const apiUrl = visualizeURL;

    axios
      .get(apiUrl)
      .then((response) => {
        setData((prevData) => {
          console.log(prevData);
          return response.data;
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);*/

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Scatter Chart</Title>
        <Description>Select a file</Description>
        <FileSelectDropdown
          onChange={(v) => {
            setFilename(v);
          }}
        />
      </HeaderWrapper>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="X" />
          <YAxis type="number" dataKey="y" name="Y" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="example" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

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
  color: ${COLORS.primary};
  font-weight: ${WEIGHTS.medium};
  font-size: 2rem;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
  padding: 1rem 0;
`;
