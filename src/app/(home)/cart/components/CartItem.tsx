"use client";

import styled from "@emotion/styled";
import { Typography, Grid, Box, Stack } from "@mui/material";
import Image from "next/image";
import { CartButton } from "@/components/common";
import { useResponsive } from "@/hooks";

type CartItemProps = {
  product: { id: string; title: string; price: number; image: string };
  quantity: number;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  onDecreaseItem: (id: string) => void;
};

const CartItem = ({
  product,
  quantity,
  onRemoveItem,
  onAddItem,
  onDecreaseItem,
}: CartItemProps) => {
  const isTablet = useResponsive("down", "md");

  const handleRemoveItem = () => {
    onRemoveItem(product.id);
  };

  const handleIncreaseItem = () => {
    onAddItem();
  };

  const handleDecreaseItem = () => {
    onDecreaseItem(product.id);
  };

  return (
    <StyledCartItem>
      <Box className="card-container">
        <Box sx={{ width: isTablet ? "70" : "60%" }}>
          <Stack direction="row" spacing={3.5}>
            <Image
              width={isTablet ? 80 : 160}
              height={isTablet ? 60 : 120}
              src={product.image}
              alt=""
            />
            <Stack spacing={1}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { sm: 20, md: 26 },
                  lineHeight: { sm: "24px", md: "57px" },
                }}
              >
                {product.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={handleRemoveItem}
              >
                Remove
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          className="price-container space-between-root"
          sx={{ width: isTablet ? "30" : "40%" }}
        >
          <Typography variant="h4" sx={{ fontSize: 18 }}>
            ${product.price}
          </Typography>
          {isTablet && (
            <Typography variant="subtitle2" sx={{ marginTop: "35px" }}>
              Quantity
            </Typography>
          )}
          <CartButton
            quantity={quantity}
            onIncrease={handleIncreaseItem}
            onDecrease={handleDecreaseItem}
          />
          {!isTablet && (
            <Typography variant="h4" sx={{ fontSize: 18 }}>
              ${(product.price * quantity).toFixed(2)}
            </Typography>
          )}
        </Box>
      </Box>
    </StyledCartItem>
  );
};

export default CartItem;

const StyledCartItem = styled("div")(({ theme }: any) => {
  return {
    width: "100%",
    backgroundColor: theme.palette.common.white,
    ".card-container": {
      padding: "32px 0 28px",
      borderBottom: "1px solid #E5E5E5",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    ".price-container": {
      flexDirection: "row",

      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
  };
});
