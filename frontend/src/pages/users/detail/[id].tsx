import { useEffect } from 'react';
import Router from 'next/router'
import { ArrowLeftOutlined, EditFilled, DeleteFilled, MailFilled, UserOutlined } from '@ant-design/icons';
import { Form, Input, Avatar, Switch } from 'antd'

import { api } from '../../../services/api';
import styles from '../../../styles/crud.module.scss'
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface UserData {
  email: string
  name: string
  isAdmin: boolean
  company: {
    name: string
  }
}

interface FormData {
  email: string
  name: string
  isAdmin: boolean
  company_id: string
}

interface ServerSideParams {
  params: {
    id: string
  }
}

export default function UserDetail({ params }: ServerSideParams) {
  const { useForm } = Form
  const [form] = useForm<FormData>()

  useEffect(() => {
    api.get(`/users/${params.id}`).then((response) => {
      const data = response.data as UserData
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        company_id: data.company.name
      })
    })
  }, [])

  async function handleDeleteUser(id: string) {
    try {
      await api.delete(`/users/${id}`)
      Router.push('/users')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.crudContainer}>
      <header>
        <section>
          <ArrowLeftOutlined onClick={() => Router.push('/users')}/>

          <div className={styles.crudActions}>
            <EditFilled 
              style={{ marginRight: 24 }} 
              onClick={() => Router.push(`/users/edit/${params.id}`)}
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
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Email is required!'
              }
            ]}
          >
            <Input
              prefix={<MailFilled className="site-form-item-icon" />}
              placeholder="Email"
              disabled
            />
          </Form.Item>
          <Form.Item
            label="isAdmin"
            name="isAdmin"
            valuePropName="checked"
            className={styles.crudSwitch}
            style={{ flexDirection: 'row' }}>
            <Switch style={{ width: 60, height: 22, marginBottom: 7, marginLeft: 16 }} disabled />
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