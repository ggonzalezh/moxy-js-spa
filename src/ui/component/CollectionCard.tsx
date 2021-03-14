import React from "react";
import { CollectionViewModel } from "../model/CollectionViewModel";
import { Card } from "antd";

let CollectionCard = (collection: CollectionViewModel) => {
  return (
    <Card title={collection.name} hoverable={true}>
      <p>{collection.pathNumber} paths registered</p>
    </Card>
  );
};
export default CollectionCard;
