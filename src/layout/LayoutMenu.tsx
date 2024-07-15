import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd';

import * as icons from '@ant-design/icons'

import menu from '@/router/menu'
import { traverse, searchTreeList } from '@/utils/treeUtils';

// 动态组件
const Icon = (props: { icon: string }) => {
  const { icon } = props;
  const antIcon: { [key: string]: any } = icons;
  return React.createElement(antIcon[icon]);
};

// 转换成 Menu 组件的数据格式
function getItems() {
  const items: any = [...menu]
  items.forEach((current: any) => {
    traverse(current, (x: any) => {
      x.key = x.path  // 给菜单项添加 key，值是 path
      if (x.icon) {   // 根据图标名称，创建图标组件
        x.icon = <Icon icon={x.icon}/>
      }
    })
  });

  return items
}

function LayoutMenu() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [items, setItems] = useState([])
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])

  useEffect(() => {
    const list = getItems()
    setItems(list)
  }, [])

  useEffect(() => {
    const node = searchTreeList(items, pathname, 'path')
    if (node) {
      setSelectedKeys([node.path])
    }
  }, [pathname, items])

  function onClick(e: any) {
    if (!e.children) {
      navigate(e.key) // 导航
    }
  }

  return (
    <Menu defaultSelectedKeys={['1']} selectedKeys={selectedKeys} mode="inline" items={items} onClick={onClick} />
  )
}

export default LayoutMenu;