import React from "react";
import { CollectionViewModel } from "../context/model/CollectionViewModel";
import { Link } from "react-router-dom";
import { Card } from "antd";

const CollectionCard = (collection: CollectionViewModel) => {
  const { id, name, pathNumber } = collection;
  return (
    <Link to={`./${id}`}>
      <Card title={name} hoverable={true}>
        <p>{pathNumber} paths registered</p>
      </Card>
    </Link>
  );
};

export default CollectionCard;
