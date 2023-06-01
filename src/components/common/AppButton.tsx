"use client";

import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@mui/material";
import styled from "@emotion/styled";

type AppButtonProps = ButtonProps & {
  classes?: string;
  center?: boolean;
  disabled?: boolean;
  children?: ReactNode;
};

export default function AppButton({
  classes,
  children,
  center,
  disabled,
  ...otherProps
}: AppButtonProps) {
  return (
    <StyledButton center={center} disabled={disabled}>
      <Button className={`app-button ${classes}`} {...otherProps}>
        {children}
      </Button>
    </StyledButton>
  );
}

const StyledButton = styled("div")(({ theme, center, disabled }: any) => {
  return {
    display: "flex",
    justifyContent: center ? "center" : "flex-start",
    alignItems: "center",

    ".app-button": {
      ...theme.typography.h4,
      backgroundColor: disabled
        ? theme.palette.grey[500]
        : theme.palette.primary.main,
      color: theme.palette.common.white,
      padding: "8px 44px",
      textTransform: "none",

      ":hover": {
        backgroundColor: disabled
          ? theme.palette.grey[500]
          : theme.palette.primary.main,
      },
    },
  };
});
