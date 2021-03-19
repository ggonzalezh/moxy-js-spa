import { Form, FormInstance, Input, Radio, Select } from "antd";
import React, { useContext } from "react";
import MockEditor from "./MockEditor";
import { IPathContext, PathContext } from "../context/PathProvider";

const methods = ["get", "post", "patch", "options", "put", "all"];

const PathEditor = ({ pathEditorForm }: PathEditorProps) => {
  const { addPath } = useContext<IPathContext>(PathContext);

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      layout={"vertical"}
      form={pathEditorForm}
      onFinish={addPath}
    >
      <Form.Item label="Method" name={"method"} initialValue={"get"}>
        <Select>
          {methods.map((method) => (
            <Select.Option key={method} value={method}>
              {method.toUpperCase()}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Path" name={"path"} initialValue={""} required>
        <Input placeholder="/path/to/match" />
      </Form.Item>
      <Form.Item name="type" initialValue={"mock"}>
        <Radio.Group>
          <Radio.Button value="mock">Mock</Radio.Button>
          <Radio.Button value="proxy">Proxy</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <MockEditor />
    </Form>
  );
};

interface PathEditorProps {
  pathEditorForm: FormInstance;
}

export default PathEditor;
