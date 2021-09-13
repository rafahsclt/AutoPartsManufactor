import { useEffect } from 'react';
import Router from 'next/router'
import { ArrowLeftOutlined, EditFilled, DeleteFilled, ShopOutlined } from '@ant-design/icons';
import { Form, Input, Avatar } from 'antd'

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

export default function CompanyDetail({ params }: ServerSideParams) {
  const { useForm } = Form
  const [form] = useForm<CompanyData>()

  useEffect(() => {
    api.get(`/companies/${params.id}`).then((response) => {
      const data = response.data as CompanyData
      form.setFieldsValue({
        name: data.name,
      })
    })
  }, [])

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
            <EditFilled 
              style={{ marginRight: 24 }} 
              onClick={() => Router.push(`/companies/edit/${params.id}`)}
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
              prefix={<ShopOutlined className="site-form-item-icon" />}
              placeholder="Company Name"
              disabled
            />
          </Form.Item>
        </Form>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: { params: context.params } }
})