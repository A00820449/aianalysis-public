import React from "react";
import { filesURL, getDeleteFileURL } from "../config/backendURL";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { jsonFetcherGet, jsonFetcherDelete } from "./common"

function useFetchFiles_old() {
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

/**
 * @typedef {{file_name: string, file_size: number}[]} FetchFilesPayload
 * @returns {Promise<FetchFilesPayload>}
 */
const fetchFiles = () => jsonFetcherGet(filesURL)
export function useFetchFiles() {
  const {data, isSuccess, refetch} = useQuery({queryKey: ["files"], queryFn: fetchFiles})

  /**
   * @type {(FetchFilesPayload[number] & {uuid: string})[]}
   */
  let files = []
  if (isSuccess) { 
    data.forEach(f => f["uuid"] = crypto.randomUUID()) 
    files = data
  }

  return {files, refetch}
}

const deleteFile = (filename) => jsonFetcherDelete(getDeleteFileURL(filename))
export function useDeleteFile() {
  const queryClient = useQueryClient()
  const { mutate, mutateAsync, reset } = useMutation({mutationFn: deleteFile, onSuccess: () => queryClient.invalidateQueries({queryKey: ["files"]})})

  return { deleteFile: mutate, deleteFileAsync: mutateAsync, reset }
}

export default useFetchFiles;
