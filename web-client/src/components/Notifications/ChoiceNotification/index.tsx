import React from 'react'

import Button from '@/components/Button'
import NotificationTemplate, { NotificationType } from '../NotificationTemplate'

import styles from './styles.module.css'

interface ChoiceNotificationProps {
  text: string
  type: NotificationType
  firstOption: () => void
  secondOption: () => void

  authMod?: true
}

const ChoiceNotification = (props: ChoiceNotificationProps) => {
  const { text, type, firstOption, secondOption, authMod } = props

  return (
    <NotificationTemplate
      type={type}
    >
      <div className={styles.container}>
        <p>
          {text}
        </p>

        <div className={styles.buttons}>
          <Button
            text={authMod ? 'Create character' : 'Accept'}
            onClick={firstOption}
          />
          <Button
            text={authMod ? 'Authorize' : 'Decline'}
            onClick={secondOption}
          />
        </div>
      </div>
    </NotificationTemplate>
  )
}

export default ChoiceNotification