import { useState, useEffect } from 'react'
import { Typography, Grid } from 'antd'
import { PlusOutlined, EditFilled, EyeOutlined } from '@ant-design/icons';
import { Table, Space, Button } from 'antd';
import { GetServerSideProps } from 'next';

import { api } from '../../services/api';
import { Layout } from '../../components/Layout'
import { withSSRAuth } from '../../utils/withSSRAuth';

import styles from '../../styles/tables.module.scss'
import Router from 'next/router';

interface IUser {
  id: string
  name: string
  email: string
  company: {
    name: string
  }
}

interface IData {
  key: string
  name: string
  email: string
  companyName: string
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IData[]>([])

  const { Title } = Typography
  const { Column } = Table
  const { useBreakpoint } = Grid

  const { md } = useBreakpoint()

  useEffect(() => {
    api.get('/users').then(response => {
      const data = response.data as IUser[]

      const formattedData: IData[] = data.map(d => ({
        key: d.id,
        name: d.name,
        companyName: d.company.name,
        email: d.email
      }))

      setUsers(formattedData)
    })
  }, [])

  return (
    <Layout>
      <div className={styles.tableContent}>
        <section>
          <div className={styles.tableTitle}>
            <Title level={4}>Users</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => Router.push('/users/create')}
            >
              Add
            </Button>
          </div>
          <Table 
            dataSource={users}
            pagination={{
              pageSize: 5
            }}
          >
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Company Name" dataIndex="companyName" key="companyName" className={styles.hideOnMobile} />
            <Column
              title="Action"
              key="action"
              render={(_, record) => {
                return (
                  <Space size="large">
                    <Button
                      type="primary"
                      ghost
                      icon={<EyeOutlined />}
                      onClick={() => Router.push(`/users/detail/${(record as any).key}`)}
                    >
                      {md ? 'Visualize' : ''}
                    </Button>
                    <Button
                      type="primary"
                      ghost
                      icon={<EditFilled />}
                      onClick={() => Router.push(`/users/edit/${(record as any).key}`)}
                    >
                      {md ? 'Edit' : ''}
                    </Button>
                  </Space>
                )
              }}
            />
          </Table>
        </section>
      </div>
    </Layout>
  )
}

export default UserList

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: {} }
})