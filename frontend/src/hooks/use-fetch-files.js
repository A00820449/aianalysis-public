import React from "react";
import { filesURL } from "../config/backendURL";

function useFetchFiles() {
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    async function fetchFiles() {
      const response = await fetch(filesURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      json.forEach((file) => {
        file.uid = crypto.randomUUID();
      });
      setFiles(json);
    }

    fetchFiles();
  }, []);

  return [files, setFiles];
}

export default useFetchFiles;
