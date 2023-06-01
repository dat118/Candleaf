import { Badge, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

type CartItemProps = {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
};

const CartItem = ({ product, quantity }: CartItemProps) => {
  return (
    <StyledCartItem spacing={7.5} direction="row">
      <Badge badgeContent={quantity} color="primary">
        <Image
          width={164}
          height={130}
          src={product.image}
          alt=""
          className="image"
        />
      </Badge>
      <Stack>
        <Typography
          variant="body1"
          sx={{
            lineHeight: "37px",
            fontWeight: 800,
          }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "primary.main",
            fontSize: 21,
            fontWeight: 800,
          }}
        >
          ${product.price}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#616161",
          }}
        >
          Subtotal: ${product.price * quantity}
        </Typography>
      </Stack>
    </StyledCartItem>
  );
};

export default CartItem;

const StyledCartItem = styled(Stack)(({ theme }: any) => {
  return {
    padding: "28px 0 48px",
    borderBottom: "1px solid rgba(86, 178, 128, 0.2)",
    ".image": {
      backgroundColor: theme.palette.common.white,
    },
  };
});
