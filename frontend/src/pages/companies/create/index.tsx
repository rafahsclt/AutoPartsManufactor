import Router from 'next/router'
import { ArrowLeftOutlined, ShopOutlined } from '@ant-design/icons';
import { Form, Input, Button, Avatar } from 'antd'

import { api } from '../../../services/api';
import styles from '../../../styles/crud.module.scss'
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';

interface FormValues {
  name: string
}

export default function CreateUser() {
  const [form] = Form.useForm();

  const handleSubmit = async (values: FormValues) => {
    try {
      await api.post('/companies', { ...values })
      
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
              prefix={<ShopOutlined className="site-form-item-icon" />}
              placeholder="You Name"
            />
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