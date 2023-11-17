import styled from "styled-components";
import { COLORS, WEIGHTS } from "../../constants";
import { terms } from "./terms";

function TermsAndConditions() {
  return (
    <Wrapper>
      <Title>Terms and Conditions</Title>
      <Description>
        By using this website, you agree to the following terms and conditions:
      </Description>
      <TermsList>
        {terms.map((t) => (
          <Term key={t.id}>{t.term}</Term>
        ))}
      </TermsList>
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

const Description = styled.p`
  font-weight: ${WEIGHTS.normal};
  font-size: 1.2rem;
  padding: 1rem 0;
`;

const TermsList = styled.ul`
  list-style: revert;
  padding-left: 16px;
`;

const Term = styled.li`
  font-weight: ${WEIGHTS.normal};
  font-size: 1.2rem;
  padding: 1rem 0;
`;

export default TermsAndConditions;
