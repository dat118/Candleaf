"use client";

import React, { ReactNode } from "react";
import {
  TextField,
  StandardTextFieldProps,
  InputProps,
  InputClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import clsx from "clsx";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type FieldErrorMessage =
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>;

type AppInputProps = StandardTextFieldProps & {
  InputProps?: InputProps & {
    classes?: InputClasses;
  };
  helperText?: FieldErrorMessage | undefined | ReactNode;
};

export default function AppInput({
  InputProps = {},
  helperText,
  ...otherProps
}: AppInputProps) {
  const { classes: inputClasses, ...otherInputProps } = InputProps;

  return (
    <StyledInput
      helperText={helperText}
      InputProps={{
        classes: {
          ...inputClasses,
          root: clsx("root-input", inputClasses?.root),
          input: clsx("input", inputClasses?.input),
          disabled: clsx("disable", inputClasses?.disabled),
          focused: clsx("focus", inputClasses?.focused),
          error: clsx("error", inputClasses?.error),
        },
        ...otherInputProps,
      }}
      {...otherProps}
    />
  );
}

const StyledInput = styled(TextField)(({ theme }: any) => {
  return {
    ".root-input": {
      padding: "7px 17px",
      border: `0.5px solid ${theme.palette.grey[100]}`,
      height: 40,
      borderRadius: 0,
      backgroundColor: theme.palette.common.white,
    },
    ".input": {
      ...theme.typography.body2,
      color: "#616161",
      fontSize: 14,
      padding: 0,
      height: 26,

      "&::placeholder": {
        color: "#616161",
      },
    },
  };
});
