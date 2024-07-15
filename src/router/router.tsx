
import { Suspense, lazy } from 'react'
import { Skeleton } from 'antd';
import { createHashRouter } from 'react-router-dom'

// 懒加载的动态组件
import DynamicComponent from '@/component/DynamicComponent';

// 使用 lazy 懒加载组件
const MainLayout = lazy(() => import('@/layout/MainLayout'))


const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Skeleton />}>
        <MainLayout />
      </Suspense>
    ),

    /**
      使用嵌套路由时，父组件一定要包含 Outlet 才能正常显示子组件
      子路由的path，前面不要“/”

      <Outlet />
    */
    children: [
      {
        index: true,  // 默认页面
        element: <DynamicComponent name="Dashboard" />
      },

      /** 表单页 */
      {
        path: "form",
        children: [
          {
            path: 'basic',
            element: <DynamicComponent name="BasicForm" />
          },
          {
            path: 'create',
            element: <DynamicComponent name="BasicForm" />
          },
          {
            path: 'update',
            element: <DynamicComponent name="BasicForm" />
          },
          {
            path: 'steps',
            element: <DynamicComponent name="StepForm" />
          },
        ]
      },

      /** 表格页 */
      {
        path: 'table',
        children: [
          {
            path: 'basic',
            element: <DynamicComponent name="BasicTable" />
          },
          {
            path: 'editable',
            element: <DynamicComponent name="EditableTable" />
          },
        ]
      },

      /** 详情页 */
      {
        path: 'detail',
        children: [
          {
            path: 'basic',
            element: <DynamicComponent name="BasicDetail" />
          },
        ]
      },

      /** 其他 */
      {
        path: "other",
        children: [
          {
            path: 'tree',
            element: <DynamicComponent name="TreeLayout" />
          },
          {
            path: 'tools',
            element: <DynamicComponent name="Tools" />
          }
        ]
      },
    ],
  },
];

// 项目的 base
const base = import.meta.env.VITE_BASE_PATH;

// 创建 hash 路由，并设置 basename
const router = createHashRouter(routes, { basename: base })

export default router;