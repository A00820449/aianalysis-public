import styled from "styled-components";
import { COLORS, WEIGHTS } from "../../constants";

function ContactUs() {
  return (
    <Wrapper>
      <Title>
        AI ANALYSIS: Unleashing the Power of Intelligent Data Insights!
      </Title>
      <Description>
        At AI ANALYSIS, we believe that data is not just information; it's the
        key to unlocking a world of possibilities. We understand the challenges
        you face in taming the vast sea of data, and that's why we've built a
        cutting-edge platform that empowers you to transform raw data into
        actionable insights effortlessly.
      </Description>
      <Header>🌐 Your Data, Your Way:</Header>
      <Description>
        AI ANALYSIS is your trusted companion in the journey of data exploration
        and mastery. Whether you're a seasoned data scientist or a novice
        explorer, our intuitive interface and powerful features cater to your
        unique needs. Seamlessly upload your datasets, and let the magic unfold.
      </Description>
      <Header>🚀 Tailored for Every Skill Level:</Header>
      <Description>
        AI ANALYSIS is designed for everyone. Whether you're a seasoned analyst,
        a business professional, or a student eager to explore the world of
        data, our platform adapts to your skill level. Enjoy a seamless
        experience with features that grow with you.
      </Description>
      <Header>🛠️ Security You Can Trust:</Header>
      <Description>
        Rest easy knowing that your data's security is our top priority. AI
        ANALYSIS employs robust security measures to safeguard your information,
        ensuring a worry-free environment for your analyses.
      </Description>
      <Header>🤖 Meet Spark! Your AI assistant:</Header>
      <Description>
        Introducing our intelligent chatbot, your virtual data assistant. Engage
        in natural language conversations to get quick answers, guidance on data
        preprocessing, and even discover the best visualization techniques
        tailored to your dataset. The more you interact, the smarter it becomes,
        anticipating your needs.
      </Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  color: ${COLORS.primary};
  font-weight: ${WEIGHTS.medium};
  font-size: 2rem;
`;

const Header = styled.h1`
  color: ${COLORS.secondary};
  font-size: ${24 / 16}rem;
`;

const Description = styled.p`
  font-weight: ${WEIGHTS.normal};
  font-size: 1.2rem;
  padding: 1rem 0;
`;

export default ContactUs;
