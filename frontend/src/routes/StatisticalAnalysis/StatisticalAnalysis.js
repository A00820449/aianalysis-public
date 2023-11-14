import React, { useEffect, useState } from "react";
import FileSelectDropdown from "../../components/FileSelectDropdown";
import axios from "axios";
import { Card, Typography, Table } from "antd";
import { exportCSV, exportPDF, statisticsURL } from "../../config/backendURL";
import { useFetchStats } from "../../hooks/use-fetch-stats";
import styled from "styled-components";
import { COLORS, WEIGHTS } from "../../constants";

export default function StatisticalAnalysis() {
  const [filename, setFilename] = useState("");
  const { data: stats } = useFetchStats(filename);

  /*useEffect(() => {
    const apiUrl = statisticsURL;
    axios.get(apiUrl)
      .then((response) => {
        console.log("Received data:", response.data); // Add this line
        setAllStats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
      });
  }, []);*/

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Statistics</Title>
        <Description>Select a file</Description>
        <FileSelectDropdown onChange={(v) => setFilename(v)} />
      </HeaderWrapper>
      <Card
        key={filename}
        title={filename}
        style={{
          marginBottom: "24px",
          backgroundColor: "white",
          color: "white",
        }}
      >
        {filename && (
          <>
            <a
              href={`${exportPDF}?filename=${filename}`}
              download="exported_data.pdf"
              style={{ marginRight: "20px" }}
            >
              Download PDF
            </a>
            <span className="space-between"></span>
            <a
              href={`${exportCSV}?filename=${filename}`}
              download="exported_statistics.csv"
            >
              Download CSV
            </a>
          </>
        )}
        {Object.entries(stats).map(([column, values]) => {
          const tableData = Object.entries(values).map(([key, value]) => ({
            key,
            value,
          }));
          return (
            <div key={column}>
              <Title style={{ color: "black" }} level={3}>
                {column}
              </Title>

              <Table
                pagination={false}
                style={{ backgroundColor: "white" }}
                rowClassName={() => "row-style"}
                dataSource={tableData}
                columns={[
                  {
                    title: "Stat",
                    dataIndex: "key",
                    key: "key",
                    render: (text) => <p style={{ color: "black" }}>{text}</p>,
                  },
                  {
                    title: "Value",
                    dataIndex: "value",
                    key: "value",
                    render: (text) => <p style={{ color: "black" }}>{text}</p>,
                  },
                ]}
              />
            </div>
          );
        })}
      </Card>
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
