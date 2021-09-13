import { useState, useEffect } from 'react';
import { Typography, Grid } from 'antd'
import { Layout,  } from '../../components/Layout'
import { Table, Space, Button } from 'antd';
import { PlusOutlined, EditFilled, EyeOutlined } from '@ant-design/icons';
import Router from 'next/router'
import { GetServerSideProps } from 'next';

import styles from '../../styles/tables.module.scss'
import { withSSRAuth } from '../../utils/withSSRAuth';
import { api } from '../../services/api';

interface IMachine {
  id: string
  name: string
  owner: string
  status: string
  health_level: number
}

interface IData {
  key: string
  name: string
  owner: string
  status: string
  healthLevel: string
}

const MachineList: React.FC = () => {
  const [machines, setMachines] = useState<IData[]>([])

  const { Title } = Typography
  const { Column } = Table
  const { useBreakpoint } = Grid

  const { md } = useBreakpoint()

  useEffect(() => {
    api.get('machines').then(response => {
      const data = response.data as IMachine[]

      const formattedData: IData[] = data.map(d => ({
        key: d.id,
        name: d.name,
        owner: d.owner,
        status: d.status,
        healthLevel: `${d.health_level}%`
      }))

      setMachines(formattedData)
    })
  }, [])
  return (
    <Layout>
     <div className={styles.tableContent}>
      <section>
        <div className={styles.tableTitle}>
          <Title level={4}>Machines</Title>
          <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => Router.push('/machines/create')}
            >
              Add
            </Button>
        </div>
        <Table 
          dataSource={machines}
          pagination={{
            pageSize: 5
          }}
        >
          <Column title="Name" dataIndex="name" key="name"/>
          <Column title="Owner" dataIndex="owner" key="owner" className={styles.hideOnMobile} />
          <Column title="Status" dataIndex="status" key="status"/>
          <Column title="Health Level" dataIndex="healthLevel" key="healthLevel" className={styles.hideOnMobile} />
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
                      onClick={() => Router.push(`/machines/detail/${(record as any).key}`)}
                    >
                      {md ? 'Visualize' : ''}
                    </Button>
                    <Button
                      type="primary"
                      ghost
                      icon={<EditFilled />}
                      onClick={() => Router.push(`/machines/edit/${(record as any).key}`)}
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

export default MachineList

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: {} }
})