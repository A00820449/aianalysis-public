import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Card, Typography, Table } from 'antd';

const { Title, Text } = Typography;

export default function StatisticalAnalysis() {
  const [allStats, setAllStats] = useState({});

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/v1/statistics';
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
    <div style={{ padding: '24px', backgroundColor: '#080808', minHeight: '100vh' }}>
      <Title style={{ color: '#c8e8e6' }} level={1}>Statistics</Title>
      <Text style={{ color: 'white', marginBottom: '2rem' }}>Basic statistical values for CSV data</Text>

      {Object.entries(allStats).map(([filename, stats]) => (
        <Card title={filename} key={filename} style={{ marginBottom: '24px', backgroundColor: '#919191', color: 'white' }}>
          {typeof stats === 'object' && !Array.isArray(stats) ? (
            Object.entries(stats).map(([column, values]) => (
              <div key={column}>
                <Title style={{ color: '#ffffff' }} level={3}>{column}</Title>
                <Table
                  dataSource={[{ key: 'mean', value: 50 }, { key: 'median', value: 60 }]}
                  columns={[
                    {
                      title: 'Stat',
                      dataIndex: 'key',
                      key: 'key',
                      render: text => <Text style={{ color: 'black' }}>{text}</Text>
                    },
                    {
                      title: 'Value',
                      dataIndex: 'value',
                      key: 'value',
                      render: text => <Text style={{ color: 'black' }}>{text}</Text>
                    }
                  ]}
                  pagination={false}
                  style={{ backgroundColor: '#292929' }}
                />
              </div>
            ))
          ) : (
            <Text style={{ color: 'black' }}>{stats}</Text>
          )}
        </Card>
      ))}
    </div>
  );
}
