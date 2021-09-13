import { Grid, Layout, Input, Form, Button } from 'antd'
import { MailFilled, LockOutlined } from '@ant-design/icons';
import { GetServerSideProps } from 'next';
import { withSSRGuest } from '../utils/withSSRGuest'

import styles from '../styles/home.module.scss'
import { useAuth } from '../hooks/useAuth';

interface FormValues {
  email: string
  password: string
}

const Home: React.FC = () => {
  const { useBreakpoint } = Grid
  const { Header, Content } = Layout

  const { signIn } = useAuth()

  const [form] = Form.useForm();

  const handleSubmit = async (values: FormValues) => {
    const { email, password } = values

    await signIn({ email, password })
  }

  return (
    <Layout className={styles.signInContainer}>
      <main className={styles.signInContent}>
        <Form
          wrapperCol={{
            span: 60
          }}
          layout="vertical"
          onFinish={handleSubmit}
        >
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
              placeholder="Your Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
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
          <Form.Item shouldUpdate className={styles.signInButtonContainer}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
      </main>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (context) => {
  return { props: {} }
})
