import { forwardRef } from 'react';
import { UnstyledButton } from "@mantine/core"
import classes from './Button.module.css'
import React from 'react'

interface ButtonProps {
  onClick?: () => void;
  icon: React.ReactNode; // This will accept any React element including an Image component
}

export const EditButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, icon }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        className={classes.edit_btn}
        onClick={onClick || (() => console.log('Edit clicked'))}
      >
        {icon}
      </UnstyledButton>
    )
  }
)
  
export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, icon }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        className={classes.primary_btn}
        onClick={onClick || (() => console.log('Add btn clicked'))}
      >
        {icon}
      </UnstyledButton>
    );
  }
);
