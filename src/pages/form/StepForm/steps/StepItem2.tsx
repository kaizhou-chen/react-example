import React, { useImperativeHandle, useState, useRef } from 'react'
import { Form, Select, Spin, Transfer, Cascader, Popover } from "antd";
import type { TransferProps } from 'antd';
import type { Rule } from 'antd/lib/form'
import { debounce } from 'lodash-es';

import { StepRef } from './StepItem1'

const Step2 = React.forwardRef<StepRef>((props, ref) => {
  const [form] = Form.useForm();

  const selectRef = useRef(null)
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>([]);

  const remoteMethod = debounce((query: any) => {
    if (query && query !== '') {
      setFetching(true)

      setTimeout(() => {
        setFetching(false)
        const result = list1.filter(x => x.value.toLowerCase().indexOf(query) > -1)
        setOptions(result)

        // 如果只有一个选项，则默认选中
        if(result.length == 1) {
          form.setFieldValue('handler', result[0].value)

          const el: any = selectRef.current;
          el.blur()
        }
      });
    } else {
      setOptions([])
    }
  }, 1000)

  const onChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  function validate() {
    return new Promise((resolve, reject) => {
      form.validateFields()
        .then(() => resolve(true))
        .catch(() => resolve(false))
    })
  }

  useImperativeHandle(ref, () => ({
    validate
  }))

  function getContent() {
    return (
      <ul style={{ paddingInlineStart: '20px'}}>
        <li>输入工号，比如：abc123456</li>
        <li>如果能精确匹配，即只有一个选项，则默认选中</li>
      </ul>
    )
  }

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Form form={form} {...layout}>
        <Popover title="人员联想" content={getContent()} placement="right" trigger="focus" color="#000" overlayClassName="ux-dark">
          <Form.Item label="联系人" name="handler" rules={rules.handler}>
            <Select ref={selectRef} style={{ width: '100%' }}
              placeholder="请选择联系人"
              options={options}

              showSearch
              onSearch={remoteMethod}
              notFoundContent={fetching ? <Spin size="small" /> : null}
            />
          </Form.Item>
        </Popover>

        <Form.Item label="城市" name="city" rules={rules.city}>
          <Cascader options={list2} placeholder="请选择城市" />
        </Form.Item>

        <Form.Item label="穿梭框" name="state" rules={rules.state}>
          <Transfer
            dataSource={list3}
            titles={['Source', 'Target']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            render={(item) => item.label}
          />
        </Form.Item>
      </Form>
    </div>
  )
})

export default Step2

/**
 * 常量、工具方法
 */
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

const rules: { [key: string]: Rule[] } = {
  handler: [
    { required: true, message: '请输入联系人' },
  ],
  city: [
    { required: true, message: '请输入城市' },
  ],
  state: [
    { required: true, message: '请选择数据' },
  ],
}

const list1 = [
  { label: 'abc123456 张三 （部门一）', value: 'abc123456' },
  { label: 'abc345678 李四 （部门二）', value: 'abc345678' },
]

const list2 = [
  {
    value: 'south',
    label: '华南',
    children: [
      {
        value: 'guangdong',
        label: '广东',
        children: [
          {
            value: 'shenzhen',
            label: '深圳',
          },
          {
            value: 'guangzhou',
            label: '广州',
          },
        ],
      },
    ],
  },
]

const citys = [
  'California',
  'Illinois',
  'Maryland',
  'Texas',
  'Florida',
  'Colorado',
  'Connecticut ',
]
const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT']
const list3 = citys.map((city, index) => {
  return {
    label: city,
    key: index,
    initial: initials[index],
  }
})