import { useState, useEffect, useCallback } from 'react';
import { Table, Alert } from 'antd';
import type { TableProps } from 'antd';

import CellEditor from '../editors/CellEditor';
import { data, options, DataType } from './tableData'

/**
 * 固定列宽
 * 1) <Table scroll={{ x: 1000 }} />
 * 2) column 上设置 width
 */
function CellEditTable() {
  const [list, setList] = useState([])

  const onBeforeEdit = (rowIndex: any, field: any) => {
    const row: any = list[rowIndex]
    row.editing = field

    setList([...list])
  }

  const onAfterEdit = (rowIndex: any, field: any, value: any) => {
    const row: any = list[rowIndex]
    row[field] = value;
    delete row.editing
    
    setList([...list])
  }

  const columns = getColumns(onBeforeEdit, onAfterEdit)

  useEffect(() => {
    data.forEach((item: any, index: any) => {
      item.key = index;
    });

    setList(data)
  }, [])

  return (
    <div>
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
        message={<p>点击单元格，编辑数据</p>}
      />
    </div>
  )
}

export default CellEditTable

/**
 * 工具方法
 */
function getColumns(onBeforeEdit: any, onAfterEdit: any) {
  const list = [
    { title: '日期', field: 'date', type: 'date' },
    { title: '名称', field: 'name', type: 'text' },
    { title: '年龄', field: 'age', type: 'number' },
    { title: '地区', field: 'area', type: 'select' },
    { title: '地址', field: 'address' },
  ]

  const columns: TableProps<DataType>['columns'] = list.map(x => {
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
          (row.editing === field)
          ? <CellEditor type={type} value={value} options={options} focus={true} onChange={(newValue) => onAfterEdit(rowIndex, field, newValue)} />
          : <div style={{ height: '32px', lineHeight: '32px' }}>
              { (type !== 'select') ? value : options.find(x => x.value === value)?.label }
            </div>
        )
      },
      onCell: (record, rowIndex: any) => {
        return {
          onClick: (event) => {
            onBeforeEdit(rowIndex, field)
          },
        };
      }
    }
  })

  return columns
}

