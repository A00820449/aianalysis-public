import React, { useState } from "react";
import axios from "axios";
import FileSelect from "../../components/FileSelect";
import OperationSelect from "../../components/OperationSelect";
import { useFileOperation } from "../../hooks/file-operations";
import { cleanDataURL } from "../../config/backendURL";
import { Steps, Button } from "antd";

const DataPreprocessing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState("clean");
  const [message, setMessage] = useState("");
  const { doOperationFileAsync } = useFileOperation();

  const steps = [
    {
      title: "Select File",
      content: (
        <FileSelect
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      ),
    },
    {
      title: "Choose an Operation",
      content: (
        <OperationSelect
          selectedFile={selectedFile}
          selectedOperation={selectedOperation}
          setSelectedOperation={setSelectedOperation}
        />
      ),
    },
    {
      title: "Results",
      content: (
        <>
          <div>
            Filename: <code>{selectedFile ?? "none"}</code>
          </div>
          <div>
            Operation: <code>{selectedOperation}</code>
          </div>
        </>
      ),
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const apiUrl = cleanDataURL;

  const handleOperationChange = (event) => {
    setSelectedOperation(event.target.value);
  };

  const _handleOperationSubmit = () => {
    axios
      .get(apiUrl, { params: { operation: selectedOperation } })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error Processing Data:", error);
      });
  };

  const [dotPosition, setDotPosition] = useState("top");

  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  const handleOperationSubmit = async () => {
    try {
      const res = await doOperationFileAsync({
        filename: selectedFile,
        operation: selectedOperation,
      });
      alert(`server response: ${JSON.stringify(res)}`);
    } catch (e) {
      alert(`error: ${e}`);
    }
  };

  return (
    // <Wrapper>
    //   <HeaderWrapper>
    //     <h1 style={{ fontSize: "32px", color: `${blue.primary}` }}>
    //       Data Preprocessing
    //     </h1>
    //     <Description>Select file</Description>
    //   </HeaderWrapper>

    //   {/* Dropdown */}
    //   <Dropdown value={selectedOperation} onChange={handleOperationChange}>
    //     <option value="clean">Clean</option>
    //     <option value="patch">Patch</option>
    //     <option value="outliers">Eliminate outliers</option>
    //     {/* Add more options */}
    //   </Dropdown>

    //   <button onClick={handleOperationSubmit}>Submit</button>

    //   <div>
    //     <strong>Changes:</strong> {message}
    //   </div>
    // </Wrapper>
    <>
      <Steps current={currentStep} items={items} />
      <div style={{ marginTop: "1.5rem" }}>{steps[currentStep].content}</div>
      <div style={{ marginTop: "1.5rem" }}>
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleOperationSubmit}>
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default DataPreprocessing;
