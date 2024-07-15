import { useState, useRef } from 'react';
import type { TableProps } from 'antd';
import { useRequest } from 'ahooks';

interface TableParam {
  pageSize: number;
  pageNumber: number;
  sorter?: any;
  filters?: any;
  defaultParams?: any;
}

export interface SimpleTableProps {
  httpRequest: (param: any) => Promise<any>;
  getSearchParams?: (tableParam: TableParam, form: any) => object;
}

function useSimpleTable(props: SimpleTableProps, form?: any, ) {
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)

  const [sorter, setSorter] = useState<any>()
  const [filters, setFilters] = useState<any>()
  
  /**
   * 请求相关
   */
  const getTableData = async (reset?: boolean) => {
    const params = getRequestParams(reset)
    const resp = await props.httpRequest(params)
    const { list, pageInfo } = resp.data
    
    list.forEach((item: any, index: any) => { // 处理 key
      if (!item.key) {
        item.key = item.id || index
      }
    });
    
    setTotal(pageInfo.total) // 设置 total

    return list
  };

  const getTableParams = (reset: any) => {
    const params: any = {}

    // 分页参数
    params.pageSize = pageSize
    params.pageNumber = pageNumber
    if (reset) {
      params.pageNumber = 1
    }

    // 排序
    if (sorter && sorter.field && sorter.order) {
      const type = (sorter.order.indexOf('asc') === 0) ? 'asc' : 'desc'
      params.orderBy = sorter.field + ',' + type
    }

    // 筛选
    if (filters && Object.keys(filters).length > 0) {
      Object.assign(params, filters)
    }

    return params
  }

  const getRequestParams = (reset: any) => {
    const defaultParams = getTableParams(reset)

    // 表单搜索条件
    let params = {}
    if (props.getSearchParams) {
      const tableParam = { pageSize, pageNumber, sorter, filters, defaultParams };
      params = props.getSearchParams(tableParam, form)
    } else if (form) {
      params = form.getFieldsValue()
      Object.assign(params, defaultParams)
    } else {
      params = defaultParams
    }

    return params
  }

  const { data: list, loading, run } = useRequest(getTableData, {
    debounceWait: 300, // 防抖
    manual: true,
  });

  /**
   * 表格属性
   */
  const tableProps: TableProps = {
    // 分页、排序、过滤 发生变化
    onChange: (pagination, filters, sorter, extra) => {
      if (extra.action === 'sort') {
        setSorter(sorter)
      }
      if (extra.action === 'filter') {
        setFilters(filters)
      }
  
      run()
    },

    // 分页相关配置
    pagination: {
      total: total, // 一定要写，不然会出现只有单页数据的情况
      current: pageNumber,
      pageSize: pageSize,
      showSizeChanger: true,
      showQuickJumper: false,
      position: ['bottomLeft'],
      showTotal: () => `共${total}条`,
      onChange: (pageNumber: any, pageSize: any) => { 
        setPageNumber(pageNumber); 
        setPageSize(pageSize); 
      },
      onShowSizeChange: (pageNumber: any, pageSize: any) => { 
        setPageNumber(pageNumber); 
        setPageSize(pageSize); 
      },
    }
  }

  /**
   * 为搜索表单提供的方法
   */
  function submit() {
    run()
  }

  function reset() {
    form.resetFields();
    run(true)
  }
  
  /**
   * 返回值
   * list 表格数据
   * tableProps 表格属性
   */
  return { list, loading, tableProps, submit, reset }
}

export default useSimpleTable