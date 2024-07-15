import qs from 'qs';
import http from '@/utils/http'; // 导入http中创建的axios实例
import { download } from '@/utils/httpUtil';
import { serviceConfig } from './serviceConfig'


const { api } = serviceConfig;

export function listMarketing(data: any) {
  return http.post(`${api}/marketing/list`, JSON.stringify(data));
}

export function createMarketing(data: any) {
  return http.post(`${api}/marketing/create`, JSON.stringify(data));
}

export function updateMarketing(data: any) {
  return http.post(`${api}/marketing/update`, JSON.stringify(data));
}

export function removeMarketing(data: any) {
  return http.post(`${api}/marketing/remove`, JSON.stringify(data));
}


export function listFiles(data?: any) {
  return http.post(`${api}/marketing/files`, JSON.stringify(data));
}

/**
 * 文件上传
 * 1) Content-Type 设置为 multipart/form-data
 * 2) 参数类型为 FormData
 */
export function uploadFile(data: FormData) {
  return http.post(`${api}/marketing/upload`, data, {
    headers: {'Content-Type': 'multipart/form-data'}
  });
}

/**
 * 文件下载
 * 1) responseType: 'blob' 将响应类型设置为blob
 * 2) GET 请求传参，需要使用 qs 来把数据转换成url参数的形式
 */
export function downloadFile(data: any, filename: any) {
  return http.get(`${api}/marketing/download?${qs.stringify(data)}`, {
    responseType: 'blob'
  }).then((response: any) => {
    download(response.data, filename)
  })
}

export function removeFile(data: any) {
  // 如果是 POST 请求，并且 Content-Type 为 application/x-www-form-urlencoded
  // 后端接口 需要通过 getParameter 来获取参数

  // 则，使用 qs 来把数据转换成url参数的形式
  return http.post(`${api}/marketing/removeFile`, qs.stringify(data), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });
}
