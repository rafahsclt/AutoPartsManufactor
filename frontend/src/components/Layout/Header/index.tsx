import { useMemo } from 'react'
import { Layout, Divider, Avatar, Grid } from 'antd'
import { ZoomInOutlined, WechatOutlined, BellOutlined } from '@ant-design/icons'

import styles from './header.module.scss'
import { useAuth } from '../../../hooks/useAuth'

export const Header: React.FC = () => {
  const { Header: AndHeader } = Layout
  const { useBreakpoint } = Grid

  const { md } = useBreakpoint()
  const { user } = useAuth()

  const formattedName = useMemo(() => {
    if(user.name) {
      let firstName = user.name
      let lastName = ''

      let initials = user.name[0]
  
      if(firstName.includes(' ')) {
        const splittedName = user.name.split(' ')
  
        firstName = splittedName[0]
  
        lastName = splittedName[splittedName.length - 1]

        initials += lastName[0]
      }

      return { 
        fullname: `${firstName} ${lastName}`,
        initials
      }
    }

    return { fullname: '', initials: '' }
  }, [user.name])


  return (
    <AndHeader className={styles.headerContainer}>
      <img height="45px" src="/images/logo.png" alt="Logo"/>

      <div className={styles.menuContainer}>
        <ul>
          <li>
            <ZoomInOutlined />
          </li>
          <li>
            <WechatOutlined />
          </li>
          <li>
            <BellOutlined />
          </li>
        </ul>
        {md && <Divider type="vertical" style={{ alignSelf: 'center', fontSize: 32, marginBottom: 12 }}/> }
        <div className={styles.profileContainer}>
          {md &&
          <section>
            <h3>{formattedName.fullname}</h3>
            <p>{user.email}</p>
          </section>
          }
          <Avatar size={42} alt="Profile">{formattedName.initials}</Avatar>
        </div>
      </div>
    </AndHeader>
  )
}