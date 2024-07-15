import { useEffect, useRef } from "react";
import { Form, DatePicker } from "antd";
import dayjs from 'dayjs'

import { CellEditorProps } from "./CellEditor";

const dateFormat = 'YYYY-MM-DD'

function DateEditor(props: CellEditorProps) {
  const [form] = Form.useForm();
  const inputRef = useRef(null)

  const name = 'value'
  const rules = [
    { required: true, message: '' }
  ]

  function onChange() {
    form.validateFields().then(() => {
      const date = form.getFieldValue(name);
      const value = date.format(dateFormat)
      props.onChange(value)
    })
  }

  useEffect(() => {
    const date = dayjs(props.value, dateFormat)
    form.setFieldValue(name, date)

    if (props.focus) {
      const el: any = inputRef.current
      el.focus()
      el.nativeElement.click()
    }
  }, [])

  return (
    <Form form={form}>
      <Form.Item name={name} rules={rules}>
        <DatePicker ref={inputRef} format={dateFormat} onChange={onChange} />
      </Form.Item>
    </Form>
  )
}

export default DateEditor