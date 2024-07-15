import React, { useRef, useImperativeHandle } from 'react'

// 动态组件的用法，每个子组件都提供 validate 方法，在动态组件上提供子组件的 validate 方法
import * as MyStep from './index'
import './StepItem.less'

interface StepProps {
  name: any
}

export interface StepRef {
  validate: any;
}

const StepItem = React.forwardRef<StepRef, StepProps>((props: StepProps, ref) => {
  const stepRef = useRef<StepRef>(null)

  useImperativeHandle(ref, () => ({
    validate: stepRef.current?.validate
  }))

  // @ts-ignore
  const Step = MyStep[props.name]
  return <Step ref={stepRef} />
})

export default StepItem