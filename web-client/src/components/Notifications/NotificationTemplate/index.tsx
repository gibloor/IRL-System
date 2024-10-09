import React, { ReactNode } from 'react'

import styles from "./styles.module.css"

export type NotificationType = 'regular' | 'instruction' | 'characteristics' | 'message' | 'reward' | 'warning'
type HighlightType = 'positive' | 'negative' | 'medium'

export interface HighlightedWord {
  words: string[]
  type: HighlightType
}

interface NotificationTemplateProps {
  type: NotificationType
  children: ReactNode
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
  const { type, children } = props

  return (
    <div className={styles.notification}>
      <div className={styles.background} />
      <div className={styles.buttons}>
        x
      </div>
      <div className={styles.message_container}>
        <p className={styles.type}>
          {type === 'characteristics' ? <span></span> :
           type === 'instruction' ? <span></span> :
           type === 'message' ? <span></span> :
           type === 'regular' ? <span>ⓘ NOTIFICATION</span> :
           type === 'reward' ? <span></span> :
           type === 'warning' ? <span className={styles.type_warning}> <span className={styles.warning_symbol}>!</span>&nbsp;WARNING</span> :
           <span> {type} type isn't provided</span>
          }
        </p>
        
        {children}
      </div>
    </div>
  );
};

export default NotificationTemplate;