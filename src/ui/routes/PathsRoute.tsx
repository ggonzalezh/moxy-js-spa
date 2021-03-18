import { Button, Drawer, Form, PageHeader } from "antd";
import React, { useContext, useEffect } from "react";
import PathEditor from "../container/PathEditor";
import { useHistory } from "react-router-dom";
import { PathTables } from "../component/Table/PathTable";
import { IPathContext, PathContext } from "../context/PathProvider";

const PathsRoute = ({ collectionId }: PathsRouteProps) => {
  const {
    collectionName,
    setCollectionId,
    paths,
    showDrawer,
    hideDrawer,
    addPath,
    isDrawerVisible,
  } = useContext<IPathContext>(PathContext);

  const [pathEditorForm] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    setCollectionId(collectionId);
  }, [setCollectionId, collectionId]);

  const onSaveClick = () => pathEditorForm.submit();

  return (
    <>
      <PageHeader
        className={"content-header"}
        onBack={() => history.goBack()}
        title={"Paths"}
        subTitle={collectionName}
      />
      <PathTables paths={paths} showDrawer={showDrawer} />
      <Button type="primary" onClick={showDrawer}>
        Add Path
      </Button>
      <Drawer
        title="New Path"
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
            <Button onClick={onSaveClick} type="primary">
              Save
            </Button>
          </div>
        }
      >
        <PathEditor pathEditorForm={pathEditorForm} onSave={addPath} />
      </Drawer>
    </>
  );
};

export interface PathsRouteProps {
  collectionId: string;
}

export default PathsRoute;
