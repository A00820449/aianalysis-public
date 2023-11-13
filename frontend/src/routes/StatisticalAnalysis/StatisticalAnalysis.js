import React, { useEffect, useState } from "react";
import FileSelectDropdown from "../../components/FileSelectDropdown";
import axios from "axios";
import { Card, Typography, Table } from "antd";
import { exportCSV, exportPDF, statisticsURL } from "../../config/backendURL";
import { useFetchStats } from "../../hooks/use-fetch-stats";
const { Title, Text } = Typography;

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
    <div
      style={{ padding: "24px", backgroundColor: "white", minHeight: "100vh" }}
    >
      <Title style={{ color: "black" }} level={1}>
        Statistics
      </Title>
      <Text style={{ color: "black", marginBottom: "2rem" }}>
        Select a file
      </Text>
      <div>
        <FileSelectDropdown onChange={(v) => setFilename(v)} />
      </div>
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
                    render: (text) => (
                      <Text style={{ color: "black" }}>{text}</Text>
                    ),
                  },
                  {
                    title: "Value",
                    dataIndex: "value",
                    key: "value",
                    render: (text) => (
                      <Text style={{ color: "black" }}>{text}</Text>
                    ),
                  },
                ]}
              />
            </div>
          );
        })}
      </Card>
    </div>
  );
}
