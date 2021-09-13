import { useEffect, useState } from 'react';
import Router from 'next/router'
import { ArrowLeftOutlined, MailFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Avatar, Switch, Select } from 'antd'

import { api } from '../../../services/api';
import styles from '../../../styles/crud.module.scss'
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface FormValues {
  email: string
  password: string
  name: string
  password_confirmation: string
  company_id: string
}

interface ICompany {
  id: string
  name: string
}

interface SelectOptions {
  label: string
  value: string
}

export default function CreateUser() {
  const [companies, setCompanies] = useState<SelectOptions[]>([])

  const [form] = Form.useForm();

  useEffect(() => {
    api.get('/companies').then((response) => {
      const data = response.data as ICompany[]
      const newOptions = data.map(d => ({ value: d.id, label: d.name }))
      setCompanies(newOptions)
    })
  }, [])

  const handleSubmit = async (values: FormValues) => {
    try {
      await api.post('/users', { ...values })
      
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

          <div />
        </section>
      </header>
      <main>
        <Avatar size={160} alt="Profile" style={{ fontSize: 62 }}>New</Avatar>
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
            rules={[
              {
                required: true,
                message: 'Name is required!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="You Name"
            />
          </Form.Item>
          <Form.Item
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
              placeholder="Your Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Password is required!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Your Password"
            />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            rules={[
              {
                required: true,
                message: 'Password is required!'
              },
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
              placeholder="Confirm Your Password"
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
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
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