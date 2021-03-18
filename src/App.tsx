import React from "react";
import { Layout, Menu, Typography } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { FolderOutlined } from "@ant-design/icons";
import CollectionsRoute from "./ui/routes/CollectionsRoute";
import { CollectionProvider, PathProvider } from "./common/Config";
import PathsRoute from "./ui/routes/PathsRoute";

const { Sider, Header, Content } = Layout;

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
        <Router>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <CollectionProvider>
                    <CollectionsRoute />
                  </CollectionProvider>
                )}
              />
              <Route
                exact
                path="/:collectionId"
                render={(props) => (
                  <PathProvider>
                    <PathsRoute
                      collectionId={props.match.params.collectionId}
                    />
                  </PathProvider>
                )}
              />
            </Switch>
          </Content>
        </Router>
      </Layout>
    </Layout>
  );
}

export default App;
