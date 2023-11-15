import {
  FileOutlined,
  BarChartOutlined,
  ExperimentOutlined,
  DotChartOutlined,
} from "@ant-design/icons";

export const quickAccessData = [
  {
    key: crypto.randomUUID(),
    title: "My Files",
    label: "Open",
    icon: <FileOutlined />,
    path: "/my-files",
  },
  {
    key: crypto.randomUUID(),
    title: "Data Preprocessing",
    label: "Run",
    icon: <ExperimentOutlined />,
    path: "/data-preprocessing",
  },
  {
    key: crypto.randomUUID(),
    title: "Statistical Analysis",
    label: "Elaborate",
    icon: <BarChartOutlined />,
    path: "/statistical-analysis",
  },
  {
    key: crypto.randomUUID(),
    title: "Scatter Chart",
    label: "Visualize",
    icon: <DotChartOutlined />,
    path: "/visualizations/scatter",
  },
];
