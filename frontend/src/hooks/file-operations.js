import { useMutation } from "react-query";
import { jsonFetcherGet } from "./common";
import { analizeURL } from "../config/backendURL";

/**
 * 
 * @param {string} filename Name of the specific file to do the operation on (currently not implemented)
 * @param {"clean" | "patch" | "outliers"} operation Name of the operation
 * @returns 
 */
const analizeFile = (filename, operation) => jsonFetcherGet(`${analizeURL}?${new URLSearchParams({filename: filename, operation: operation})}`)

/**
 * Wrapper for React Query mutation hook used for the 'analize' backend route
 */
export function useAnalizeFile() {
    const { mutate, mutateAsync } = useMutation({mutationFn: analizeFile})

    return { analizeFile: mutate, analizeFileAsync: mutateAsync }
}