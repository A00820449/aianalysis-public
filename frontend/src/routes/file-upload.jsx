import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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

const FileUploadWrapper = styled.label`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: hsla(210, 17%, 9%, 1.00);
  padding-left: 1rem;
  padding-right: 1rem;
  transition-property: all;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0s;
  border-width: 2px;
  border-style: dashed;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  outline: none;
`;

export default function FileUpload() {
  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>Upload File</Title>
        <Description>Please upload a CSV file</Description>
      </HeaderWrapper>
      <FileUploadWrapper>
          <span class="flex items-center space-x-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span class="font-medium">
                  Drop files to Attach, or <span class="text-blue-400 underline">browse</span>
              </span>
          </span>
          <input type="file" name="file_upload" class="hidden" />
      </FileUploadWrapper>
  </Wrapper>
  );
}