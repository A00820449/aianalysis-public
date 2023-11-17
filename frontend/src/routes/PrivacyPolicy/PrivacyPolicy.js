import styled from "styled-components";
import { COLORS, WEIGHTS } from "../../constants";
import { policies } from "./policies";

function PrivacyPolicy() {
  return (
    <Wrapper>
      <Title>Privacy Policy</Title>
      <PrivacyPolicyList>
        {policies.map((p) => (
          <Policy key={p.id}>{p.policy}</Policy>
        ))}
      </PrivacyPolicyList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  color: ${COLORS.primary};
  font-weight: ${WEIGHTS.medium};
  font-size: 2rem;
`;

const PrivacyPolicyList = styled.ul`
  list-style: revert;
  padding-left: 16px;
`;

const Policy = styled.li`
  font-weight: ${WEIGHTS.normal};
  font-size: 1.2rem;
  padding: 1rem 0;
`;

export default PrivacyPolicy;
