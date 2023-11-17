import ChatBubble from "../ChatBubble/ChatBubble";
import styled from "styled-components";
import React from "react";
import useChatScroll from "../../hooks/useChatScroll";

function Conversations({ conversations, aiMessage }) {
  const chatRef = useChatScroll();

  return (
    <Wrapper>
      <Messages ref={chatRef}>
        {conversations &&
          conversations.map((conversation, index) => {
            return (
              <ChatBubble
                isHuman={conversation.isHuman}
                message={conversation.message}
                key={index}
              />
            );
          })}
        {aiMessage && <ChatBubble isHuman={false} message={aiMessage} />}
      </Messages>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
  flex: 1;
`;

const Messages = styled.div`
  overflow-y: auto;
  padding: 15px;
`;

export default Conversations;
