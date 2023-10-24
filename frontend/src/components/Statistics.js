import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Statistics = ({ data }) => {
  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', padding: '2rem' }}>
      <Title style={{ color: '#FF5733' }}>Statistics</Title>
      <Text style={{ marginBottom: '2rem', color: 'white' }}>Basic statistical values for CSV data</Text>
      
      {data.map((item, index) => (
        <Card 
          key={index} 
          title={item.filename}
          style={{ marginBottom: '2rem', backgroundColor: '#3a3a3a' }}
        >
          {item.clusters.map((cluster, cIndex) => (
            <div key={cIndex}>
              <Title level={3} style={{ color: 'white' }}>{cluster.name}</Title>
              <Text style={{ color: 'white' }}>Centroid: {cluster.centroid}</Text>
              <br />
              <Text style={{ color: 'white' }}>Count: {cluster.count}</Text>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

export default Statistics;
