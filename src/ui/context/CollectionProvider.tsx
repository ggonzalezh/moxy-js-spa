import React, { createContext, useEffect, useState } from "react";
import { CollectionViewModel } from "./model/CollectionViewModel";
import { GetCollectionsUseCase } from "../../domain/GetCollectionsUseCase";
import { CollectionToCollectionViewModelMapper } from "./mapper/CollectionToCollectionViewModelMapper";
import { AddCollectionUseCase } from "../../domain/AddCollectionUseCase";
import { message } from "antd";
import { DeleteCollectionUseCase } from "../../domain/DeleteCollectionUseCase";

export interface ICollectionContext {
  collections: CollectionViewModel[];
  getCollections: () => void;
  isDrawerVisible: boolean;
  showDrawer: () => void;
  hideDrawer: () => void;
  addCollection: (collection: any) => void;
  editCollection: (collection: any) => void;
  removeCollection: (collection: any) => void;
}

export const createCollectionProvider = ({
  getCollectionsUseCase,
  addCollectionUseCase,
  deleteCollectionUseCase,
  collectionMapper,
}: ICollectionDependencies): React.FC => {
  return ({ children }) => {
    const [collections, setCollections] = useState<CollectionViewModel[]>([]);
    const [isDrawerVisible, setDrawerVisibility] = useState(false);
    const [shouldRefresh, refresh] = useState<any>({});

    useEffect(() => {
      getCollectionsUseCase
        .execute()
        .then((collections) => collectionMapper.mapArray(collections))
        .then(setCollections);
    }, [shouldRefresh]);

    const getCollections = async () => {
      setCollections(
        collectionMapper.mapArray(await getCollectionsUseCase.execute())
      );
    };

    const addCollection = async (collection: any) => {
      await addCollectionUseCase.execute(collection);
      hideDrawer();
      message.success("Collection created");
      refresh({});
    };

    const editCollection = async (collection: any) => {
      showDrawer();
    };

    const removeCollection = async (collection: any) => {
      await deleteCollectionUseCase.execute(collection);
      message.success("Collection deleted");
      refresh({});
    };

    const showDrawer = () => {
      setDrawerVisibility(true);
    };

    const hideDrawer = () => {
      setDrawerVisibility(false);
    };

    return (
      <CollectionContext.Provider
        value={{
          collections,
          getCollections,
          showDrawer,
          hideDrawer,
          isDrawerVisible,
          addCollection,
          editCollection,
          removeCollection,
        }}
      >
        {children}
      </CollectionContext.Provider>
    );
  };
};

interface ICollectionDependencies {
  getCollectionsUseCase: GetCollectionsUseCase;
  addCollectionUseCase: AddCollectionUseCase;
  deleteCollectionUseCase: DeleteCollectionUseCase;
  collectionMapper: CollectionToCollectionViewModelMapper;
}

export const CollectionContext = createContext<ICollectionContext>({
  collections: [],
  getCollections: () => {},
  hideDrawer(): void {},
  showDrawer(): void {},
  isDrawerVisible: false,
  addCollection: () => {},
  editCollection: () => {},
  removeCollection: () => {},
});
