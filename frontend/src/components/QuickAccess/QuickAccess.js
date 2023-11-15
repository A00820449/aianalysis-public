import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, Avatar } from "antd";
import { COLORS, WEIGHTS } from "../../constants";
import { quickAccessData } from "./quickAccessData";

function QuickAccess() {
  return (
    <>
      {quickAccessData.map(({ key, title, label, icon, path }) => (
        <React.Fragment key={key}>
          <QuickAccessLink to={path}>
            <QuickAccessCard>
              <CardContent>
                <Avatar
                  shape="square"
                  size={32}
                  icon={icon}
                  style={{ backgroundColor: COLORS.primary }}
                />
                <CardDescription>
                  <CardLabel>{label}</CardLabel>
                  <CardTitle>{title}</CardTitle>
                </CardDescription>
              </CardContent>
            </QuickAccessCard>
          </QuickAccessLink>
        </React.Fragment>
      ))}
    </>
  );
}

const QuickAccessCard = styled(Card)`
  min-width: 250px;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    color: ${COLORS.gray[700]};
  }
`;

const QuickAccessLink = styled(Link)`
  flex: 1;
  color: ${COLORS.secondary};
`;

const CardTitle = styled.h3`
  font-weight: ${WEIGHTS.medium};
  font-size: 1.2rem;
  color: inherit;
`;

const CardLabel = styled.p`
  font-size: 0.8rem;
  color: ${COLORS.gray[700]};
`;

const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default QuickAccess;
