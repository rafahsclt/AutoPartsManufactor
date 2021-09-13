import { useEffect, useState } from 'react';
import Router from 'next/router'
import { ArrowLeftOutlined, DeleteFilled, ShopOutlined } from '@ant-design/icons';
import { Form, Input, Button, Avatar } from 'antd'

import { api } from '../../../services/api';
import styles from '../../../styles/crud.module.scss'
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface CompanyData {
  name: string
}

interface ServerSideParams {
  params: {
    id: string
  }
}

export default function EditCompany({ params }: ServerSideParams) {
  const [company, setCompany] = useState<CompanyData>()

  const [form] = Form.useForm();

  useEffect(() => {

    api.get(`/companies/${params.id}`).then((response) => {
      const data = response.data as CompanyData
      form.setFieldsValue({
        name: data.name,
      })
      setCompany(data)
    })
  }, [])

  const handleSubmit = async (values: CompanyData) => {
    const formattedValues = {
      name: values.name !== company?.name ? values.name : undefined ,
    }

    try {
      await api.put(`/companies/${params.id}`, { ...formattedValues })
      
      Router.push('/companies')
    } catch(err) {
      console.log(err)
    }
  }

  async function handleDeleteUser(id: string) {
    try {
      await api.delete(`/companies/${id}`)
      Router.push('/companies')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.crudContainer}>
      <header>
        <section>
          <ArrowLeftOutlined onClick={() => Router.push('/companies')}/>

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
            label="Name"
            name="name"
          >
            <Input
              prefix={<ShopOutlined className="site-form-item-icon" />}
              placeholder="Company Name"
            />
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