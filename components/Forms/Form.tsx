import { Button } from "@chakra-ui/react";
import React, { FC, createElement } from "react";
import { ReactNode } from "react";

export type classNameType = string;
export type childrenType = ReactNode;

export interface IFormProps {
  defaultValues?: any;
  children?: childrenType;
  buttonLabel?: string;
  onSubmit?: any;
  handleSubmit?: any;
  register?: any;
  className?: classNameType;
}

const Form: FC<IFormProps> = ({
  defaultValues,
  buttonLabel = "Submit",
  children,
  onSubmit,
  handleSubmit,
  register,
  ...rest
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <div className="d-flex justify-content-center fields__email">
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? createElement(child.type, {
                    ...{
                      ...child.props,
                      register,
                      key: child.props.name
                    }
                  })
                : child;
            })
          : children}
      </div>

      <Button 
        type='submit'
        marginLeft='1rem'
        marginBottom='1rem'
        backgroundColor="primary"
        fontWeight="medium"
        color="white"
        _hover={{ bg: 'gray.500' }}
        _active={{
            bg: 'gray.400',
            transform: 'scale(0.95)'
        }}>{buttonLabel}</Button>
    </form>
  );
};

export default Form;