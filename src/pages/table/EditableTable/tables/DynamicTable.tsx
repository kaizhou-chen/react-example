import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Form, Input, Table, Alert, Tour, Divider } from 'antd';
import type { TourProps } from 'antd'
import { DragOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import ReactDragListView from 'react-drag-listview';
import { useDynamicList } from 'ahooks';

function DynamicTable() {
  const [form] = Form.useForm();
  const [result, setResult] = useState('');
  const { list, resetList, getKey, push, remove, move, sortList } = useDynamicList<Item>();

  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const columns = useMemo(() => {
    return getColumns(getKey, remove, ref2, ref3)
  }, [getKey, remove]) 

  useEffect(() => {
    resetList(data)
  }, [])

  const getRowKey: any = (r: Item, index: number) => {
    return getKey(index).toString()
  }

  const onDragEnd = (oldIndex: number, newIndex: number) => {
    move(oldIndex, newIndex)
  }

  const addRow = () => {
    push({ name: '' })
  }

  const steps = useMemo(() => {
    return getSteps(ref1, ref2, ref3)
  }, [ref1, ref2, ref3])

  const submit = () => {
    form.validateFields()
      .then((val) => {
        const sortedResult = sortList(val.params);
        setResult(JSON.stringify(sortedResult, null, 2));
        console.log('result', sortedResult);
      })
  }

  return (
    <div>
      <Form form={form}>
        <ReactDragListView
          onDragEnd={onDragEnd}
          handleSelector={'span[aria-label="drag"]'}
        >
          <Table style={{ overflow: 'auto' }}
            columns={columns}
            dataSource={list}
            rowKey={getRowKey}
            pagination={false}
          />
        </ReactDragListView>
      </Form>

      <Button ref={ref1} type="dashed" block onClick={addRow} style={{ marginTop: 8 }}>
        <PlusOutlined />
        <span>添加</span>
      </Button>

      <Alert style={{ marginTop: '20px' }}
        showIcon
        type="warning"
        message={(
          <div>
            <Button type="link" onClick={() => { setOpen(true) }}>功能介绍</Button>
            <Divider type="vertical" />
            <Button type="link" onClick={() => { submit() }}>查看数据</Button>
          </div>
        )}
      />

      <div style={{ whiteSpace: 'pre', tabSize: 2, fontSize: '17px', fontFamily: "Consolas, 'Courier New', monospace" }}>
        {result && `content: ${result}`}
      </div>

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
}

export default DynamicTable

interface Item {
  id?: number;
  date?: string;
  name?: string;
  age?: number;
  address?: string;
}

function getColumns(getKey: any, remove: any, ref2: any, ref3: any) {
  const columns = [
    {
      title: '',
      key: 'drag',
      width: 40,
      render: (text: string, row: Item, index: number) => (
        <DragOutlined ref={ref2} style={{ cursor: 'move' }} />
      ),
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 200,
      render: (text: string, row: Item, index: number) => (
        <Form.Item name={['params', getKey(index), 'date']} initialValue={text} noStyle>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: string, row: Item, index: number) => (
        <Form.Item name={['params', getKey(index), 'name']} initialValue={text} noStyle>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 200,
      render: (text: string, row: Item, index: number) => (
        <Form.Item name={['params', getKey(index), 'age']} initialValue={text} noStyle>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      render: (text: string, row: Item, index: number) => (
        <Form.Item name={['params', getKey(index), 'address']} initialValue={text} noStyle>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (text: string, row: Item, index: number) => (
        <Button ref={ref3} type="text" onClick={() => remove(index)}>
          <DeleteOutlined />
          <span>删除</span>
        </Button>
      ),
    },
  ];

  return columns;
}

const data: Item[] = [
  {
    id: 1,
    date: '2023-05-02',
    name: '王小虎',
    age: 30,
    address: '上海市普陀区金沙江路 1516 弄'
  }, {
    id: 2,
    date: '2023-05-03',
    name: '王小虎',
    age: 31,
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    id: 3,
    date: '2023-05-04',
    name: '王小虎',
    age: 32,
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: 4,
    date: '2023-05-05',
    name: '王小虎',
    age: 33,
    address: '上海市普陀区金沙江路 1519 弄'
  }
]

function getSteps(ref1: any, ref2: any, ref3: any) {
  const steps: TourProps['steps'] = [
    {
      title: '新增按钮',
      description: '点击新增按钮，增加一条数据',
      target: () => ref1.current,
    },
    {
      title: '拖动排序',
      description: '拖动排序图标，进行排序',
      target: () => ref2.current,
    },
    {
      title: '删除按钮',
      description: '点击删除按钮，删除这条数据',
      target: () => ref3.current,
    },
  ];

  return steps
}
