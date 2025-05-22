import { forwardRef } from 'react';
import { UnstyledButton, Loader, Image } from "@mantine/core"
import { IconTrash } from '@tabler/icons-react';
import classes from './Button.module.css'
import React from 'react'

interface ButtonProps {
  onClick?: () => void;
  isDisabled?: boolean;
  text?: string;
  icon?: React.ReactNode; // This will accept any React element including an Image component
}

export const EditButton1 = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        className={classes.edit_btn}
        onClick={onClick}
      >
        <Image src="/edit.png" alt="Edit" w="1.3rem" />
      </UnstyledButton>
    )
  }
)

export const EditButton2 = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        className={classes.edit_btn2}
        onClick={onClick}
      >
        <Image src="/edit.png" alt="Edit" w="1.3rem" />
      </UnstyledButton>
    )
  }
)

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, icon, text }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        className={classes.primary_btn}
        onClick={onClick}
      >
        {icon} {text ?? ''}
      </UnstyledButton>
    );
  }
);

export const DeleteButton1 = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, isDisabled }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        className={classes.delete_btn}
        onClick={onClick}
        disabled={isDisabled}
      >
        <IconTrash size="1.1rem" />
      </UnstyledButton>
    );
  }
);

export const LoaderButton1 = () => {
  return (
    <UnstyledButton
      className={classes.loader_btn}
      disabled
    >
      <Loader size="1.1rem" color="white"/>
    </UnstyledButton>
  );
}


export const SaveButton1 = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, text }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        type="submit"
        className={classes.save_btn1}
        onClick={onClick}
      >
        {text ?? 'Save'}
      </UnstyledButton>
    );
  }
);
