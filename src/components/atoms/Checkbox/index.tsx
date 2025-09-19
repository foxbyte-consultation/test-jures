import React, { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';

// 標準のinputタグが持つ属性をすべて受け取れるようにする
type Props = InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.FC<Props> = ({ className, ...props }) => {
  return (
    <label className={`${styles.container} ${className}`}>
      <input type="checkbox" className={styles.realCheckbox} {...props} />
      <span className={styles.customCheckbox}></span>
    </label>
  );
};

export default Checkbox;
