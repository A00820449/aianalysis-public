import React from "react";
import { filesURL, getDeleteFileURL } from "../config/backendURL";
import { useMutation, useQuery } from "react-query";
import { jsonFetcherGet, jsonFetcherDelete } from "./common"

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

const fetchFiles = () => jsonFetcherGet(filesURL)
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

const deleteFile = (filename) => jsonFetcherDelete(getDeleteFileURL(filename))
export function useDeleteFile() {
  const { mutate, mutateAsync, reset } = useMutation({mutationFn: deleteFile})

  return { deleteFile: mutate, deleteFileAsync: mutateAsync, reset }
}

export default useFetchFiles;
