import axios from "axios";
import { statisticsURL } from "../config/backendURL";
import { useQuery } from "react-query";

const fetchFileStats = (filename) => axios.get(statisticsURL, {params: {filename: filename}}).then(r => r.data)

export function useFetchStats(filename) {
    const {data, error, isSuccess} = useQuery({queryFn: () => fetchFileStats(filename), queryKey: ["stats", filename]})

    return {data: data ?? {}, isSuccess, error}
}