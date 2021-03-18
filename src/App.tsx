import React from "react";
import { Layout, Menu, Typography } from "antd";
import "./App.css";
import { FolderOutlined } from "@ant-design/icons";
import { ContentRouter } from "./ui/routes/ContentRouter";

const { Sider, Header } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark" trigger={null}>
        <div className="logo">
          <Typography.Title style={{ color: "#fff" }}>moxy</Typography.Title>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<FolderOutlined />}>
            Collections
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          &nbsp;
        </Header>
        <ContentRouter></ContentRouter>
      </Layout>
    </Layout>
  );
}

export default App;
