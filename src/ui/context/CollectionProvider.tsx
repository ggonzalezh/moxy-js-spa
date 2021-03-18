import React, { createContext, useEffect, useState } from "react";
import { CollectionViewModel } from "./model/CollectionViewModel";
import { GetCollectionsUseCase } from "../../domain/GetCollectionsUseCase";
import { CollectionToCollectionViewModelMapper } from "./mapper/CollectionToCollectionViewModelMapper";

export interface ICollectionContext {
  collections: CollectionViewModel[];
  getCollections: () => void;
}

export const createCollectionProvider = ({
  getCollectionsUseCase,
  collectionMapper,
}: ICollectionDependencies): React.FC => {
  return ({ children }) => {
    const [collections, setCollections] = useState<CollectionViewModel[]>([]);

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

    const context = { collections, getCollections };

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
});
