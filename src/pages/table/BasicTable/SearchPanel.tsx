import { useState } from 'react';
import { Col, Form, Input, DatePicker, Select, Cascader, Checkbox } from 'antd';
import SearchForm, { SearchFormProps } from '@/component/SearchForm'

const { RangePicker } = DatePicker

function SearchPanel(props: SearchFormProps) {
  const [itemClass, setItemClass] = useState('hide') // 展开、折叠的样式，由封装后的 SearchForm 进行修改

  return (
    <SearchForm submit={props.submit} reset={props.reset} setItemClass={setItemClass}>
      { /** 将搜素表单，封装成组件。这里只需要提供，用于搜索的项 */ }
      <Col span={6}>
        <Form.Item label="活动名称" name="name">
          <Input />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="活动日期" name="dateRange">
          <RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="活动区域" name="region">
          <Cascader
            multiple
            options={[
              { label: '区域一', value: 'shanghai' },
              { label: '区域二', value: 'beijing' },
            ]}
            dropdownRender={(menus: React.ReactNode) => (
              <div>
                <div>
                  <Checkbox style={{paddingLeft: '16px'}} onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      props.form.setFieldValue('region', [['shanghai'], ['beijing']])
                    } else {
                      props.form.setFieldValue('region', [])
                    }
                  }}>全选</Checkbox>
                </div>
                {menus}
              </div>
            )}
          />
        </Form.Item>
      </Col>

      <Col span={6} className={itemClass} style={{ marginBottom: '20px' }}>
        <Form.Item label="即时配送" name="jit">
          <Cascader
            multiple
            options={[
              { label: '是', value: 1 },
              { label: '否', value: 0 },
            ]}
            dropdownRender={(menus: React.ReactNode) => (
              <div>
                <div>
                  <Checkbox style={{paddingLeft: '16px'}} onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      props.form.setFieldValue('jit', [[0], [1]])
                    } else {
                      props.form.setFieldValue('jit', [])
                    }
                  }}>全选</Checkbox>
                </div>
                {menus}
              </div>
            )}
          />
        </Form.Item>
      </Col>
    </SearchForm>
  )
}

export default SearchPanel