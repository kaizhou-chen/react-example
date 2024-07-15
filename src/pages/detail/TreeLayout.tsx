import { useState, useEffect, useMemo } from 'react';
import { Tree, Card, Tabs, Input } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import DynamicComponent from '@/component/DynamicComponent'

import { data } from './treeData'

import styles from './TreeLayout.module.less'

const { Search } = Input

function TreeLayout() {
  const [items, setItems] = useState<any[]>([])
  const [activeKey, setActiveKey] = useState<any>()
  const [searchValue, setSearchValue] = useState('')

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    const { node } = info
    if (node.children) {
      return
    }

    const tab = items.find((x: any) => x.key === node.key)
    if (!tab) {
      items.push({
        label: node.title,
        key: node.key,
        children: ''
      })
      setItems([...items]) // 这里一定要用复制的新数组
    }

    if (activeKey !== node.key) {
      setActiveKey(node.key)
    }
  };

  const remove = (targetKey: any) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey: any, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const onSearch = (e: any) => {
    setSearchValue(e.target.value)
  }

  const treeData = useMemo(() => {
    return filter(data, searchValue)
  }, [searchValue])

  return (
    <div className={styles['tree-layout']} style={{ display: 'flex' }}>
      <Card style={{ width: '280px', minHeight: '100%' }}>
        <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={onSearch} />
        <Tree
          onSelect={onSelect}
          treeData={treeData}
          defaultExpandAll={true}
        />
      </Card>

      <div style={{ flex: '1', marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
        <Tabs hideAdd type="editable-card" activeKey={activeKey} items={items} onEdit={onEdit} onChange={onChange} />
        <Card style={{ flex: 1 }}>
          <DynamicComponent name={activeKey}></DynamicComponent>
        </Card>
      </div>
    </div>
  )
}

export default TreeLayout

/**
 * 根据关键字，过滤树节点
 */
function filter(array: any[], text: string) {
  const getNodes = (result: any[], node: any) => {
    if (node.title.indexOf(text) > -1) {
      result.push(node);
      return result;
    }

    if (node.children) {
      const children = node.children.reduce(getNodes, []);
      if (children.length) result.push({...node, children});
    }

    return result;
  };

  return array.reduce(getNodes, []);
}