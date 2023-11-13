import { visualizeURL } from "../config/backendURL";
import axios from "axios";
import { useQuery } from "react-query";

/**
 *
 * @param {string} filename
 * @returns {Promise<{x: number, y: number}[]>}
 */
const fetchVisualization = (filename) =>
  axios
    .get(visualizeURL, { params: { filename: filename } })
    .then((r) => r.data);
/**
 * @param {string} filename
 */
export function useFetchVisualization(filename) {
  const { data, refetch, error } = useQuery({
    queryKey: ["visualize", filename],
    queryFn: () => fetchVisualization(filename),
  });

  return { data: data ?? [], refetch, error };
}
