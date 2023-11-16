import axios from "axios";
import { useQuery } from "react-query";
import { columnsURL } from "../config/backendURL";

const fetchColumns = (filename) => axios.get(columnsURL, {params: {"filename": filename}}).then((r) => r.data)

/**
 * @param {string} filename 
 */
export function useFetchColumns(filename) {
    const {data, refetch, remove} = useQuery({queryFn: () => fetchColumns(filename), queryKey: ["columns", filename]})

    /**
     * @type {string[]}
     */
    const columns = data?.columns ?? []

    return {columns, refetch, remove}
}