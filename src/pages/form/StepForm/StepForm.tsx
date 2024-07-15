import { useState, useRef } from 'react';
import { Steps, Button, Checkbox, notification } from 'antd';

import StepItem, { StepRef } from './steps/StepItem';

import styles from './StepForm.module.less'

const isDemo = import.meta.env.VITE_DEMO === 'true';

function StepForm() {
  const stepRef = useRef<StepRef>(null)
  const [active, setActive] = useState(0)
  const [doCheck, setDoCheck] = useState(true)

  const steps = ['StepItem1', 'StepItem2']
  const items = [
    {
      title: '动态表单',
      description: '自定义校验、动态创建表单项',
    },
    {
      title: '各种选择框',
      description: '联想输入、级联选择，穿梭框',
    },
  ]

  // 能调用接口，才显示文件上传
  if (!isDemo) {
    steps.push('StepItem3')

    items.push({
      title: '文件上传',
      description: '校验文件类型、数量、大小',
    })
  }
  
  async function next() {
    if (!doCheck) {
      setActive(active + 1)
      return;
    }

    const valid = await stepRef.current?.validate()
    if (valid) {
      setActive(active + 1)
    } else {
      notification.open({
        type: 'info',
        message: '校验未通过！'
      })
    }
  }

  function prev() {
    setActive(active - 1)
  }

  function submit() {
    notification.open({
      type: 'success',
      message: '操作成功！'
    })
  }

  return (
    <div className={styles['step-form']}>
      <Steps current={active} items={items} />
      <div style={{ marginTop: '20px' }}>
        <StepItem ref={stepRef} name={steps[active]}></StepItem>
      </div>
      <div style={{ textAlign: 'center' }}>
        {
          (active > 0)
          ? <Button onClick={prev} style={{ marginRight: '20px' }}>上一步</Button>
          : null
        }

        { 
          (active < steps.length - 1)
          ? <Button type='primary' onClick={next}>下一步</Button>
          : null
        }

        { 
          (active === steps.length - 1)
          ? <Button type='primary' onClick={submit}>提交</Button>
          : null
        }

        <Checkbox checked={doCheck} onChange={(e) => setDoCheck(e.target.checked)} style={{ marginLeft: '20px' }}>
          { (doCheck ? '开启' : '关闭') + '校验' }
        </Checkbox>
      </div>
    </div>
  )
}

export default StepForm

