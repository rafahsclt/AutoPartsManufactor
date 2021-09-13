import { useEffect, useState } from 'react';
import Router from 'next/router'
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Typography,
  Row,
  Col,
  Slider,
  InputNumber
} from 'antd'

import {
  ArrowLeftOutlined,
  InboxOutlined,
  TagsOutlined,
  ToolOutlined,
  AuditOutlined,
  UserOutlined
} from '@ant-design/icons';

import { api } from '../../../services/api';
import styles from '../../../styles/machineCrud.module.scss'
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface FormValues {
  name: string
  image: string
  description: string
  model: string
  owner: string
  status: string
  health_level: number
  unit_id: string
}

interface IMachine {
  name: string
  image: string
  description: string
  model: string
  owner: string
  status: string
  health_level: number
  unit: {
    name: string
  }
}

interface IUnit {
  id: string
  local: string
}

interface SelectOptions {
  label: string
  value: string
}

const { Dragger } = Upload
const { Title } = Typography

export default function CreateUnit() {
  const [units, setUnits] = useState<SelectOptions[]>([])
  const [imgUrl, setimgUrl] = useState<any>(null)
  const [imgFile, setImgFile] = useState<File | undefined>(undefined)
  const [inputValue, setInputValue] = useState(100)

  const statusOptions = [
    {
      label: 'Running',
      value: 'Running',
    },
    {
      label: 'Stopped',
      value: 'Stopped',
    },
    {
      label: 'Alerting',
      value: 'Alerting',
    }
  ]

  const [form] = Form.useForm();

  useEffect(() => {
    api.get('/units').then((response) => {
      const data = response.data as IUnit[]
      const newOptions = data.map(d => ({ value: d.id, label: d.local }))
      setUnits(newOptions)
    })
  }, [])

  const handleSubmit = async (values: FormValues) => {
    try {
      console.log(values)
      const { name, description, owner, model, unit_id, status } = values

      const data = new FormData()

      data.append('name', name)
      data.append('description', description)
      data.append('owner', owner)
      data.append('model', model)
      data.append('unit_id', unit_id)
      data.append('status', status)
      data.append('health_level', String(inputValue))
      imgFile && data.append('machineImage', imgFile)

      console.log(data)

      await api.post('/machines', data)

      Router.push('/machines')
    } catch (err) {
      console.log(err)
    }
  }

  const onChangeSlider = (value: number) => {
    setInputValue(value)
  }

  const props = {
    name: 'file',
    multiple: false,
    disabled: !!imgUrl,
    style: { width: 360 },
    action: "",
    onRemove: (info: any) => {
      setimgUrl('')
      console.log(info)
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        const fileUrl = URL.createObjectURL(info.file.originFileObj)
        setimgUrl(fileUrl)
        setImgFile(info.file.originFileObj)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);

      const fileUrl = URL.createObjectURL(e.dataTransfer.files[0])
      setimgUrl(fileUrl)
      setImgFile(e.dataTransfer.files[0])
    },
  };


  return (
    <div className={styles.crudContainer}>
      <main>
        <header className={styles.headerContainer}>
          <ArrowLeftOutlined onClick={() => Router.push('/machines')}/>
          <Title>New Machine</Title>
        </header>
        <Dragger {...props}>
          {
            imgUrl ?
              <img src={imgUrl} alt="uploadedImage" width="350" />
              :
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag your image</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                  band files
                </p>
              </>
          }
        </Dragger>
        <Form
          form={form}
          wrapperCol={{
            span: 60
          }}
          layout="vertical"
          className={styles.crudForm}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Name is required!'
              }
            ]}
          >
            <Input
              prefix={<TagsOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <Input
              prefix={<AuditOutlined className="site-form-item-icon" />}
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item
            label="Model"
            name="model"
          >
            <Input
              prefix={<ToolOutlined className="site-form-item-icon" />}
              placeholder="Model"
            />
          </Form.Item>
          <Form.Item
            label="Owner"
            name="owner"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Owner"
            />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              options={statusOptions}
            >
            </Select>
          </Form.Item>
          <Form.Item label="Health Level" name="healthLevel">
            <Row>
              <Col span={16}>
                <Slider
                  min={0}
                  max={100}
                  onChange={onChangeSlider}
                  value={typeof inputValue === 'number' ? inputValue : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={100}
                  style={{ margin: '0 16px', minHeight: '38px', color: '#fff' }}
                  value={inputValue}
                  onChange={onChangeSlider}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Unit" name="unit_id">
            <Select
              options={units}
            >
            </Select>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
              >
                Criar
              </Button>
            )}
          </Form.Item>
        </Form>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: {} }
})