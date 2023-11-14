import {
  FileOutlined,
  BarChartOutlined,
  ExperimentOutlined,
  DotChartOutlined,
} from "@ant-design/icons";

export const routes = [
  {
    key: "my-files",
    label: "My Files",
    icon: <FileOutlined />,
    path: "/my-files",
  },
  {
    key: "data-preprocessing",
    label: "Data Preprocessing",
    icon: <ExperimentOutlined />,
    path: "/data-preprocessing",
  },
  {
    key: "statistical-analysis",
    label: "Statistical Analysis",
    icon: <BarChartOutlined />,
    path: "/statistical-analysis",
  },
  {
    key: "visualizations",
    label: "Visualizations",
    icon: <DotChartOutlined />,
    children: [
      {
        key: "scatter",
        label: "Scatter Chart",
        icon: <DotChartOutlined />,
        path: "/visualizations/scatter",
      },
    ],
  },
];
