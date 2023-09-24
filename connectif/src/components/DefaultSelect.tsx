import { ReactNode } from "react";
import styles from "../../styles/select.module.scss";

interface selectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export default function DefaultSelect(props: selectProps) {
  return (
    <div className={styles.inputGroup}>
      <select className={styles.input} {...props}>
        {props.children}
      </select>
    </div>
  );
}
