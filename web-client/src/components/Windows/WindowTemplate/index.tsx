import React, { ReactNode } from 'react'

import styles from "./styles.module.css"

const WINDOW_TYPES = {
  // REGULAR: 'regular',
  // INSTRUCTION: 'instruction',
  // CHARACTERISTICS: 'characteristics',
  // MESSAGE: 'message',
  // REWARD: 'reward',
  WARNING: 'warning',
  // CREATE_CHARACTER: 'create-character',
  // AUTHORIZE: 'authorize'
} as const;

export type WindowType = typeof WINDOW_TYPES[keyof typeof WINDOW_TYPES];

// const validWindowTypes = Object.values(WINDOW_TYPES);

// const isWindowType = (value: unknown): value is WindowType => {
//   return validWindowTypes.includes(value as WindowType);
// };

type HighlightType = 'positive' | 'negative' | 'medium'

export interface HighlightedWord {
  words: string[]
  type: HighlightType
}

interface WindowTemplateProps {
  type?: WindowType
  title?: JSX.Element | string
  children: ReactNode
  className?: string
  size?: 'small' | 'unlimited'
  showCloseButton?: boolean
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

const WindowTemplate = (props: WindowTemplateProps) => {
  const { title, type, children, className, size = 'small', showCloseButton } = props

  return (
    <div className={`${styles.window} ${size === 'small' ? styles.smallWindow : styles.unlimitedWindow} `}>
      <div className={styles.background} />
      {showCloseButton ?
        <div className={styles.buttons}>
          x
        </div> : null
      }
      <div className={`${styles.messageContainer} ${className}`}>
        {type || title ?
          <p className={styles.type}>
            {/* {type === 'characteristics' ? <span></span> :
            type === 'instruction' ? <span></span> :
            type === 'message' ? <span></span> :
            type === 'regular' ? <span>ⓘ WINDOW</span> :
            type === 'reward' ? <span></span> :
            type === 'warning' ? <span className={styles.typeWarning}> <span className={styles.warningSymbol}>!</span>&nbsp;WARNING</span> :
            type === 'create-character' ? <span> CREATE CHARACTER </span> :
            type === 'authorize' ? <span> AUTHORIZE </span> :
            <span>{type}</span>
            } */}
            {type === 'warning' ? 
              <span className={styles.typeWarning}>
                <span className={styles.warningSymbol}>!</span>
                &nbsp;WARNING
              </span> :
            typeof title === 'string' ?
              <span>{title}</span> : title
            }
          </p> : null
        }
        
        {children}
      </div>
    </div>
  );
};

export default WindowTemplate;