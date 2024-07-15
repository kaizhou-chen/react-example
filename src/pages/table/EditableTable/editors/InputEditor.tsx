import { useEffect, useRef } from "react";
import { Form, Input } from "antd";

import { CellEditorProps } from "./CellEditor";

function InputEditor(props: CellEditorProps) {
  const [form] = Form.useForm();
  const inputRef = useRef(null)

  const name = 'value'
  const rules = [
    { required: true, message: '' }
  ]

  function onBlur() {
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
    <Form form={form} autoComplete="off">
      <Form.Item name={name} rules={rules} validateTrigger='onBlur'>
        <Input ref={inputRef} onBlur={onBlur} />
      </Form.Item>
    </Form>
  )
}

export default InputEditor