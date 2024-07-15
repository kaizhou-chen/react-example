import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd';

import menu from '@/router/menu';

import { findPath } from '@/utils/treeUtils'

function LayoutBreadcrumb() {
  const { pathname } = useLocation()

  const [ breadList, setBreadList ] = useState([])

  useEffect(() => {
    const path = findPath([...menu], (x: any) => x.path === pathname, 'label')
    const list = path.map((x: any) => ({ title: x }))
    setBreadList(list)
  }, [pathname])

  return (
    <Breadcrumb items={breadList} />
  )
}

export default LayoutBreadcrumb