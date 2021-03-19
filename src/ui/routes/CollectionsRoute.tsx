import { Button, Drawer, Form, List, PageHeader } from "antd";
import CollectionCard from "../component/CollectionCard";
import React, { useContext } from "react";
import { CollectionContext } from "../context/CollectionProvider";
import CollectionEditor from "../container/CollectionEditor";

const CollectionsRoute = () => {
  const { collections, isDrawerVisible, hideDrawer, showDrawer } = useContext(
    CollectionContext
  );
  const [pathEditorForm] = Form.useForm();

  return (
    <>
      <PageHeader
        className={"content-header"}
        title={"Collections"}
        extra={[
          <Button type="primary" onClick={showDrawer}>
            Add Collection
          </Button>,
        ]}
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={collections}
        renderItem={(item) => (
          <List.Item>
            <CollectionCard {...item} />
          </List.Item>
        )}
      />
      <Drawer
        title="New Collection"
        placement="right"
        width={520}
        closable={true}
        onClose={hideDrawer}
        visible={isDrawerVisible}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={hideDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={pathEditorForm.submit} type="primary">
              Save
            </Button>
          </div>
        }
      >
        <CollectionEditor pathEditorForm={pathEditorForm} />
      </Drawer>
    </>
  );
};

export default CollectionsRoute;
