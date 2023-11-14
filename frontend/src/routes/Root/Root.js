import { Outlet } from "react-router-dom";
import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;

export default function Root() {
  const [collapsed, setCollapsed] = React.useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100%" }}
      >
        <SideMenu collapsed={collapsed} />
      </Sider>
      <Layout>
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
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
