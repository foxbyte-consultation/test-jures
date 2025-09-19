'use client';

import React from 'react';
import styles from './ImportanceSelector.module.css';

interface Props {
  currentImportance: number;
  onSelect: (importance: number) => void;
}

const MAX_LEVEL = 5;

const ImportanceSelector: React.FC<Props> = ({
  currentImportance,
  onSelect,
}) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: MAX_LEVEL }).map((_, index) => {
        const importanceLevel = index + 1;
        const isActive = importanceLevel <= currentImportance;

        return (
          <div
            key={importanceLevel}
            className={`${styles.dot} ${isActive ? styles.isActive : ''}`}
            onClick={() => onSelect(importanceLevel)}
            title={`重要度 ${importanceLevel}`}
          />
        );
      })}
    </div>
  );
};

export default ImportanceSelector;
