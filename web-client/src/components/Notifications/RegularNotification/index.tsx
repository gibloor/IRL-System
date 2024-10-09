import React from 'react'
import NotificationTemplate, { HighlightedWord, renderMessage } from '../NotificationTemplate'

interface RegularNotificationProps {
  text: string
  highlightedWords?: HighlightedWord[] 
}

const RegularNotification = (props: RegularNotificationProps) => {
  const { highlightedWords, text } = props

  return (
    <NotificationTemplate
      type='regular'
    >
      <p>
        {highlightedWords ? renderMessage(highlightedWords, text) : text}
      </p>
    </NotificationTemplate>
  )
}

export default RegularNotification