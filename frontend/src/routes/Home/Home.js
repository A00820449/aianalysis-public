import styled from "styled-components";
import QuickAccess from "../../components/QuickAccess/QuickAccess";
import { COLORS } from "../../constants";

function Home() {
  return (
    <>
      <Title>Quick Access</Title>
      <QuickAccessWrapper>
        <QuickAccess />
      </QuickAccessWrapper>
      <RecentActivityWrapper></RecentActivityWrapper>
    </>
  );
}

const QuickAccessWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: nowrap;
  overflow: auto;
  padding: 0 0 24px;
`;

const Title = styled.h1`
  font-size: 1rem;
  padding: 0 0 1rem;
  color: ${COLORS.gray[700]};
`;

const RecentActivityWrapper = styled.div``;

export default Home;
