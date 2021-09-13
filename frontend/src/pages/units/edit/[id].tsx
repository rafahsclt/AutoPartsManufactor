import { useEffect, useState } from 'react';
import Router from 'next/router'
import { ArrowLeftOutlined, DeleteFilled, EnvironmentOutlined } from '@ant-design/icons';
import { Form, Input, Button, Avatar, Select } from 'antd'

import { api } from '../../../services/api';
import styles from '../../../styles/crud.module.scss'
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface FormValues {
  local: string
  company_id: string
}

interface UnitData {
  local: string
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

export default function EditUnit({ params }: ServerSideParams) {
  const [companies, setCompanies] = useState<SelectOptions[]>([])
  const [unit, setUnit] = useState<UnitData>()

  const [form] = Form.useForm();

  useEffect(() => {
    let companyOptions: SelectOptions[] = []

    api.get('/companies').then((response) => {
      const data = response.data as ICompany[]
      companyOptions = data.map(d => ({ value: d.id, label: d.name }))
      setCompanies(companyOptions)
    })

    api.get(`/units/${params.id}`).then((response) => {
      const data = response.data as UnitData
      form.setFieldsValue({
        local: data.local,
        company_id: data.company.name
      })
      setUnit(data)
    })
  }, [])

  const handleSubmit = async (values: FormValues) => {
    const formattedValues = {
      name: values.local !== unit?.local ? values.local : undefined ,
      company_id: values.company_id !== unit?.company.name ? values.company_id : undefined
    }

    try {
      await api.put(`/units/${params.id}`, { ...formattedValues })
      
      Router.push('/units')
    } catch(err) {
      console.log(err)
    }
  }

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
            label="Local"
            name="local"
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