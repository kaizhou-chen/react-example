import { useState } from 'react';
import type { Rule } from 'antd/lib/form'

type ValidateStatus = 'success' | 'warning' | 'error' | 'validating'

function useStep1Rules() {
  const [fieldValidating, setFieldValidating] = useState<ValidateStatus>()
  const [formValidating, setFormValidating] = useState(false)
  const [checked, setChecked] = useState<boolean | null>(null)

  const rules: { [key: string]: Rule[] } = {
    email: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
      { validator: checkEmail }
    ],
    alias: [
      { required: true, message: '请输入别名' },
      { validator: checkAlias }
    ],
    domain: [
      { required: true, message: '域名不能为空' }
    ]
  }
  
  function checkEmail(rule: any, value: any) {
    if (!value || value.trim() === '') {
      return Promise.resolve();
    }
  
    const domain = value.split('@')[1]
    const text = domain ? domain.substring(0, domain.lastIndexOf('.')) : ''
    if (text.toLowerCase() === 'gmail') {
      return Promise.reject('不支持GMail')
    } else {
      return Promise.resolve()
    }
  }
  
  function checkAlias(rule: any, value: any) {
    if (!value || value.trim() === '') {
      setFieldValidating('error')
      return Promise.resolve();
    }

    // 如果正在进行表单校验，且字段的异步校验已经完成，则直接使用校验结果，不再发送异步请求
    if (formValidating && (fieldValidating !== 'validating') && checked !== null) {
      setFieldValidating(checked ? 'success' : 'error')
      const result = checked ? Promise.resolve() : Promise.reject('别名已被使用')
      return result;
    }
  
    setFieldValidating('validating')
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value === 'test') {
          setChecked(false)
          setFieldValidating('error')
          reject('别名已被使用')
        } else {
          setChecked(true)
          setFieldValidating('success')
          resolve(true);
        }
      }, 2000) // 假设延迟是在异步调用接口，来进行校验
    })
  }

  return {rules, fieldValidating, setFormValidating}
}

export default useStep1Rules