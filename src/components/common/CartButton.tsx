"use client";

import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";

type CartButtonProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const CartButton = ({ quantity, onIncrease, onDecrease }: CartButtonProps) => {
  const handleIncrease = () => {
    onIncrease();
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onDecrease();
    }
  };

  return (
    <StyledCartButton className="center-root">
      <IconButton onClick={handleIncrease}>
        <AddIcon className="icon" />
      </IconButton>
      <Typography variant="body1">{quantity}</Typography>
      <IconButton onClick={handleDecrease} disabled={quantity === 1}>
        <RemoveIcon className="icon" />
      </IconButton>
    </StyledCartButton>
  );
};

export default CartButton;

const StyledCartButton = styled("div")(({ theme }: any) => {
  return {
    height: 30,
    width: 75,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "3px 7px",
    ".icon": {
      fontSize: 18,
      color: theme.palette.primary.main,
    },
  };
});
