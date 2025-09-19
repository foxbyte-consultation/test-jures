'use client';

import React from 'react';
import { Todo } from '@/types/todo';
import Checkbox from '@/components/atoms/Checkbox';
import ImportanceSelector from '@/components/molecules/ImportanceSelector';
import styles from './TodoItem.module.css';

interface Props {
  todoItem: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onImportanceChange: (id: string, importance: number) => void;
}

const TodoItem: React.FC<Props> = ({
  todoItem,
  onToggleComplete,
  onDelete,
  onImportanceChange,
}) => {
  const onCheckboxChange = () => {
    onToggleComplete(todoItem.id);
  };

  const onDeleteButtonClick = () => {
    onDelete(todoItem.id);
  };

  const onImportanceSelect = (importance: number) => {
    onImportanceChange(todoItem.id, importance);
  };

  // 完了状態と重要度に応じてクラス名を組み立てる
  const containerClasses = `
    ${styles.container}
    ${todoItem.isCompleted ? styles.isCompleted : ''}
    ${styles[`importance${todoItem.importance}`] || styles.importance1}
  `;

  return (
    <div className={containerClasses.trim()}>
      <Checkbox checked={todoItem.isCompleted} onChange={onCheckboxChange} />
      <p className={styles.text}>{todoItem.text}</p>
      <div className={styles.controls}>
        <ImportanceSelector
          currentImportance={todoItem.importance}
          onSelect={onImportanceSelect}
        />
        <button className={styles.deleteButton} onClick={onDeleteButtonClick}>
          ×
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
