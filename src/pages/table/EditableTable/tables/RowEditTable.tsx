import { useState, useEffect, useRef } from 'react';
import { Table, Button, Alert } from 'antd';
import type { TableProps } from 'antd';

import CellEditor from '../editors/CellEditor';
import { data, options, DataType } from './tableData'

/**
 * 固定列宽
 * 1) <Table scroll={{ x: 1000 }} />
 * 2) column 上设置 width
 */
function RowEditTable() {
  const [list, setList] = useState<any[]>([])
  const [currentRow, setCurrentRow] = useState<any>(null)
  const tableRef = useRef(null)

  const onBeforeEdit = (rowIndex: any) => {
    const row: any = list[rowIndex]
    setCurrentRow(JSON.parse(JSON.stringify(row)))

    row.editing = rowIndex
    setList([...list])
  }

  const onAfterEdit = (rowIndex: any, field: any, value: any) => {
    const row: any = list[rowIndex]
    row[field] = value;
    
    setList([...list])
  }

  const onCancel = (rowIndex: any) => {
    list[rowIndex] = currentRow

    setList([...list])
  }

  const onSubmit = (rowIndex: any) => {
    const row = list[rowIndex]
    delete row.editing

    setList([...list])
  }

  const columns = getColumns(onBeforeEdit, onAfterEdit, onSubmit, onCancel)

  useEffect(() => {
    data.forEach((item: any, index: any) => {
      item.key = index;
    });

    setList(data)
  }, [])

  return (
    <div ref={tableRef}>
      <Table style={{ width: '100%' }}
        bordered
        columns={columns} 
        dataSource={list} 
        scroll={{ x: 1000 }}
        pagination={false}
      />

      <Alert style={{ marginTop: '20px' }}
        showIcon
        type="warning"
        message={<p>点击编辑按钮，编辑数据</p>}
      />
    </div>
  )
}

export default RowEditTable

/**
 * 工具方法
 */
function getColumns(onBeforeEdit: any, onAfterEdit: any, onSubmit: any, onCancel: any) {
  const columnConfig = [
    { title: '日期', field: 'date', type: 'date' },
    { title: '名称', field: 'name', type: 'text' },
    { title: '年龄', field: 'age', type: 'number' },
    { title: '地区', field: 'area', type: 'select' },
    { title: '地址', field: 'address' },
  ]

  const columns: TableProps<DataType>['columns'] = columnConfig.map(x => {
    const { title, field, type } = x

    // 只读的单元格
    if (!type) {
      return {
        title: title,
        dataIndex: field,
        key: field,
        render: (value, row, rowIndex) => {
          return <div>{ value }</div>
        }
      }
    }

    // 可编辑单元格
    return {
      title: title,
      dataIndex: field,
      key: field,
      width: 200,
      render: (value, row, rowIndex) => {
        return (
          (row.editing === rowIndex)
          ? <CellEditor type={type} value={value} options={options} onChange={(newValue) => onAfterEdit(rowIndex, field, newValue)} />
          : <div style={{ height: '32px', lineHeight: '32px' }}>
              { (type !== 'select') ? value : options.find(x => x.value === value)?.label }
            </div>
        )
      }
    }
  })

  // 操作列
  columns.push({
    title: '操作',
    dataIndex: 'editing',
    key: 'editing',
    width: 200,
    render: (value, row, rowIndex) => {
      return (
        (value == undefined)
        ? <Button type='primary' onClick={() => { onBeforeEdit(rowIndex) }}>编辑</Button>
        : (
            <div>
              <Button onClick={() => { onCancel(rowIndex) }} style={{ marginRight: '12px' }}>取消</Button>
              <Button type='primary' onClick={() => { onSubmit(rowIndex) }}>确定</Button>
            </div>
          )
      )
    }
  })

  return columns
}

