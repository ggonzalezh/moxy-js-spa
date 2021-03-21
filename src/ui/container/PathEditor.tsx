import { Form, FormInstance, Input, Radio, Select } from "antd";
import React, { useContext, useState } from "react";
import MockEditor from "./MockEditor";
import { IPathContext, PathContext } from "../context/PathProvider";
import ProxyEditor from "./ProxyEditor";

const methods = ["get", "post", "patch", "options", "put", "all"];

const initialPathType = "mock";

const PathEditor = ({ pathEditorForm }: PathEditorProps) => {
  const { addPath } = useContext<IPathContext>(PathContext);
  const [selectedType, setSelectedType] = useState<string>(initialPathType);

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      layout={"vertical"}
      form={pathEditorForm}
      onFinish={addPath}
    >
      <Input.Group compact>
        <Form.Item name={"method"} initialValue={"get"} noStyle>
          <Select style={{ width: "104px", textAlign: "left" }}>
            {methods.map((method) => (
              <Select.Option key={method} value={method}>
                {method.toUpperCase()}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={"path"}
          initialValue={""}
          required
          rules={[
            { required: true, message: "Please input path" },
            {
              pattern: /^([a-zA-Z0-9-_~$.&@]+|\/\*)(\/[a-zA-Z0-9-_~$.&@]+|\/\*)*$/,
              message: "Please input valid path",
            },
          ]}
        >
          <Input addonBefore={"/"} placeholder="path/to/match" />
        </Form.Item>
      </Input.Group>
      <Form.Item name="type" initialValue={initialPathType}>
        <Radio.Group onChange={(event) => setSelectedType(event.target.value)}>
          <Radio.Button value="mock">Mock</Radio.Button>
          <Radio.Button value="proxy">Proxy</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {selectedType === "mock" ? <MockEditor /> : <ProxyEditor />}
    </Form>
  );
};

interface PathEditorProps {
  pathEditorForm: FormInstance;
}

export default PathEditor;
