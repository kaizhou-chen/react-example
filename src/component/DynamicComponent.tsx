import { lazy, Suspense } from 'react';

// 动态加载组件
const components = import.meta.glob('@/pages/**/*.tsx');

const importComponent = (componentName): any => {
  const keys = Object.keys(components)
  const path = keys.find(x => x.indexOf(componentName + '.tsx') >= 0)
  // 如果组件存在，则导入
  if (path) {
    return components[path];
  }
};

// 空组件
function Empty() {
  return <div></div>
}

// 根据名称，动态加载的动态组件
function DynamicComponent(props) {
  let Component: any = Empty;

  const importFn = importComponent(props.name);
  if (importFn) {
    Component = lazy(importFn);
  }

  return (
    <Suspense fallback={<div />}>
      <Component />
    </Suspense>
  )
}

export default DynamicComponent
