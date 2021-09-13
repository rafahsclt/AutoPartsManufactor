import { useEffect, useState } from 'react';
import Router from 'next/router'
import { ArrowLeftOutlined, EditFilled, DeleteFilled, MailFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Avatar, Switch, Select } from 'antd'

import { api } from '../../../services/api';
import styles from '../../../styles/crud.module.scss'
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface FormValues {
  email: string
  password: string
  name: string
  isAdmin: boolean
  password_confirmation: string
  company_id: string
}

interface UserData {
  email: string
  name: string
  isAdmin: boolean
  company: {
    name: string
  }
}

interface ICompany {
  id: string
  name: string
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

export default function EditUser({ params }: ServerSideParams) {
  const [companies, setCompanies] = useState<SelectOptions[]>([])
  const [user, setUser] = useState<UserData>()

  const [form] = Form.useForm();

  useEffect(() => {
    let companyOptions: SelectOptions[] = []

    api.get('/companies').then((response) => {
      const data = response.data as ICompany[]
      companyOptions = data.map(d => ({ value: d.id, label: d.name }))
      setCompanies(companyOptions)
    })

    api.get(`/users/${params.id}`).then((response) => {
      const data = response.data as UserData
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        company_id: data.company.name
      })
      setUser(data)
    })
  }, [])

  const handleSubmit = async (values: FormValues) => {
    const formattedValues = {
      name: values.name !== user?.name ? values.name : undefined ,
      email: values.email !== user?.email ? values.email : undefined ,
      password: values.password,
      password_confirmation: values.password_confirmation,
      isAdmin: values.isAdmin !== user?.isAdmin ? values.isAdmin : undefined ,
      company_id: values.company_id !== user?.company.name ? values.company_id : undefined
    }

    try {
      await api.put(`/users/${params.id}`, { ...formattedValues })
      
      Router.push('/users')
    } catch(err) {
      console.log(err)
    }
  }

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
            <DeleteFilled onClick={() =>  handleDeleteUser(params.id)}/>
          </div>
        </section>
      </header>
      <main>
        <Avatar size={160} alt="Profile" style={{ fontSize: 48 }}>Edit</Avatar>
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
            name="name"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="You Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
          >
            <Input
              prefix={<MailFilled className="site-form-item-icon" />}
              placeholder="Your Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm New Password"
            />
          </Form.Item>
          <Form.Item
            label="isAdmin"
            name="isAdmin"
            valuePropName="checked"
            className={styles.crudSwitch}
            style={{ flexDirection: 'row' }}>
            <Switch style={{ width: 60, height: 22, marginBottom: 7, marginLeft: 16 }} />
          </Form.Item>
          <Form.Item label="Company" name="company_id">
            <Select
              options={companies}
            >
            </Select>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
              >
                Editar
              </Button>
            )}
          </Form.Item>
        </Form>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: { params: context.params } }
})