import useFetchFiles from "../../hooks/use-fetch-files";
import { Select } from "antd";

/**
 * @param {{onChange?: (value: string) => void}} props
 */
function FileSelectDropdown({ onChange }) {
  const { files } = useFetchFiles();

  return (
    <Select
      options={files.map((v) => ({ value: v.file_name, name: v.file_name }))}
      placeholder={"Select a file"}
      onChange={onChange}
      style={{ minWidth: 200 }}
    />
  );
}

export default FileSelectDropdown;
