import { IMaskInput } from "react-imask";
import styles from "../../styles/input.module.scss";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function PhoneInput(props: inputProps) {
  return (
    <div className={styles.inputGroup}>
      <IMaskInput
        className={styles.input}
        mask="(00) 00000-0000"
        placeholder="&nbsp;"
        {...props}
      />

      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
    </div>
  );
}
