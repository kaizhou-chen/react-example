import React, { useCallback, useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router/router'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

function App() {
  const [locale, setLocale] = useState(zhCN)

  useEffect(() => {
    dayjs.locale('zh-cn');
  }, [])

  return (
    <ConfigProvider locale={locale}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
