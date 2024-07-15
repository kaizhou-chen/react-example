import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import ReduxToolkitTool from './ReduxToolkitTool';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Redux Toolkit 工具',
    children: <ReduxToolkitTool />,
  },
];

function Tools() {
  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}

export default Tools