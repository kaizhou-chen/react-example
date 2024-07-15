export const data = [
  {
    title: '动态组件 (根据文件名动态加载)',
    key: 'dynamic', // 对于树形选择，必须有 key 字段
    children: [
      // 表单页
      {
        title: '表单页',
        key: 'forms',
        children: [
          {
            title: '基础表单',
            key: 'BasicForm',
          },
          {
            title: '多步骤表单',
            key: 'StepForm',
          },
        ]
      },

      // 表格页
      {
        title: '表格页',
        key: 'tables',
        children: [
          {
            title: '表格 + Redux',
            key: 'BasicTable',
          },
          {
            title: '可编辑表格',
            key: 'EditableTable',
          },
        ]
      },

      // 其他
      {
        title: '其他',
        key: 'other',
        children: [
          {
            title: '常用工具',
            key: 'Tools',
          },
        ]
      },
    ]
  }
]