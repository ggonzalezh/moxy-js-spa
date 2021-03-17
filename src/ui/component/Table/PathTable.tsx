import React from "react";
import { PathViewModel } from "../../model/PathViewModel";
import { Button, Table } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const PathTables = ({ paths, showDrawer }: PathTableProps) => {
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
        <Table dataSource={paths} columns={columns} />
      </DndProvider>
    </div>
  );
};

export interface PathTableProps {
  paths: PathViewModel[];
  showDrawer: () => void;
}
