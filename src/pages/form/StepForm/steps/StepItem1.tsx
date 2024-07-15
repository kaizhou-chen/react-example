import React, { useImperativeHandle, useState, useEffect } from 'react'
import { Form, Input, Popover, Button } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

import useStep1Rules from './useStep1Rules'

export interface StepRef {
  validate: () => Promise<any>;
}

const layout = {
  autoComplete: "off",
  labelCol: {
    // span: 3,
    style: { width: 100 } // 表单 label 设置为固定宽度
  },
  wrapperCol: {
    span: 21,
  }
};

const Step1 = React.forwardRef<StepRef>((props, ref) => {
  const [form] = Form.useForm();

  const {rules, fieldValidating, setFormValidating} = useStep1Rules()

  function validate() {
    return new Promise((resolve, reject) => {
      setFormValidating(true)

      form.validateFields()
        .then(() => resolve(true))
        .catch(() => resolve(false))
        .finally(() => setFormValidating(false))
    })
  }

  useEffect(() => {
    const domains = [
      { 'domain': '' }
    ]
    form.setFieldValue('domains', domains)
  }, [])

  useImperativeHandle(ref, () => ({
    validate
  }))

  function getContent() {
    return (
      <ul style={{ paddingInlineStart: '20px'}}>
        <li>失去焦点后，开始校验</li>
        <li>输入 test，会在2秒后提示别名已被使用</li>
      </ul>
    )
  }

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Form form={form} {...layout}>
        <Popover title="自定义校验" content="输入 gmail 邮箱，会提示不支持" placement="right" trigger="focus" color="#000" overlayClassName="ux-dark">
          <Form.Item label="邮箱" name="email" rules={rules.email} validateTrigger='onBlur'>
            <Input />
          </Form.Item>
        </Popover>

        <Popover title="异步校验" content={getContent()} placement="right" trigger="focus" color="#000" overlayClassName="ux-dark">
          <Form.Item label="别名" name="alias" rules={rules.alias} validateTrigger='onBlur'
            hasFeedback
            validateStatus={fieldValidating} 
          >
            <Input />
          </Form.Item>
        </Popover>

        <FormList name="domains" getItems={(index: any, name: any, restField: any) => (
          <Form.Item 
            label={'域名' + (index + 1)} 
            name={[name, 'domain']} 
            rules={rules.domain}
            {...restField} 
          >
            <Input />
          </Form.Item>
        )}></FormList>
      </Form>
    </div>
  )
})

export default Step1

/**
 * 封装 Form.List
 */
interface FormListProps {
  name: string;
  getItems(index: any, name: any, restField: any): any;
}

function FormList(props: FormListProps) {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <div key={key} style={{ display: 'flex' }}>
              <div style={{ flex: '1' }}>
                { props.getItems(index, name, restField) }
              </div>

              <div>
                <Button onClick={() => add()} style={{ margin: '0px 8px' }}><PlusOutlined /></Button>
                <Button onClick={() => remove(name)}><MinusOutlined /></Button>
              </div>
            </div>
          ))}
        </>
      )}
    </Form.List>
  )
}
