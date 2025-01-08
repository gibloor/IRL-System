import React from 'react'

import Button from '@/components/Button'
import NotificationTemplate, { WindowType } from '../WindowTemplate'

import styles from './styles.module.css'

interface ChoiceNotificationProps {
  text: string
  firstOption: () => void
  secondOption: () => void
  type?: WindowType
  authMod?: true
}

const ChoiceNotification = (props: ChoiceNotificationProps) => {
  const { text, type, firstOption, secondOption, authMod } = props

  return (
    <NotificationTemplate type='warning'>
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