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
import FileSelectDropdown from "../../../components/FileSelectDropdown";
import {
  useFetchScatterVisualization,
  useFetchVisualization,
} from "../../../hooks/use-fetch-visualization";
import { COLORS, WEIGHTS } from "../../../constants";
import { useFetchColumns } from "../../../hooks/use-fetch-columns";
import { Select } from "antd";
import { useQueryClient } from "react-query";
import { useOutletContext } from "react-router-dom";

export default function ScatterVisualization() {
  const [recentActivities, setRecentActivities] = useOutletContext();
  const [filename, setFilename] = useState("");
  const [columnX, setColumnX] = useState("");
  const [columnY, setColumnY] = useState("");

  const { columns, remove: removeColsFromCache } = useFetchColumns(filename);
  const { data, remove: removeVizData } = useFetchScatterVisualization(
    filename,
    columnX,
    columnY
  );

  useEffect(() => {
    removeVizData();
  }, [columnX, columnY]);

  useEffect(() => {
    setColumnX("");
    setColumnY("");
  }, [filename]);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Scatter Chart</Title>
        <Description>Select a file</Description>
        <FileSelectDropdown
          onChange={(v) => {
            setFilename(v);
            setRecentActivities((prev) => [
              ...prev,
              {
                children: `Visualized ${v} file`,
              },
            ]);
          }}
        />
        <div style={{ margin: "0.5rem 0" }}>
          X:{" "}
          <Select
            style={{ minWidth: 150 }}
            options={columns.map((v) => ({ value: v, name: v }))}
            placeholder={"Select x"}
            disabled={!columns.length}
            value={columnX}
            onChange={(v) => {
              setColumnX(v);
              removeColsFromCache();
            }}
          />
        </div>
        <div style={{ margin: "0.5rem 0" }}>
          Y:{" "}
          <Select
            style={{ minWidth: 150 }}
            options={columns.map((v) => ({ value: v, name: v }))}
            placeholder={"Select y"}
            disabled={!columns.length}
            value={columnY}
            onChange={(v) => {
              setColumnY(v);
              removeColsFromCache();
            }}
          />
        </div>
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
