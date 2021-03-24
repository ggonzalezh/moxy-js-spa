import { CollectionToCollectionViewModelMapper } from "./mapper/CollectionToCollectionViewModelMapper";
import React, { createContext, useEffect, useState } from "react";
import { GetCollectionByIdUseCase } from "../../domain/GetCollectionByIdUseCase";
import { AddPathUseCase } from "../../domain/AddPathUseCase";
import { PathViewModel } from "./model/PathViewModel";
import { message } from "antd";
import { PathFormViewModel } from "./model/PathFromViewModel";
import { PathFormViewModelToPathMapper } from "./mapper/PathFormViewModelToPathMapper";
import { DeletePathUseCase } from "../../domain/DeletePathUseCase";

export interface IPathContext {
  collectionId: string;
  collectionName: string;
  paths: PathViewModel[];
  setCollectionId: (collectionId: string) => void;
  isDrawerVisible: boolean;
  showDrawer: () => void;
  hideDrawer: () => void;
  addPath: (path: any) => void;
  deletePath: (path: any) => void;
}

export interface IPathDependencies {
  collectionMapper: CollectionToCollectionViewModelMapper;
  getCollectionByIdUseCase: GetCollectionByIdUseCase;
  addPathUseCase: AddPathUseCase;
  deletePathUseCase: DeletePathUseCase;
  pathFormMapper: PathFormViewModelToPathMapper;
}

export const createPathProvider = ({
  collectionMapper,
  getCollectionByIdUseCase,
  addPathUseCase,
  deletePathUseCase,
  pathFormMapper,
}: IPathDependencies): React.FC => ({ children }) => {
  const [collectionId, setCollectionId] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [paths, setPaths] = useState<PathViewModel[]>([]);
  const [isDrawerVisible, setDrawerVisibility] = useState(false);
  const [shouldRefresh, refresh] = useState<any>({});

  useEffect(() => {
    if (collectionId) {
      getCollectionByIdUseCase
        .execute(collectionId)
        .then((collection) => collectionMapper.map(collection))
        .then((collectionViewModel) => {
          setCollectionName(collectionViewModel.name);
          setPaths(collectionViewModel.paths);
        });
    }
  }, [collectionId, shouldRefresh]);

  const addPath = async (path: PathFormViewModel) => {
    await addPathUseCase.execute(
      pathFormMapper.map({ ...path, collection: collectionId })
    );
    hideDrawer();
    message.success("Path created");
    refresh({});
  };

  const deletePath = async (path: PathViewModel) => {
    await deletePathUseCase.execute({ ...path });
    message.success("Path deleted");
    refresh({});
  };

  const showDrawer = () => {
    setDrawerVisibility(true);
  };

  const hideDrawer = () => {
    setDrawerVisibility(false);
  };

  return (
    <PathContext.Provider
      value={{
        collectionId,
        paths,
        collectionName,
        isDrawerVisible,
        setCollectionId,
        addPath,
        deletePath,
        showDrawer,
        hideDrawer,
      }}
    >
      {children}
    </PathContext.Provider>
  );
};

export const PathContext = createContext<IPathContext>({
  addPath: () => {},
  deletePath: () => {},
  hideDrawer(): void {},
  showDrawer(): void {},
  isDrawerVisible: false,
  collectionId: "",
  collectionName: "",
  paths: [],
  setCollectionId: () => {},
});
