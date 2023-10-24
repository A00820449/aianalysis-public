import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Card, Typography, Table } from 'antd';
import { statisticsURL } from "../config/backendURL";
const { Title, Text } = Typography;

export default function StatisticalAnalysis() {
  const [allStats, setAllStats] = useState({});

  useEffect(() => {
    const apiUrl = statisticsURL;
    axios.get(apiUrl)
      .then((response) => {
        console.log("Received data:", response.data); // Add this line
        setAllStats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
      });
  }, []);
  

  return (
    <div style={{ padding: '24px', backgroundColor: '#0d0f11', minHeight: '100vh' }}>
      <Title style={{ color: 'white' }} level={1}>Statistics</Title>
      <Text style={{ color: 'white', marginBottom: '2rem' }}>Basic statistical values for CSV data</Text>

      {Object.entries(allStats).map(([filename, stats]) => (
        <Card key={filename} title={filename} style={{ marginBottom: '24px', backgroundColor: '#0d0f11', color: 'white' }}>
          {typeof stats === 'object' && !Array.isArray(stats) ? (
            Object.entries(stats).map(([column, values]) => {
              const tableData = Object.entries(values).map(([key, value]) => ({ key, value }));
              return (
                <div key={column}>
                  <Title style={{ color: '#ffffff' }} level={3}>{column}</Title>

                  <Table
                    pagination={false}
                    style={{ backgroundColor: '#292929' }}
                    rowClassName={()=>'row-style'}
                    dataSource={tableData}
                    columns={[
                      {
                        title: 'Stat',
                        dataIndex: 'key',
                        key: 'key',
                        render: text => <Text style={{ color: '#ffffff' }}>{text}</Text>
                      },
                      {
                        title: 'Value',
                        dataIndex: 'value',
                        key: 'value',
                        render: text => <Text style={{ color: '#ffffff' }}>{text}</Text>
                      }
                    ]}
                  />
                </div>
              );
            })
          ) : (
            <Text style={{ color: '#ffffff' }}>{stats}</Text>
          )}
        </Card>
      ))}
    </div>
  );
}

