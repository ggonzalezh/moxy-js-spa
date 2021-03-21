import React, { useContext } from "react";
import { Form, FormInstance, Input } from "antd";
import {
  CollectionContext,
  ICollectionContext,
} from "../context/CollectionProvider";

const CollectionEditor = ({ pathEditorForm }: ICollectionEditorProps) => {
  const { addCollection } = useContext<ICollectionContext>(CollectionContext);

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      layout={"vertical"}
      form={pathEditorForm}
      onFinish={addCollection}
    >
      <Form.Item
        label="Name"
        name={"name"}
        initialValue={""}
        requiredMark={"optional"}
        rules={[{ required: true, message: "Please input collection name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Base Path"
        name={"basePath"}
        initialValue={""}
        requiredMark={"optional"}
        rules={[
          { required: true, message: "Please input base path" },
          {
            pattern: /^[a-zA-Z0-9-_]+$/,
            message: "Please input valid base path",
          },
        ]}
      >
        <Input addonBefore={"/"} />
      </Form.Item>
    </Form>
  );
};

interface ICollectionEditorProps {
  pathEditorForm: FormInstance;
}

export default CollectionEditor;
