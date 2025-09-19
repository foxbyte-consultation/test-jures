import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

// 標準のbuttonタグが持つ属性に加えて、childrenも受け取れるようにする
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
