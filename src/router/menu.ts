const menu = [
  {
    label: 'Dashboard',
    icon: 'HomeOutlined',
    path: '/',
  },

  {
    label: '表单页',
    icon: 'EditOutlined',
    children: [
      {
        label: '基础表单',
        path: '/form/basic',
      },
      {
        label: '多步骤表单',
        path: '/form/steps'
      },
    ]
  },

  {
    label: '表格页',
    icon: 'TableOutlined',
    children: [
      {
        label: '表格 + Redux',
        path: '/table/basic',
      },
      {
        label: '可编辑表格 + aHooks',
        path: '/table/editable',
      },
    ]
  },

  {
    label: '其他',
    icon: 'FileOutlined',
    children: [
      {
        label: '树形控件',
        path: '/other/tree',
      },
      {
        label: '常用工具',
        path: '/other/tools',
      },
    ]
  },
]

export default menu;