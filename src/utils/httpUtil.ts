import { notification } from 'antd'

// 发送请求，对于请求异常做通用处理
export async function sendRequest(requestFn: any) {
  let resp = null;
  try {
    resp = await requestFn()
    let error = checkError(resp)
    if (error === null) {
      return resp
    } else {
      alert('操作失败', error)
      throw new Error(error)
    }
  } catch(e: any) {
    alert('请求失败', e.message)
    throw e
  }
}

function alert(type: any, msg: any) {
  notification.open({
    message: type + '<br>' + msg,
  })
}

function checkError(resp: any) {
  if (!resp) {
    return '响应为空';
  }

  if(resp.status == 200) {
    if(resp?.data === '') { // 返回的数据为空
      const text = resp.data.message || '响应数据为空';
      return text;
    }
  } else {
    const data = (resp.data instanceof String) ? '<br>' + resp.data : '';
    const text = 'status: ' + resp.status + '<br>' + resp.statusText + data
    return text;
  }

  return null;
}

/**
 * 在浏览器里下载文件
 */ 
export function download(blob: any, filename: any) {
  const blobUri = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUri;
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();

  // clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUri);
}