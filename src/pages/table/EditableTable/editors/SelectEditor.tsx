import { useEffect, useRef } from "react";
import { Form, Select } from "antd";

import { CellEditorProps } from "./CellEditor";

function SelectEditor(props: CellEditorProps) {
  const [form] = Form.useForm();
  const inputRef = useRef(null)

  const name = 'value'
  const rules = [
    { required: true, message: '' }
  ]

  function onChange() {
    form.validateFields().then(() => {
      const value = form.getFieldValue(name);
      props.onChange(value)
    })
  }

  useEffect(() => {
    form.setFieldValue(name, props.value)

    if (props.focus) {
      const el: any = inputRef.current
      el.focus()
    }
  }, [])

  return (
    <Form form={form}>
      <Form.Item name={name} rules={rules}>
        <Select ref={inputRef} options={props.options} onChange={onChange} />
      </Form.Item>
    </Form>
  )
}

export default SelectEditor