import { CollectionToCollectionViewModelMapper } from "./mapper/CollectionToCollectionViewModelMapper";
import React, { createContext, useEffect, useState } from "react";
import { GetCollectionByIdUseCase } from "../../domain/GetCollectionByIdUseCase";
import { AddPathUseCase } from "../../domain/AddPathUseCase";
import { PathViewModel } from "./model/PathViewModel";
import { message } from "antd";

export interface IPathContext {
  collectionId: string;
  collectionName: string;
  paths: PathViewModel[];
  isDrawerVisible: boolean;
  setCollectionId: (collectionId: string) => void;
  showDrawer: () => void;
  hideDrawer: () => void;
  addPath: (path: any) => void;
}

export interface IPathDependencies {
  collectionMapper: CollectionToCollectionViewModelMapper;
  getCollectionByIdUseCase: GetCollectionByIdUseCase;
  addPathUseCase: AddPathUseCase;
}

export const createPathProvider = ({
  collectionMapper,
  getCollectionByIdUseCase,
  addPathUseCase,
}: IPathDependencies): React.FC => ({ children }) => {
  const [collectionId, setCollectionId] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [paths, setPaths] = useState<PathViewModel[]>([]);
  const [isDrawerVisible, setDrawerVisibility] = useState(false);

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
  }, [collectionId]);

  const addPath = (path: any) => {
    addPathUseCase.execute({ collection: collectionId, ...path }).then(() => {
      console.log("executed");
      hideDrawer();
      message.success("Path created");
    });
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
  hideDrawer(): void {},
  showDrawer(): void {},
  collectionId: "",
  collectionName: "",
  paths: [],
  setCollectionId: () => {},
  isDrawerVisible: false,
});
