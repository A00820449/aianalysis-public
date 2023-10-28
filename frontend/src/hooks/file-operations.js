import { useMutation } from "react-query";
import { jsonFetcherGet } from "./common";
import { analizeURL } from "../config/backendURL";
import { operations } from "../components/DataPreprocessing/DataPreprocessingOps"

/**
 * @param {{filename: string, operation: keyof operations}} param0
 * @returns 
 */
const analizeFile = ({filename, operation}) => jsonFetcherGet(`${analizeURL}?${new URLSearchParams({filename: filename, operation: operation})}`)

/**
 * Wrapper for React Query mutation hook used for the 'analize' backend route
 * @example
 * const { doOperationFileAsync } = useFileOperation()
 * 
 * const handleClick = async () => {
 *   const res = await doOperationFileAsync({filename: selectedFile, operation: selectedOperation}) // res has the server's parsed json response
 * }
 */
export function useFileOperation() {
    const { mutate, mutateAsync } = useMutation({mutationFn: analizeFile})

    return { doOperationFile: mutate, doOperationFileAsync: mutateAsync }
}