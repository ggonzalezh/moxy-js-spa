import React, { createContext, useEffect, useState } from "react";
import { CollectionViewModel } from "./model/CollectionViewModel";
import { GetCollectionsUseCase } from "../../domain/GetCollectionsUseCase";
import { CollectionToCollectionViewModelMapper } from "./mapper/CollectionToCollectionViewModelMapper";

export interface ICollectionContext {
  collections: CollectionViewModel[];
  getCollections: () => void;
  isDrawerVisible: boolean;
  showDrawer: () => void;
  hideDrawer: () => void;
  addCollection: () => void;
}

export const createCollectionProvider = ({
  getCollectionsUseCase,
  collectionMapper,
}: ICollectionDependencies): React.FC => {
  return ({ children }) => {
    const [collections, setCollections] = useState<CollectionViewModel[]>([]);
    const [isDrawerVisible, setDrawerVisibility] = useState(false);

    useEffect(() => {
      getCollectionsUseCase
        .execute()
        .then((collections) => collectionMapper.mapArray(collections))
        .then(setCollections);
    }, []);

    const getCollections = async () => {
      setCollections(
        collectionMapper.mapArray(await getCollectionsUseCase.execute())
      );
    };

    const addCollection = async () => {};

    const showDrawer = () => {
      setDrawerVisibility(true);
    };

    const hideDrawer = () => {
      setDrawerVisibility(false);
    };

    const context = {
      collections,
      getCollections,
      showDrawer,
      hideDrawer,
      isDrawerVisible,
      addCollection,
    };

    return (
      <CollectionContext.Provider value={context}>
        {children}
      </CollectionContext.Provider>
    );
  };
};

interface ICollectionDependencies {
  getCollectionsUseCase: GetCollectionsUseCase;
  collectionMapper: CollectionToCollectionViewModelMapper;
}

export const CollectionContext = createContext<ICollectionContext>({
  collections: [],
  getCollections: () => {},
  hideDrawer(): void {},
  showDrawer(): void {},
  isDrawerVisible: false,
  addCollection: () => {},
});
