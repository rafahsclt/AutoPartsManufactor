import { Layout as AntdLayout } from 'antd'

import { SideMenu } from './SideMenu'
import { Header } from './Header'

import styles from '../../styles/home.module.scss'

export const Layout: React.FC = ({ children }) => {
  const { Content } = AntdLayout

  return (
    <AntdLayout style={{ height: '100vh' }}>
      <Header />
      <AntdLayout>
        <SideMenu />
        <Content className={styles.content}>
          {children}
        </Content>
      </AntdLayout>
    </AntdLayout>
  )
}