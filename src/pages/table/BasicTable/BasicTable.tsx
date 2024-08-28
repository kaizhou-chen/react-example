import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Modal, Segmented, Card, Table, Form, notification } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import { sendRequest } from "@/utils/httpUtil";
import { listMarketing, removeMarketing } from '@/api/apiFactory'
import { setMarketingUpdate, setMarketingView } from '@/store/reducer/marketingSlice';

import BasicFrom from '@/pages/form/BasicForm/BasicForm';
import useSimpleTable, { SimpleTableProps } from '@/hooks/useSimpleTable';
import SearchPanel from './SearchPanel';

import dayjs from 'dayjs';

import styles from './BasicTable.module.less'

export default function BasicTable() {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [open, setOpen] = useState(false)
  const [editType, setEditType] = useState(1)
  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const simpleTableProps: SimpleTableProps = {
    httpRequest: listMarketing, 
    getSearchParams
  }
  const { list, loading, tableProps, submit, reset } = useSimpleTable(simpleTableProps, form)

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRows(selectedRows)
    },
    getCheckboxProps: (record: any) => ({
      name: record.id,
    }),
  };

  const options = {
    // 支持多选
    rowSelection: {
      ...rowSelection,
    },
    // 固定列，需要设置表格的宽度
    scroll: { 
      x: 1000 
    }
  }

  // 操作列
  const actionRender = (_: any, row: any) => {
    return (
      <div style={{ display: 'flex' }}>
        <Button type="link" size='small' onClick={() => gotoDetail(row)}>查看</Button>
        <Button type="link" size='small' onClick={() => gotoUpdate(row)}>编辑</Button>
      </div>
    )
  }

  // columns
  const columns = getColumns(actionRender)

  function gotoCreate() {
    if (editType === 1) {
      navigate('/form/create')
    } else {
      setIsUpdate(false)
      setOpen(true)
    }
  }

  function gotoUpdate(row: any) {
    dispatch(setMarketingUpdate(row))

    if (editType === 1) {
      navigate('/form/update')
    } else {
      setIsUpdate(true)
      setOpen(true)
    }
  }

  function gotoDetail(row: any) {
    dispatch(setMarketingView(row))
    navigate('/detail/basic') 
  }

  function close() {
    setOpen(false)
    submit()
  }

  async function doRemove() {
    if (selectedRows.length === 0) {
      notification.open({
        message: '请选择要删除的数据',
      })
      return;
    }
  
    const ids = selectedRows.map((x: any) => x.id)
    const req = () => removeMarketing(ids)
    await sendRequest(req);
    
    notification.open({
      message: '删除成功',
    })
    submit()
  }

  useEffect(() => {
    submit()
  }, [])

  return (
    <div className={styles['basic-table']}>
      <Card style={{ marginBottom: '20px' }}>
        <Form form={form} autoComplete="off">
          <SearchPanel submit={submit} reset={reset} form={form}></SearchPanel>
        </Form>

        <Modal open={open} title={isUpdate ? '编辑活动' : '创建活动'} footer={null} width={700} onCancel={() => setOpen(false)}>
          <BasicFrom isDialog={true} isUpdate={isUpdate} close={close}></BasicFrom>
        </Modal>
      </Card>

      <Card>
        <div style={{ marginBottom: '20px', display: 'flex' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={gotoCreate}>新建</Button>
          <Button type="primary" icon={<DeleteOutlined />} onClick={doRemove} style={{marginLeft: '12px'}}>删除</Button>
          <div style={{ marginLeft: 'auto' }}>
            <Segmented options={editTypeOptions} onChange={(value) => setEditType(value)}></Segmented>
          </div>
        </div>

        <Table style={{ width: '100%' }}
          bordered
          columns={columns} 
          dataSource={list} 
          loading={ loading }
          { ...tableProps }
          { ...options }
        />
      </Card>
    </div>
  )
}

/**
 * 工具方法
 */
interface DataType {
  id: any;
  name: string;
  region: string;
  beginDate: string;
  endDate: string;
  jit: number;
  resource: string;
  desc: string;
}

const getColumns = (actionRender: any) => {
  // const columns: TableProps<any>['columns'] = [
  const columns: TableColumnsType<any> = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '活动区域',
      dataIndex: 'region',
      key: 'region',
      filters: [
        { text: '区域一', value: 'shanghai' },
        { text: '区域二', value: 'beijing' },
      ],
      render: (_, { region }) => {
        const nameMap: any = {
          "shanghai": "区域一",
          "beijing": "区域二"
        }
    
        return (<div>{ nameMap[region] }</div>)
      }
    },
    {
      title: '开始时间',
      dataIndex: 'beginDate',
      key: 'beginDate',
      sorter: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: '即时配送',
      dataIndex: 'jit',
      key: 'jit',
      filters: [
        { text: '是', value: '1' },
        { text: '否', value: '0' },
      ],
      render: (_, { jit }) => {
        const nameMap: any = {
          "0": "否",
          "1": "是"
        }
    
        return (<div>{ nameMap[jit] }</div>)
      }
    },
    {
      title: '特殊资源',
      dataIndex: 'resource',
      key: 'resource',
      render: (_, { resource }) => {
        const nameMap: any = {
          "1": "线上品牌商赞助",
          "2": "线下场地免费"
        }
    
        return (<div>{ nameMap[resource] }</div>)
      }
    },
    {
      title: '活动形式',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: actionRender
    },
  ]

  return columns
}

const editTypeOptions = [
  { label: '跳转到编辑页面', value: 1 },
  { label: '打开编辑弹出框', value: 2 },
];

function toDateString(dateRange: any) {
  const [ beginDate, endDate ] = dateRange.map((x: any) => dayjs(x).format('YYYY-MM-DD'))
  return { beginDate, endDate }
}

function getSearchParams(tableParam: any, form: any) {
  const { pageSize, pageNumber, sorter, filters, defaultParams } = tableParam;

  const params = form.getFieldsValue()

  // 将日期转换成字符串
  if (params.dateRange) {
    const dateRange = toDateString(params.dateRange)
    Object.assign(params, dateRange)
    delete params.dateRange
  }

  // 级联选择的多选，数据是二维数组，在这里把数组扁平化
  if (params.jit) {
    params.jit = params.jit.flat()
  }
  if (params.region) {
    params.region = params.region.flat()
  }

  Object.assign(params, defaultParams)
  return params
}