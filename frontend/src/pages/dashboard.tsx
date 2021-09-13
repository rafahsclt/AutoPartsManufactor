import { Typography } from 'antd'
import { Layout } from '../components/Layout'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'

import { withSSRAuth } from '../utils/withSSRAuth'
import styles from '../styles/dashboard.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const series = [
  { name: "series1", data: [31, 120, 18, 20, 61, 24, 88]}
]

const series2 = [
  { name: "series2", data: [31, 120, 18, 20, 61, 24, 88]}
]

const Home: React.FC = () => {
  const { Title } = Typography

  return (
    <Layout>
     <div className={styles.dashboardContent}>
      <section>
        <Title level={4}>Machine usage</Title>
        <Chart 
          type="area"
          height={160}
          series={series}
          options={{}}
        />
      </section>
      <section>
      <Title level={4}>Machine status</Title>
        <Chart 
          type="bar"
          height={160}
          series={series2}
          options={{}}
        />
      </section>
     </div>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  return { props: {} }
})