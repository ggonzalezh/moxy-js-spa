import React from "react";
import { RouteViewModel } from "../../model/RouteViewModel";
import { Button, Table } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const PathTables = ({ routes, showDrawer }: RouteProps) => {
  const columns = [
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Path", dataIndex: "path", key: "path" },
    { title: "Method", dataIndex: "method", key: "method" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div>
          <Button onClick={showDrawer}>Modify</Button>
        </div>
      ),
    },
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
  showDrawer: () => void;
}
