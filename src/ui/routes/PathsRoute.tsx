import { Button, Drawer, Form, message, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import PathEditor from "../container/PathEditor";
import { AddPathUseCase } from "../../domain/AddPathUseCase";
import { useHistory } from "react-router-dom";
import { PathTables } from "../component/Table/PathTables";
import { GetCollectionByNameUseCase } from "../../domain/GetCollectionByNameUseCase";
import { CollectionViewModel } from "../model/CollectionViewModel";
import { CollectionToCollectionViewModelMapper } from "../mapper/CollectionToCollectionViewModelMapper";

const PathsRoute = ({
  addPathUseCase,
  collectionName,
  getCollectionByNameUseCase,
  collectionMapper,
}: PathsRouteProps) => {
  const [collection, setCollection] = useState<CollectionViewModel>();
  const [isNewPath, setIsNewPath] = useState(false);
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
    setIsNewPath(true);
    hideDrawer();
    message.success("Path created");
  };

  const onSaveClick = () => pathEditorForm.submit();

  useEffect(() => {
    getCollectionByNameUseCase
      .execute(collectionName ? collectionName : "")
      .then((collection) => setCollection(collectionMapper.map(collection)));
  }, [isNewPath]);

  return (
    <>
      <PageHeader
        className={"content-header"}
        onBack={() => history.goBack()}
        title={"Paths"}
        subTitle={collectionName}
      />
      <PathTables routes={collection?.routes || []} showDrawer={showDrawer} />
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
  collectionMapper: CollectionToCollectionViewModelMapper;
  getCollectionByNameUseCase: GetCollectionByNameUseCase;
  addPathUseCase: AddPathUseCase;
  collectionName?: string;
}

export default PathsRoute;
