import { Outlet } from "react-router-dom";
import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileOutlined,
  BarChartOutlined,
  ExperimentOutlined,
  DotChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const pages = [
  {
    key: "1",
    icon: <FileOutlined />,
    label: "Files",
    path: "/files",
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

export default function Root() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState(pages[0].key);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedPage]}>
          {pages.map((page) => (
            <Menu.Item key={page.key} icon={page.icon}>
              <Link to={page.path}>{page.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ overflow: "auto" }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
