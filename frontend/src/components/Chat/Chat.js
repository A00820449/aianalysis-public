import React, { useCallback } from "react";
import styled from "styled-components";
import InputForm from "../InputForm";
import Suggestions from "../Suggestions";
import Conversations from "../Conversations";
import openai from "../../config/openai";
import { COLORS } from "../../constants";
import { spark } from "../../utils/spark";

export default function Chat() {
  const [conversations, setConversations] = React.useState([]);
  const [chatHistory, setChatHistory] = React.useState([]);
  const [aiMessage, setAiMessage] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");
  const [selectedSuggestion, setSelectedSuggestion] = React.useState("");
  const textAreaRef = React.useRef(null);
  const submitRef = React.useRef(null);

  React.useEffect(() => {
    async function getWelcomeMessage() {
      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              spark +
              "Welcome the user with a short message. Ask him how can you help.",
          },
        ],
        stream: true, // This is required to stream the response
      });

      let streamedMessage = "";

      // The stream will be read till its closed
      for await (const part of stream) {
        setAiMessage((prev) => prev + part.choices[0].delta.content);

        // Once the entire message is received, the stream will receive the finish_reason as 'stop;
        if (part.choices[0].finish_reason === "stop") {
          setConversations((prev) => {
            return [
              ...prev,
              {
                message: streamedMessage,
                isHuman: false,
              },
            ];
          });

          setChatHistory((prev) => {
            return [...prev, streamedMessage];
          });

          setAiMessage("");
          break;
        } else {
          streamedMessage += part.choices[0].delta.content;
        }
      }
    }
    getWelcomeMessage();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault(); //To prevent the default form submission behaviour

      // Storing the user message to the state
      setConversations((prev) => {
        return [
          ...prev,
          {
            message: userMessage || selectedSuggestion,
            isHuman: true,
          },
        ];
      });

      setChatHistory((prev) => {
        return [...prev, userMessage || selectedSuggestion];
      });

      setUserMessage(""); // Emptying the input field
      textAreaRef.current.focus(); // Focusing the input field again

      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Previous interactions: [${chatHistory.join(
              ","
            )}]. Knowing previous messages, answer this message/question: ${
              userMessage || selectedSuggestion
            }`,
          },
        ],
        stream: true, // This is required to stream the response
      });

      let streamedMessage = "";

      // The stream will be read till its closed
      for await (const part of stream) {
        setAiMessage((prev) => prev + part.choices[0].delta.content);

        // Once the entire message is received, the stream will receive the finish_reason as 'stop;
        if (part.choices[0].finish_reason === "stop") {
          setConversations((prev) => {
            return [
              ...prev,
              {
                message: streamedMessage,
                isHuman: false,
              },
            ];
          });

          setChatHistory((prev) => {
            return [...prev, streamedMessage];
          });

          setAiMessage("");
          break;
        } else {
          streamedMessage += part.choices[0].delta.content;
        }
      }
    },
    [userMessage, chatHistory, selectedSuggestion]
  );

  return (
    <Wrapper>
      <Conversations conversations={conversations} aiMessage={aiMessage} />

      <Suggestions
        ref={submitRef}
        setSelectedSuggestion={setSelectedSuggestion}
      />

      <InputForm
        ref={[textAreaRef, submitRef]}
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        selectedSuggestion={selectedSuggestion}
        setSelectedSuggestion={setSelectedSuggestion}
        handleSubmit={handleSubmit}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${COLORS.white};
`;
