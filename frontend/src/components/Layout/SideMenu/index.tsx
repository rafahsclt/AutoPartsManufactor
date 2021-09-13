import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Router from 'next/router'

import { Layout, Typography } from 'antd'
import { AppstoreOutlined, UserOutlined, LineChartOutlined, ApartmentOutlined, ToolOutlined } from '@ant-design/icons'

const Menu = dynamic(() => import('antd/lib/menu'), { ssr: false })
const SubMenu = dynamic(() => import('antd/lib/menu/SubMenu'), { ssr: false })
const MenuItem = dynamic(() => import('antd/lib/menu/MenuItem'), { ssr: false })

import styles from './sidemenu.module.scss'
import { useAuth } from '../../../hooks/useAuth'

export const SideMenu: React.FC = () => {
  const openKeys = ['general', 'enterprise', 'assets']
  const [selectedKeys, setSelectedKeys] = useState([''])
  const { Sider } = Layout

  const { Text } = Typography
  const { user } = useAuth()

  useEffect(() => {
    if (Router.router) {
      const { asPath } = Router.router

      const selectedRouter = asPath.replace('/', '')

      setSelectedKeys([selectedRouter])
    }
  }, [Router.router])

  return (
    <Sider className={styles.sideMenuContainer}>
      <Menu
        mode="inline"
        style={{ width: '100%' }}
        defaultOpenKeys={openKeys}
        selectedKeys={selectedKeys}
        className={styles.menuContainer}
      >
        <SubMenu key="general" title="GENERAL">
          <MenuItem key="dashboard" onClick={() => Router.push('/dashboard')}>
            <LineChartOutlined />  <Text className={styles.menuText}>Dashboard</Text>
          </MenuItem>
          <MenuItem key="users" onClick={() => Router.push('/users')}>
            <UserOutlined /> <Text className={styles.menuText}> Users</Text>
          </MenuItem>
        </SubMenu>
        {user.isAdmin &&
          <SubMenu key="enterprise" title="ENTERPRISE">
            <MenuItem key="companies" onClick={() => Router.push('/companies')}>
              <AppstoreOutlined />  <Text className={styles.menuText}>Companies</Text>
            </MenuItem>
            <MenuItem key="units" onClick={() => Router.push('/units')}>
              <ApartmentOutlined /> <Text className={styles.menuText}>Units</Text>
            </MenuItem>
          </SubMenu>
        }
        <SubMenu key="assets" title="ASSETS">
          <MenuItem key="machines" onClick={() => Router.push('/machines')}>
            <ToolOutlined />  <Text className={styles.menuText}>Machines</Text>
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sider>
  )
}