import styled from "styled-components";

export default function DataPreprocessing() {

  const cleanHere = () => {
    const apiUrl = 'http://localhost:5000/api/v1/cleanData';
    
    axios.get(apiUrl)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error Cleaning Data:', error);
      });
  }

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Data Preprocessing</Title>
        <Description>Select file</Description>
      </HeaderWrapper>
      <button onClick={cleanHere}>Clean Here!</button>
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