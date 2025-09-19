import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

// 標準のinputタグが持つ属性をすべて受け取れるようにする
type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = (props) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
