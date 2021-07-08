import React from "react";
import { Link } from "react-router-dom";
import Routes from "../Routes";
import { Layout, Menu, Typography } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function Sidebar() {
  return (
    <Layout className="site-layout">
      <Header className="site-layout-background site-header">
        <Title level={3} style={{ marginTop: "10px" }}>
          Welcome to sports league
        </Title>
      </Header>
      <Layout>
        <Sider trigger={null} collapsible>
          <Menu
            defaultSelectedKeys={["teams"]}
            mode="inline"
            style={{ height: "100%" }}
          >
            <Menu.Item key="teams" icon={<TeamOutlined />}>
              <Link to="/">Teams</Link>
            </Menu.Item>
            <Menu.Item key="players" icon={<UserOutlined />}>
              <Link to="/Players">Players</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 680,
          }}
        >
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}
