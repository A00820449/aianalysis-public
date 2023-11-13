import {
  FileOutlined,
  BarChartOutlined,
  ExperimentOutlined,
  DotChartOutlined,
} from "@ant-design/icons";

export const routes = [
  {
    key: "1",
    icon: <FileOutlined />,
    label: "My Files",
    path: "/my-files",
  },
  {
    key: "2",
    icon: <ExperimentOutlined />,
    label: "Data Preprocessing",
    path: "/data-preprocessing",
  },
  {
    key: "3",
    icon: <BarChartOutlined />,
    label: "Statistical Analysis",
    path: "/statistical-analysis",
  },
  {
    key: "4",
    icon: <DotChartOutlined />,
    label: "Visualizations",
    path: "/visualizations",
  },
];
