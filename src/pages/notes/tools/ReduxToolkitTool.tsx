import { useState, useEffect, useCallback } from 'react';
import { Input, Form, notification } from 'antd';
import JSON5 from 'json5'

import styles from './ReduxToolkitTool.module.less'

const { TextArea } = Input

function generator(name: any, initState: any) {
  const keys = Object.keys(initState)

  const toCamel = (x: any) => x.charAt(0).toUpperCase() + x.substring(1);

  const reducers = keys.map(x => {
    return `
    set${toCamel(x)}: (state, action) => {
      state.${x} = action.payload;
    },`
  })

  const actions = keys.map(x => {
    return 'set' + toCamel(x)
  })

  const getters = keys.map(x => {
    return `export const get${toCamel(x)} = (state: RootState) => state.${name}.${x};`
  })

  const result = `export const ${name}Slice = createSlice({
  name: '${name}',
  initialState,
  reducers: {${reducers.join('')}
  },
});
  
// 可以简单的理解为 setters
export const { ${actions.join(', ')} } = ${name}Slice.actions;

// 可以简单的理解为 getters
${getters.join('\n')}

export default ${name}Slice.reducer`

  return result
}

const tip = `输入initState，生成 createSlice 代码。例如

{
  "name": "test"
}`

function ReduxTool() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({})

  const updateResult = useCallback(() => {
    const { name, initState: state } = form.getFieldsValue()
    let initState = null;
    try {
      initState = JSON5.parse(state);
    } catch(e) { /** */ }
  
    if (!initState) {
      return;
    }

    if (!name) {
      notification.open({
        message: '提示',
        description: '请输入 slice 名称',
      });
      return;
    }
  
    const result = generator(name, initState)
    if (result) {
      form.setFieldValue('result', result)
    }
  }, [form])

  useEffect(() => {
    updateResult()
  }, [formData, updateResult])

  function onValuesChange(values: any) {
    setFormData(values)
  }

  return (
    <Form form={form} onValuesChange={onValuesChange}>
      <div className={styles['redux-tool']} style={{display: 'flex'}}>
        <div style={{flex: 1, marginRight: '50px'}}>
          <Form.Item name="name" style={{ marginBottom: '20px' }}>
            <Input placeholder="请输入 slice 名称" addonBefore="slice 名称" />
          </Form.Item>

          <Form.Item name="initState">
            <TextArea placeholder={tip} className='ux-state' />
          </Form.Item>
        </div>

        <div style={{flex: 1}}>
          <Form.Item name="result">
            <TextArea />
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}

export default ReduxTool