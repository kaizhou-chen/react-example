import { useState, useEffect } from 'react';
import { Button, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getMarketingView } from '@/store/reducer/marketingSlice';

interface BasicDetailProps {
  data?: object
}

export default function BasicDetail(props: BasicDetailProps) {
  const [items, setItems] = useState<any>()
  const marketingView = useSelector(getMarketingView)
  const navigate = useNavigate()

  const [isPage, setIsPage] = useState(true)

  const getItems = (data: any) => {
    const items: DescriptionsProps['items'] = [
      {
        key: '1',
        label: '活动名称',
        children: <div>{data?.name}</div>
      },
      {
        key: '2',
        label: '活动区域',
        children: <div>{regionRender(data?.region)}</div>
      },
      {
        key: '3',
        label: '活动时间',
        children: <div>{(data?.beginDate ?? '') + '至' +  (data?.endDate ?? '')}</div>
      },
      {
        key: '4',
        label: '即时配送',
        children: <div>{jitRender(data?.jit)}</div>
      },
      {
        key: '5',
        label: '活动形式',
        children: <div>{data?.desc}</div>
      },
    ]

    return items
  }

  function regionRender(value: any) {
    const nameMap: any = {
      "shanghai": "区域一",
      "beijing": "区域二"
    }

    return nameMap[value];
  }

  function jitRender(value: any) {
    const nameMap: any = {
      "0": "否",
      "1": "是"
    }

    return nameMap[value];
  }

  function resourceRender(value: any) {
    const nameMap: any = {
      "1": "线上品牌商赞助",
      "2": "线下场地免费"
    }

    return nameMap[value];
  }

  useEffect(() => {
    let viewData = props.data
    if (!viewData) {
      setIsPage(true)
      viewData = marketingView
    } else {
      setIsPage(false)
    }

    const data = getItems(viewData)
    setItems(data)
  }, [])

  function gotoList() {
    navigate('/table/basic')
  }

  function getButton() {
    if (isPage) {
      return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='primary' onClick={gotoList}>返回</Button>
        </div>
      )
    }
  }

  return (
    <div>
      <Descriptions title="活动详情" bordered items={items} />
      { getButton() }
    </div>
  )
}