'use client'; // このコンポーネントはクライアントサイドで動作するため、宣言が必要です

import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import styles from './TodoInput.module.css';

interface Props {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const onTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onAddButtonClick = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText(''); // 入力欄をクリア
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ページの再読み込みを防ぐ
    onAddButtonClick();
  };

  return (
    <form className={styles.container} onSubmit={onFormSubmit}>
      <Input
        type="text"
        placeholder="新しいToDoを追加にゃん🐾"
        value={text}
        onChange={onTextInputChange}
      />
      <Button type="submit">追加</Button>
    </form>
  );
};

export default TodoInput;
