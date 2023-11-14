import React from "react";
import styled from "styled-components";
import { COLORS, WEIGHTS } from "../../constants";
import { Card } from "antd";

const Statistics = ({ data }) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Statistics</Title>
        <Description style={{ marginBottom: "2rem", color: "white" }}>
          Basic statistical values for CSV data
        </Description>
      </HeaderWrapper>

      {data.map((item, index) => (
        <Card
          key={index}
          title={item.filename}
          style={{ marginBottom: "2rem", backgroundColor: "#3a3a3a" }}
        >
          {item.clusters.map((cluster, cIndex) => (
            <div key={cIndex}>
              <Title level={3} style={{ color: "white" }}>
                {cluster.name}
              </Title>
              <Description style={{ color: "white" }}>
                Centroid: {cluster.centroid}
              </Description>
              <br />
              <Description style={{ color: "white" }}>
                Count: {cluster.count}
              </Description>
            </div>
          ))}
        </Card>
      ))}
    </Wrapper>
  );
};

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

export default Statistics;
