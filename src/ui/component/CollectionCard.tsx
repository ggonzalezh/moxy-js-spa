import React from "react";
import { CollectionViewModel } from "../model/CollectionViewModel";
import { Link } from "react-router-dom";
import { Card } from "antd";

const CollectionCard = (collection: CollectionViewModel) => {
  const { name, pathNumber } = collection;
  return (
    <Link to={`./${name}`}>
      <Card title={name} hoverable={true}>
        <p>{pathNumber} paths registered</p>
      </Card>
    </Link>
  );
};

export default CollectionCard;
