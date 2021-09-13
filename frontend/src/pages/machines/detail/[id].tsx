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

interface IMachine {
  name: string
  image: string
  description: string
  model: string
  owner: string
  status: string
  health_level: number
  image_url: string
  unit: {
    local: string
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

interface ServerSideParams {
  params: {
    id: string
  }
}

const { Dragger } = Upload
const { Title } = Typography

export default function UnitDetail({ params }: ServerSideParams) {
  const [units, setUnits] = useState<SelectOptions[]>([])
  const [machine, setMachine] = useState<IMachine>()
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

    api.get(`/machines/${params.id}`).then(response => {
      const data = response.data as IMachine
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        model: data.model,
        owner: data.status,
        unit_id: data.unit.local,
        status: data.status
      })
      setInputValue(data.health_level)
      setimgUrl(data.image_url)
      setMachine(data)
    })
  }, [])

  const props = {
    name: 'file',
    multiple: false,
    disabled: !!imgUrl,
    style: { width: 360 },
    action: ""
  }


  return (
    <div className={styles.crudContainer}>
      <main>
        <header className={styles.headerContainer}>
          <ArrowLeftOutlined onClick={() => Router.push('/machines')}/>
          <Title> Machine Detail</Title>
        </header>
        <Dragger {...props} disabled>
          {
            imgUrl ?
              <img src={imgUrl} alt="uploadedImage" width="350" />
              :
              <>
                <p className="ant-upload-text">No Image</p>
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
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <Input
              prefix={<AuditOutlined className="site-form-item-icon" />}
              placeholder="Description"
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Model"
            name="model"
          >
            <Input
              prefix={<ToolOutlined className="site-form-item-icon" />}
              placeholder="Model"
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Owner"
            name="owner"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Owner"
              disabled
            />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              options={statusOptions}
              disabled
            >
            </Select>
          </Form.Item>
          <Form.Item label="Health Level" name="healthLevel">
            <Row>
              <Col span={16}>
                <Slider
                  min={0}
                  max={100}
                  value={typeof inputValue === 'number' ? inputValue : 0}
                  disabled
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={100}
                  style={{ margin: '0 16px', minHeight: '38px' }}
                  value={inputValue}
                  disabled
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Unit" name="unit_id">
            <Select
              options={units}
              disabled
            >
            </Select>
          </Form.Item>
        </Form>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: { params: context.params } }
})