import { List, PageHeader } from "antd";
import CollectionCard from "../component/CollectionCard";
import React, { useContext } from "react";
import { CollectionContext } from "../context/CollectionProvider";

const CollectionsRoute = () => {
  const { collections } = useContext(CollectionContext);

  return (
    <>
      <PageHeader className={"content-header"} title={"Collections"} />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={collections}
        renderItem={(item) => (
          <List.Item>
            <CollectionCard {...item} />
          </List.Item>
        )}
      />
    </>
  );
};

export default CollectionsRoute;
