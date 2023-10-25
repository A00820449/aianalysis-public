import React from "react";
import { filesURL } from "../config/backendURL";
import { useQuery } from "react-query";

const jsonFetcher = url => fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
}).then(r => r.json())

const fetchFiles = () => jsonFetcher(filesURL)

function old_useFetchFiles() {
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

export function useFetchFiles() {
  const {data, isSuccess, refetch} = useQuery({queryKey: "files", queryFn: fetchFiles})

  let files = null
  if (isSuccess) { 
    data.forEach(f => f["uuid"] = crypto.randomUUID()) 
    files = data
  }
  else {
    files = []
  }

  return {files, refetch}
}

export default useFetchFiles;
