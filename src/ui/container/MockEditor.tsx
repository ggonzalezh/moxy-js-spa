import React, { Fragment } from "react";
import { Checkbox, Form, Input } from "antd";

const MockEditor = () => {
  return (
    <Fragment>
      <Form.Item
        name={"encoded"}
        initialValue={false}
        valuePropName={"checked"}
      >
        <Checkbox>Encoded</Checkbox>
      </Form.Item>
      <Form.Item
        label="Content Type"
        name={"contentType"}
        initialValue={"application/json"}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Body" name={"responseBody"}>
        <Input.TextArea autoSize={true} placeholder={'{"some": "json"}'} />
      </Form.Item>
    </Fragment>
  );
};

export default MockEditor;
