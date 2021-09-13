import { useEffect } from 'react';
import Router from 'next/router'
import { ArrowLeftOutlined, EditFilled, DeleteFilled, EnvironmentOutlined } from '@ant-design/icons';
import { Form, Input, Avatar } from 'antd'

import { api } from '../../../services/api';
import styles from '../../../styles/crud.module.scss'
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface UnitData {
  local: string
  company: {
    name: string
  }
}

interface FormData {
  local: string
  company_id: string
}

interface ServerSideParams {
  params: {
    id: string
  }
}

export default function UnitDetail({ params }: ServerSideParams) {
  const { useForm } = Form
  const [form] = useForm<FormData>()

  useEffect(() => {
    api.get(`/units/${params.id}`).then((response) => {
      const data = response.data as UnitData
      form.setFieldsValue({
        local: data.local,
        company_id: data.company.name
      })
    })
  }, [])

  async function handleDeleteUser(id: string) {
    try {
      await api.delete(`/units/${id}`)
      Router.push('/units')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.crudContainer}>
      <header>
        <section>
          <ArrowLeftOutlined onClick={() => Router.push('/units')}/>

          <div className={styles.crudActions}>
            <EditFilled 
              style={{ marginRight: 24 }} 
              onClick={() => Router.push(`/units/edit/${params.id}`)}
            />
            <DeleteFilled onClick={() =>  handleDeleteUser(params.id)}/>
          </div>
        </section>
      </header>
      <main>
        <Avatar size={160} alt="Profile" style={{ fontSize: 48 }}>Detail</Avatar>
        <Form
          form={form}
          wrapperCol={{
            span: 60
          }}
          layout="vertical"
          className={styles.crudForm}
        >
          <Form.Item
            label="Local"
            name="local"
            rules={[
              {
                required: true,
                message: 'Local is required!'
              }
            ]}
          >
            <Input
              prefix={<EnvironmentOutlined className="site-form-item-icon" />}
              placeholder="Local"
              disabled
            />
          </Form.Item>
          <Form.Item label="Company" name="company_id">
            <Input
              placeholder="Company"
              disabled
            >
            </Input>
          </Form.Item>
        </Form>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: { params: context.params } }
})