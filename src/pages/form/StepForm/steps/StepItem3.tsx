import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Form, Upload, Button, Image, Divider } from "antd";
import type { UploadProps, UploadFile } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'

import { serviceConfig } from '@/api/serviceConfig'
import { listFiles, removeFile } from '@/api/marketingApi'

import { StepRef } from './StepItem1'

const uploadUrl = serviceConfig.api + "/marketing/upload"
const downloadUrl = serviceConfig.api + "/marketing/download"

const Step3 = React.forwardRef<StepRef>((props, ref) => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<any>([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [exceedError, setExceedError] = useState('')
  const [acceptError, setAcceptError] = useState('')
  const [oversizeError, setOversizeError] = useState('')

  const accept = '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx'

  async function getFileList() {
    const resp: any = await listFiles({});
    let { list } = resp.data;
    list = list.map((x: any, index: any) => {
      return {
        uid: index,
        name: x,
        status: 'done',
        url: downloadUrl + '/' + x
      }
    })

    setFileList(list)
  }

  const beforeUpload = (file: any) => {
    const maxSize = 10; // 10M
    const acceptTypes = accept.split(',');
    const type = file.name.substring(file.name.lastIndexOf('.'));
    const isAccept = acceptTypes.indexOf(type.toLowerCase()) > -1;
    const isOversize = (file.size / 1024 / 1024) > maxSize
    if (!isAccept) {
      const msg = accept.replace(/\./g, '').replace(',', ', ')
      setAcceptError(`上传文件只能是 ${msg} 类型`)
      return Upload.LIST_IGNORE; // 在列表里忽略
    }
    if (isOversize) {
      setOversizeError(`文件大小不能超过${maxSize}M`)
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleRemoe = (file: any) => {
    console.log('handleRemove', file);
    removeFile({ filename: file.name });
  }

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 限制文件数量，负数标识取最后几个文件
    newFileList = newFileList.slice(-5);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  function validate() {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }

  useEffect(() => {
    getFileList()
  }, [])

  useImperativeHandle(ref, () => ({
    validate
  }))

  return (
    <div style={{ width: '600px', margin: '0 auto 20px auto' }}>
      <Divider orientation="left">文件上传</Divider>
      <Upload 
        multiple={true}
        action={uploadUrl} 
        fileList={fileList} 
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
        <div>
          { acceptError ? (<div>{acceptError}</div>) : null }
          { oversizeError ? (<div>{oversizeError}</div>) : null }
        </div>
      </Upload>

      <Divider orientation="left">图片上传</Divider>
      <Upload 
        listType="picture-card"
        multiple={true}
        action={uploadUrl} 
        fileList={fileList} 
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={handleRemoe}
        beforeUpload={beforeUpload}
      >
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  )
})

export default Step3
