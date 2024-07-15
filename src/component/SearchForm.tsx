import React, { useState } from 'react';
import { Col, Row, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons'

import styles from './SearchForm.module.less'

export interface SearchFormProps {
  form?: any;
  submit: () => void;
  reset: () => void;
  setItemClass?: (itemClass: any) => void;
  children?: any;
}

function SearchForm(props: SearchFormProps) {
  const [expand, setExpand] = useState(false)

  function toggle() {
    setExpand(!expand)

    if (props.setItemClass) {
      props.setItemClass(expand ? 'hide': '')
    }
  }

  return (
    <div className={styles['search-form']}>
      <Row gutter={16} style={{ flexFlow: 'row wrap' }}>
        { props.children }

        <Col span={6} style={{ marginLeft: 'auto' }}>
          <div style={{ float: 'right' }}>
            <Button style={{ marginRight: '8px' }} onClick={props.reset}>重置</Button>
            <Button type="primary" onClick={props.submit}>搜索</Button>
    
            <Button type="link" size='small' onClick={toggle}>展开</Button>
            { expand ? <UpOutlined /> : <DownOutlined /> }
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SearchForm