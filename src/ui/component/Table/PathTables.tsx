import React from "react";
import { RouteViewModel } from "../../model/RouteViewModel";
import { Table } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const PathTables = ({ routes }: RouteProps) => {
  console.log(routes);
  const columns = [
    { title: "Collection", dataIndex: "collection", key: "collection" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Path", dataIndex: "path", key: "path" },
    { title: "Method", dataIndex: "method", key: "method" },
  ];
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Table dataSource={routes} columns={columns} />
      </DndProvider>
    </div>
  );
};

export interface RouteProps {
  routes: RouteViewModel[];
}
