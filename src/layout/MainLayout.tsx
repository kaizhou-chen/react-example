import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, Card } from 'antd';

import LayoutMenu from './LayoutMenu';
import LayoutBreadcrumb from './LayoutBreadcrumb';

import { MyContext } from '@/utils/context';

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
        <div style={{ alignSelf: 'end', paddingBottom: '12px', marginLeft: 'auto', display: 'inline-flex' }}>
          <a href="https://github.com/kaizhou-chen/react-example" target="_blank" style={{ 
            lineHeight: '17px',
            justifyContent: 'center',
            display: 'inline-flex',
            color: 'rgba(0, 0, 0, 0.88)'
          }}>
            <span style={{paddingRight: '5px'}}>Github</span>
            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" className="link-icon">
              <path fill="currentColor" d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794l-1.414-1.414L17.585 5H13V3h8z"></path>
            </svg>
          </a>

          <a href="https://kaizhou-chen.github.io/docsify-blog/" target="_blank" style={{ 
            lineHeight: '17px',
            justifyContent: 'center',
            display: 'inline-flex',
            color: 'rgba(0, 0, 0, 0.88)',
            marginLeft: '18px'
          }}>
            <span style={{paddingRight: '5px'}}>我的博客</span>
            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" className="link-icon">
              <path fill="currentColor" d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794l-1.414-1.414L17.585 5H13V3h8z"></path>
            </svg>
          </a>
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