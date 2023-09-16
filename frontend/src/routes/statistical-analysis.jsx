import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { statisticsURL } from "../config/backendURL";

export default function StatisticalAnalysis() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const apiUrl = statisticsURL;
    
    axios.get(apiUrl)
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
      });
  }, []);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Statistics</Title>
        <Description>Basic statistical values for CSV data</Description>
      </HeaderWrapper>
      <StatsContainer>
        {Object.entries(stats).map(([column, values]) => (
          <StatCard key={column}>
            <ColumnName>{column}</ColumnName>
            {Object.entries(values).map(([key, value]) => (
              <StatRow key={key}>
                <StatKey>{key}</StatKey>: <StatValue>{value}</StatValue>
              </StatRow>
            ))}
          </StatCard>
        ))}
      </StatsContainer>
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

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StatCard = styled.div`
  border: 1px solid #e1e4e8;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
`;

const ColumnName = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StatKey = styled.span`
  font-weight: 500;
`;

const StatValue = styled.span`
  font-weight: 400;
`;
