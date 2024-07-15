import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import CellEditTable from './tables/CellEditTable';
import RowEditTable from './tables/RowEditTable';
import DynamicTable from './tables/DynamicTable';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '可编辑单元格',
    children: <CellEditTable />,
  },
  {
    key: '2',
    label: '可编辑行',
    children: <RowEditTable />,
  },
  {
    key: '3',
    label: '动态表格 + 拖拽排序',
    children: <DynamicTable />,
  },
];

function Tools() {
  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}

export default Tools