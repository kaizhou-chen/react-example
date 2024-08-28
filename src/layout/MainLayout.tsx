import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, Card } from 'antd';

import LayoutMenu from './LayoutMenu';
import LayoutBreadcrumb from './LayoutBreadcrumb';

import { MyContext } from '@/utils/context';
import { NavLink } from './NavLink'

/** 样式、图片，使用 import 导入 */
import './MainLayout.less'
import logo from '../assets/letter-r.svg'

const { Header, Content, Sider } = Layout;

// 这些页面，不放在 Card 里
const plainPage = [ 
  '/',
  '/table/basic',
  '/detail/tree'
]

function ContentWrap(props: any) {
  return (
    props.plain 
      ? <div className='ux-plain'>{props.children}</div> 
      : <Card>{props.children}</Card>
  )
}

const MainLayout: React.FC = () => {
  const { pathname } = useLocation()
  const str = useContext(MyContext)

  const [ plain, setPlain ] = useState(false)

  useEffect(() => {
    const isPlain = plainPage.some(x => x === pathname)
    setPlain(isPlain)
  }, [pathname])

  useEffect(() => {
    console.log('my context value', str)

    console.log('logo', logo)
  }, [])

  return (
    <Layout>
      <Header className='ux-head'>
        <div style={{ display: 'inline-flex' }}>
          <img src={logo} style={{ width: '45px', height: '45px' }} />
          <div className="logo-text">React Example</div>
        </div>
        <div style={{ alignSelf: 'end', paddingBottom: '12px' }}>
          <LayoutBreadcrumb></LayoutBreadcrumb>
        </div>
      </Header>

      <Layout>
        <Sider theme='light' width={220}>
          <LayoutMenu></LayoutMenu>
        </Sider>

        <Layout className='ux-center'>
          <ContentWrap plain={plain}>
            <Content className='ux-main'>
              <Outlet />
            </Content>
          </ContentWrap>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout