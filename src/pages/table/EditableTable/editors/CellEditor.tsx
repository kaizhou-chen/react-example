// 动态组件
import * as MyEditor from './index'

import styles from './CellEditor.module.less'

function CellEditor(props: CellEditorProps) {
  const nameMap: any = {
    'text': 'InputEditor',
    'number': 'NumberEditor',
    'date': 'DateEditor',
    'select': 'SelectEditor'
  }
  const name = nameMap[props.type]

  // @ts-ignore
  const Editor = MyEditor[name]
  return (
    <div className={styles['cell-editor']}>
      <Editor {...props} />
    </div>
  )
}

export default CellEditor

/**
 * 可选参数：
 * type     输入框类型
 * options  下拉框的选项数组
 * focus    是否自动获取焦点，编辑单元格为 true，编辑行为 false
 */
export interface CellEditorProps {
  type?: any;
  options?: any;
  focus?: boolean;
  value: any;
  onChange(value: any): any;
}