import React from "react";
import styled from "styled-components";
import { sparkSuggestions } from "../../utils/sparkSuggestions";
import { COLORS } from "../../constants";

function Suggestions({ setSelectedSuggestion }, submitRef) {
  const [suggestions, setSuggestions] = React.useState([]);

  React.useEffect(() => {
    const numberOfSuggestions = 2;
    const questions = sparkSuggestions.map(({ uuid, question }) => {
      return { uuid, question };
    });
    setSuggestions(
      questions.sort(() => 0.5 - Math.random()).slice(0, numberOfSuggestions)
    );
  }, []);

  return (
    <Wrapper>
      <SuggestionPrompt>
        <Label>Suggestions:</Label>
        <SuggestionList>
          {suggestions.map(({ uuid, question }) => {
            return (
              <SuggestionItem
                key={uuid}
                onClick={async () => {
                  await setSelectedSuggestion(question);
                  submitRef.current.click();
                }}
              >
                <SuggestionButton>{question}</SuggestionButton>
              </SuggestionItem>
            );
          })}
        </SuggestionList>
      </SuggestionPrompt>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 15px;
`;

const SuggestionPrompt = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SuggestionList = styled.ul`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  overflow: auto;
  flex: 1;
`;

const SuggestionItem = styled.li`
  color: ${COLORS.white};
  max-width: 350px;
  list-style-type: none;
  padding: 10px;
  border-radius: 10px;
  background-color: hsl(212deg 70% 13%);
  cursor: pointer;
`;

const SuggestionButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${COLORS.white};
  font-weight: 500;
  text-align: left;
  width: 100%;
  cursor: pointer;
  padding: 0;
`;

const Label = styled.p`
  color: ${COLORS.gray.transparent};
`;

export default React.forwardRef(Suggestions);
