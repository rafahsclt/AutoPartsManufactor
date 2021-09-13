import { useState, useEffect } from 'react';
import { Typography, Grid } from 'antd'
import { Layout,  } from '../../components/Layout'
import { Table, Space, Button } from 'antd';
import { PlusOutlined, EditFilled, EyeOutlined } from '@ant-design/icons';
import { GetServerSideProps } from 'next';
import Router from 'next/router'

import styles from '../../styles/tables.module.scss'
import { withSSRAuth } from '../../utils/withSSRAuth';
import { api } from '../../services/api';

interface IUnit {
  id: string
  local: string
  company: {
    name: string
  }
}

interface IData {
  key: string
  companyName: string
  local: string
}

const data = [
  {
    key: '1',
    name: 'John Doe',
    local: 'Campinas - SP',
  },
  {
    key: '2',
    name: 'John Tre',
    local: 'Rio de Janeiro - RJ',
  }
]

const UnitList: React.FC = () => {
  const [units, setUnits] = useState<IData[]>([])

  const { Title } = Typography
  const { Column } = Table
  const { useBreakpoint } = Grid

  useEffect(() => {
    api.get('/units').then(response => {
      const data = response.data as IUnit[]

      const formattedDate: IData[] = data.map(d => ({
        key: d.id,
        local: d.local,
        companyName: d.company.name
      }))

      setUnits(formattedDate)
    })
  }, [])

  const { md } = useBreakpoint()
  return (
    <Layout>
     <div className={styles.tableContent}>
      <section>
        <div className={styles.tableTitle}>
          <Title level={4}>Units</Title>
          <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => Router.push('/units/create')}
            >
              Add
            </Button>
        </div>
        <Table 
          dataSource={units}
          pagination={{
            pageSize: 5
          }}
        >
          <Column title="Local" dataIndex="local" key="local"/>
          <Column title="Company Name" dataIndex="companyName" key="companyName" />
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
                      onClick={() => Router.push(`/units/detail/${(record as any).key}`)}
                    >
                      {md ? 'Visualize' : ''}
                    </Button>
                    <Button
                      type="primary"
                      ghost
                      icon={<EditFilled />}
                      onClick={() => Router.push(`/units/edit/${(record as any).key}`)}
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

export default UnitList

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: {} }
})