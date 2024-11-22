import React, { ReactNode } from 'react'

import styles from "./styles.module.css"

export type NotificationType = 'regular' | 'instruction' | 'characteristics' | 'message' | 'reward' | 'warning' | 'create-character' | 'authorize'
type HighlightType = 'positive' | 'negative' | 'medium'

export interface HighlightedWord {
  words: string[]
  type: HighlightType
}

interface NotificationTemplateProps {
  type: NotificationType
  children: ReactNode
  className?: string
}

const HIGHLIGHT_COLORS: Record<HighlightType, string> = {
  positive: "#00ff00",
  negative: "#ff0000",
  medium: "#ffff00",
};

const HighlightedWord: React.FC<{ word: string; highlightType: HighlightType }> = ({ word, highlightType }) => (
  <span style={{ color: HIGHLIGHT_COLORS[highlightType]}}>
    {word}
  </span>
);

export const renderMessage = (highlightedWords: HighlightedWord[], text: string) => {
  const words = text.toUpperCase().split(' ');
  return words.map((word, index) => {
    const highlight = highlightedWords.find(hw => hw.words.includes(word));
    if (highlight) {
      return <HighlightedWord key={index} word={word} highlightType={highlight.type} />;
    }
    return <span key={index}>{word} </span>;
  });
};

const NotificationTemplate = (props: NotificationTemplateProps) => {
  const { type, children, className } = props

  return (
    <div className={`${styles.notification} ${type === 'create-character' ? styles.bigNotification : null}`}>
      <div className={styles.background} />
      {type === 'create-character' || type === 'authorize' ? null :
        <div className={styles.buttons}>
          x
        </div>
      }
      <div className={`${styles.messageContainer} ${className}`}>
        <p className={styles.type}>
          {type === 'characteristics' ? <span></span> :
           type === 'instruction' ? <span></span> :
           type === 'message' ? <span></span> :
           type === 'regular' ? <span>ⓘ NOTIFICATION</span> :
           type === 'reward' ? <span></span> :
           type === 'warning' ? <span className={styles.typeWarning}> <span className={styles.warningSymbol}>!</span>&nbsp;WARNING</span> :
           type === 'create-character' ? <span> CREATE CHARACTER </span> :
           type === 'authorize' ? <span> AUTHORIZE </span> :
           <span> {type} type isn't provided</span>
          }
        </p>
        
        {children}
      </div>
    </div>
  );
};

export default NotificationTemplate;