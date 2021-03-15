import { Button, Drawer, Form, message, PageHeader } from "antd";
import React, { useState } from "react";
import PathEditor from "../container/PathEditor";
import { AddPathUseCase } from "../../domain/AddPathUseCase";
import { useHistory } from "react-router-dom";

const PathsRoute = ({ addPathUseCase, collectionName }: PathsRouteProps) => {
  const [isDrawerVisible, setDrawerVisibility] = useState(false);
  const [pathEditorForm] = Form.useForm();
  const history = useHistory();

  const showDrawer = () => {
    setDrawerVisibility(true);
  };

  const hideDrawer = () => {
    setDrawerVisibility(false);
  };

  const onSave = async (newPath: any) => {
    await addPathUseCase.execute({ collection: collectionName, ...newPath });
    hideDrawer();
    message.success("Path created");
  };

  const onSaveClick = () => pathEditorForm.submit();

  return (
    <>
      <PageHeader
        className={"content-header"}
        onBack={() => history.goBack()}
        title={"Paths"}
        subTitle={collectionName}
      />
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
        <PathEditor pathEditorForm={pathEditorForm} onSave={onSave} />
      </Drawer>
    </>
  );
};

export interface PathsRouteProps {
  addPathUseCase: AddPathUseCase;
  collectionName?: string;
}

export default PathsRoute;
