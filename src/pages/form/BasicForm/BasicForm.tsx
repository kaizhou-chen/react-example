import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Space, Form, Input, Select, DatePicker, Switch, Checkbox, Radio, notification } from "antd";

import dayjs from 'dayjs';

import { getMarketingUpdate } from '@/store/reducer/marketingSlice';
import { createMarketing, updateMarketing } from '@/api/apiFactory'
import { sendRequest } from "@/utils/httpUtil";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface BasicFromProps {
  isDialog?: boolean;
  isUpdate?: boolean;
  close?: any;
}

function BasicFrom(props: BasicFromProps) {
  const [form] = Form.useForm();

  const location = useLocation()
  const navigate = useNavigate()
  const marketingUpdate = useSelector(getMarketingUpdate);

  const [isUpdate, setIsUpdate] = useState(false)

  const formData: any = {
    name: "",
    jit: false,
  };

  useEffect(() => {
    initPage()
  })

  function initPage() {
    let editMode: any = location.pathname === '/form/update'
    if (props.isDialog) {
      editMode = props.isUpdate
    }

    setIsUpdate(editMode)
    initForm(editMode)
  }

  function initForm(editMode: boolean) {
    if (!editMode) {
      form.resetFields();
      return;
    }

    let data = { ...formData}
    if (editMode && marketingUpdate) {
      toFormData(data, marketingUpdate)
    }
    form.setFieldsValue(data) // 设置表单数据
  }

  function onReset() {
    goBack()
  }

  async function onSubmit(values: any) {
    form.validateFields()
      .then(() => {
        // 校验通过
        const data = toApiData(values)
        if (isUpdate) {
          data.id = marketingUpdate.id // id 没有放进 form，这里要重新赋值
          doUpdate(data)
        } else {
          doCreate(data)
        }
      })
  }

  async function doCreate(data: any) {
    const req = () => createMarketing(data)
    const resp = await sendRequest(req);
    backToList(resp)
  }

  async function doUpdate(data: any) {
    const req = () => updateMarketing(data)
    const resp = await sendRequest(req);
    backToList(resp)
  }

  function backToList(resp: any) {
    if (resp.data.success) {
      notification.open({
        message: '操作成功',
      })
      
      goBack()
    }
  }

  function goBack() {
    form.resetFields(); // 重置表单

    if (props.isDialog) { // 关闭弹出框
      props.close()
    } else { 
      navigate('/table/basic')
    }
  }

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Form form={form} onFinish={onSubmit} {...layout}>
        { /** blur 时触发校验，validateTrigger='onBlur' */ }
        <Form.Item label="活动名称" name="name" rules={rules.name} validateTrigger='onBlur'>
          <Input />
        </Form.Item>

        <Form.Item label="活动区域" name="region" rules={rules.region}>
          <Select
            options={[
              { label: '区域一', value: 'shanghai' },
              { label: '区域二', value: 'beijing' },
            ]}
          />
        </Form.Item>

        <Form.Item label="活动日期" name="dateRange" rules={rules.region}>
          <RangePicker format={dateFormat} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="即时配送" name="jit">
          <Switch />
        </Form.Item>

        <Form.Item label="活动性质" name="type" rules={rules.type}>
          <Checkbox.Group options={typeOptions} />
        </Form.Item>

        <Form.Item label="特殊资源" name="resource" rules={rules.resource}>
          <Radio.Group options={resourceOptions} />
        </Form.Item>

        <Form.Item label="活动形式" name="desc">
          <TextArea rows={5} />
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Space size="middle">
            <Button htmlType="button" onClick={onReset}>取消</Button>
            <Button type="primary" htmlType="submit">提交</Button>
          </Space>
        </div>
      </Form>
    </div>
  )
}

export default BasicFrom

/**
 * 工具方法
 */
const layout = {
  autoComplete: "off",
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  }
};

const dateFormat = 'YYYY-MM-DD';

const rules = {
  name: [
    { required: true, message: '请输入活动名称' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符' }
  ],
  region: [
    { required: true, message: '请选择活动区域' }
  ],
  dateRange: [
    { required: true, message: '请选择活动日期' }
  ],
  type: [
    { required: true, message: '请选择活动性质' }
  ],
  resource: [
    { required: true, message: '请选择活动资源' }
  ]
}

const typeOptions = [
  { label: '美食/餐厅线上活动', value: 1 },
  { label: '地推活动', value: 2 },
  { label: '线下主题活动', value: 3 },
  { label: '单纯品牌曝光', value: 4 },
];

const resourceOptions = [
  { label: '线上品牌商赞助', value: 1 },
  { label: '线下场地免费', value: 2 },
]

function toFormData(formData: any, initData: any) {
  Object.assign(formData, initData)

  const { beginDate, endDate } = initData;
  formData.dateRange = toDateRange(beginDate, endDate)

  if(formData?.type != null) {
    formData.type = formData?.type.split(',').map(Number)
  } else {
    formData.type = [];
  }

  if(formData?.jit != null) {
    formData.jit = Number(formData?.jit);
  } else {
    formData.jit = 0;
  }
}

function toApiData(values: any) {
  const dateStr = toDateString(values.dateRange)

  const data = { 
    ...values,
    ...dateStr
  }
  delete data.dateRange
  if (data.type) {
    data.type = data.type.join(',')
  }
  data.jit = (data.jit ? 1 : 0)

  return data;
}

function toDateRange(beginDate: any, endDate: any) {
  return [
    dayjs(beginDate, dateFormat),
    dayjs(endDate, dateFormat)
  ]
}

function toDateString(dateRange: any) {
  const [ beginDate, endDate ] = dateRange.map((x: any) => dayjs(x).format(dateFormat))
  return { beginDate, endDate }
}