import { CollectionViewModel } from "../model/CollectionViewModel";
import { List } from "antd";
import CollectionCard from "../component/CollectionCard";
import { GetCollectionsUseCase } from "../../domain/GetCollectionsUseCase";
import { useEffect, useState } from "react";
import { CollectionToCollectionViewModelMapper } from "../mapper/CollectionToCollectionViewModelMapper";

let CollectionsRoute = ({
  getCollectionsUseCase,
  collectionMapper,
}: CollectionsRouteProps) => {
  const [collections, setCollections] = useState<CollectionViewModel[]>([]);

  useEffect(() => {
    getCollectionsUseCase
      .execute()
      .then((collections) =>
        setCollections(collectionMapper.mapArray(collections))
      );
  }, [getCollectionsUseCase, collectionMapper]);

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={collections}
      renderItem={(item) => (
        <List.Item>
          <CollectionCard {...item} />
        </List.Item>
      )}
    />
  );
};

export interface CollectionsRouteProps {
  getCollectionsUseCase: GetCollectionsUseCase;
  collectionMapper: CollectionToCollectionViewModelMapper;
}

export default CollectionsRoute;
