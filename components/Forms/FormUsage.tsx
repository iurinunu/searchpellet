import React from "react";
import Form from "./Form";
import FormInput from "./FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from './FormUsage.module.scss'

// interface for form
interface EmailInterface {
  email: string;
  password: string;
}

// validation
const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .max(32, "Max password length is 32")
    .required("Password is required")
});

const FormUsage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(EmailSchema) });

  const onSubmit = (data: EmailInterface) => console.log(data);
  return (
    <Form
      buttonLabel="Change Email"
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      className={styles.formContainer}
    >
      <FormInput
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        autoFocus
        wrapperClass="defaultInput"
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        error={errors.password?.message}
        wrapperClass="defaultInput"
      />
    </Form>
  );
};

export default FormUsage;