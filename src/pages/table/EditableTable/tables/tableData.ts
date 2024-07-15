export const data: any = [{
  date: '2016-05-02',
  name: '张三',
  age: 30,
  area: 'bj',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '李四',
  age: 30,
  area: 'sh',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  date: '2016-05-01',
  name: '王五',
  age: 30,
  area: 'gz',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  date: '2016-05-03',
  name: '赵六',
  age: 30,
  area: 'sz',
  address: '上海市普陀区金沙江路 1516 弄'
}]

export const options = [{
  value: 'bj',
  label: '北京'
}, {
  value: 'sh',
  label: '上海'
}, {
  value: 'gz',
  label: '广州'
}, {
  value: 'sz',
  label: '深圳'
}]

export interface DataType {
  name: string;
  region: string;
  beginDate: string;
  endDate: string;
  jit: number;
  resource: string;
  desc: string;

  [key: string]: any;
}