import { Input } from "@chakra-ui/react";
import React, { FC, InputHTMLAttributes } from "react";
import styles from './FormInput.module.scss'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: any;
  wrapperClass?: string;
  className?: string;
}

const FormInput: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  wrapperClass,
  ...rest
}) => {
  console.log('error');
  console.log(error);
  return (
    <div className={styles[`${wrapperClass}`]}>
      {label && <label htmlFor={name}>{label}</label>}
      <Input
        backgroundColor='gray.200'
        aria-invalid={error ? "true" : "false"}
        {...register(name)}
        {...rest}
      />
      {error && <div className={styles.error} role="alert">{error}</div>}
    </div>
  );
};

export default FormInput;