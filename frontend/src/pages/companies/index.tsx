import { useState, useEffect } from 'react'
import { Typography, Grid } from 'antd'
import { Layout,  } from '../../components/Layout'
import { Table, Space, Button } from 'antd';
import { PlusOutlined, EditFilled, EyeOutlined } from '@ant-design/icons';
import Router from 'next/router'
import { GetServerSideProps } from 'next';

import { withSSRAuth } from '../../utils/withSSRAuth';
import styles from '../../styles/tables.module.scss'
import { api } from '../../services/api';

interface ICompany {
  id: string
  name: string
  created_at: Date
}

interface IData {
  key: string
  name: string
  createdAt: string
}

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<IData[]>([])

  const { Title } = Typography
  const { Column } = Table
  const { useBreakpoint } = Grid

  const { md } = useBreakpoint()

  useEffect(() => {
    api.get('/companies').then(response => {
      const data = response.data as ICompany[]

      const formattedData: IData[] = data.map(d => ({ 
        key: d.id, 
        name: d.name,
        createdAt: Intl.DateTimeFormat('en-Us').format(new Date(d.created_at))
      }))

      setCompanies(formattedData)
    })
  }, [])

  return (
    <Layout>
     <div className={styles.tableContent}>
      <section>
        <div className={styles.tableTitle}>
          <Title level={4}>Companies</Title>
          <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => Router.push('/companies/create')}
            >
              Add
            </Button>
        </div>
        <Table 
          dataSource={companies}
          pagination={{
            pageSize: 5
          }}
        >
          <Column title="Name" dataIndex="name" key="name"/>
          <Column title="Created At" dataIndex="createdAt" key="createdAt"/>
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
                      onClick={() => Router.push(`/companies/detail/${(record as any).key}`)}
                    >
                      {md ? 'Visualize' : ''}
                    </Button>
                    <Button
                      type="primary"
                      ghost
                      icon={<EditFilled />}
                      onClick={() => Router.push(`/companies/edit/${(record as any).key}`)}
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

export default CompanyList

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: {} }
})