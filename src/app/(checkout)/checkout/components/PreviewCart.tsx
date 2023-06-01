"use client";

import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";
import AppButton from "@/components/common/AppButton";
import { useAppSelector } from "@/redux/hooks";
import CartItem from "./CartItem";
import { useState } from "react";
import { AppInput } from "@/components/common";
const PreviewCart = () => {
  const cart = useAppSelector((state) => state.persistedReducer.CartReducer);
  const [couponCode, setCouponCode] = useState("");

  const handleChangeCouponCode = (event: any) => {
    setCouponCode(event.target.value);
  };

  return (
    <StyledCart>
      <Box className="app-container">
        <Box>
          {cart.items.map((item, index) => (
            <CartItem
              key={index}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </Box>
        <Box
          className="coupon-code"
          sx={{
            padding: "28px 0",
            borderBottom: "1px solid rgba(86, 178, 128, 0.2)",
          }}
        >
          <AppInput
            placeholder="Coupon Code"
            value={couponCode}
            onChange={handleChangeCouponCode}
            sx={{
              width: 265,
              marginBottom: { xs: "20px", sm: "20px", md: 0 },
              marginRight: { sm: 0, md: "15px" },
            }}
          />
          <AppButton disabled={couponCode === ""}>Add code</AppButton>
        </Box>
        <Box className="space-between-root" sx={{ padding: "15px 0 0" }}>
          <Typography
            variant="h4"
            sx={{ fontSize: 14, color: "#616161", fontWeight: 600 }}
          >
            Shipping
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: 14, color: "#616161", fontWeight: 600 }}
          >
            Free Shipping
          </Typography>
        </Box>
        <Box className="space-between-root" sx={{ padding: "15px 0 0" }}>
          <Typography
            variant="h4"
            sx={{ fontSize: 14, color: "#616161", fontWeight: 600 }}
          >
            Total
          </Typography>
          <Typography variant="h4" sx={{ fontSize: 24, fontWeight: 600 }}>
            ${cart.totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </StyledCart>
  );
};

export default PreviewCart;

const StyledCart = styled("div")(({ theme }: any) => {
  return {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      alignItems: "center",
    },
    ".app-container": {
      display: "flex",
      flexDirection: "column",
      padding: "90px 42px 70px 42px",
      maxWidth: 560,

      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
        flexDirection: "column",
      },
    },
    ".coupon-code": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
        flexDirection: "column",
      },
    },
  };
});
