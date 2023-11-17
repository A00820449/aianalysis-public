import { Outlet } from "react-router-dom";
import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import Chat from "../../components/Chat/Chat";

const { Header, Sider, Content } = Layout;

export default function Root() {
  const [recentActivities, setRecentActivities] = React.useState([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsedChat, setCollapsedChat] = React.useState(false);

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
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
          <Button
            type="text"
            icon={collapsedChat ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsedChat(!collapsedChat)}
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
          <Outlet context={[recentActivities, setRecentActivities]} />
        </Content>
      </Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsedChat}
        style={{ height: "100%" }}
        width={350}
        collapsedWidth={0}
      >
        <Chat />
      </Sider>
    </Layout>
  );
}
