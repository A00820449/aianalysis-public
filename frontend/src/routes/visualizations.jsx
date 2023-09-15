import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

export default function Visualizations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/v1/visualize';
  
    axios.get(apiUrl)
      .then((response) => {
        setData((prevData) => {
          console.log(prevData);
          return response.data;
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Visualizations</Title>
        <Description>Select file and chart type</Description>
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
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
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