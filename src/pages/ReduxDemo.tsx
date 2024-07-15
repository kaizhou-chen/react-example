import { Card, Progress, Button, Alert } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

import { useSelector, useDispatch } from 'react-redux';
import { getCount, setCount } from '../store/reducer/appSlice';

function ReduxDemo() {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  
  function increment() {
    if (count > 90) return 
    dispatch(setCount(count + 10))
  }

  function decrement() {
    if (count < 10) return
    dispatch(setCount(count - 10))
  }

  return (
    <Card>
      <div  style={{ textAlign: 'center' }}>
        <div>
          <Button type="primary" icon={<PlusOutlined />} onClick={increment}>增加</Button>
          <Button type="primary" icon={<MinusOutlined />} onClick={decrement} style={{ marginLeft: '20px' }}>减少</Button>
        </div>

        <Progress type="circle" percent={count} style={{ padding: '20px 0px' }} />
      </div>

      <Alert
        message="Redux demo"
        description="打开浏览器控制台，在 Redux 标签页下，查看数据是否发生了变化"
        type="success"
      />
    </Card>
  )
}

export default ReduxDemo