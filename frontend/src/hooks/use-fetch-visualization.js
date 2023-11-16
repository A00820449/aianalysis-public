import { scatterVisualiationUrl, visualizeURL } from "../config/backendURL";
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

const fetchScatterVisualization = (filename, columnX, columnY) => axios.get(scatterVisualiationUrl, {params: {filename, columnX, columnY}}).then(r => r.data)

/**
 * @param {string} filename 
 * @param {string} columnX 
 * @param {string} columnY 
 */
export function useFetchScatterVisualization(filename, columnX, columnY) {
  const { data, refetch, remove } = useQuery({queryKey: ["visualize", "scatter", filename], queryFn: () => fetchScatterVisualization(filename, columnX, columnY)})
  /**
   * @type {{x: any, y: any}[]}
   */
  const visualizationData = data?.data ?? []

  return { data: visualizationData, refetch, remove }
}
