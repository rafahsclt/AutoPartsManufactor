import { useEffect, useState } from 'react';
import Router from 'next/router'
import { ArrowLeftOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Form, Input, Button, Avatar, Select } from 'antd'

import { api } from '../../../services/api';
import styles from '../../../styles/crud.module.scss'
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface FormValues {
  local: string
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

export default function CreateUnit() {
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
      await api.post('/units', { ...values })
      
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
            />
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