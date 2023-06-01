"use client";

import styled from "@emotion/styled";
import { Container, Typography, Box } from "@mui/material";
import { useResponsive } from "@/hooks";
import AppButton from "@/components/common/AppButton";
import Link from "next/link";
import CartItem from "./components/CartItem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItem, removeItem, decreaseItem } from "@/redux/features/cartSlice";

const Cart = () => {
  const isTablet = useResponsive("down", "md");
  const cart = useAppSelector((state) => state.persistedReducer.CartReducer);
  const dispatch = useAppDispatch();
  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleAddItem = (product: any, type: any) => {
    dispatch(addItem({ product, quantity: 1, type: type }));
  };

  const handleDecreaseItem = (id: string) => {
    dispatch(decreaseItem(id));
  };

  return (
    <StyledCart>
      <Container className="app-container">
        <Box className="center-root-column">
          <Typography variant="h1" sx={{ fontSize: 26 }}>
            Your cart items
          </Typography>
          <Link href="/">
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                margin: "15px 0 60px",
                textDecoration: "underline",
              }}
            >
              Back to shopping
            </Typography>
          </Link>
        </Box>
        {cart.items.length === 0 ? (
          <Typography variant="h1">
            Your cart is empty, go shopping now !!
          </Typography>
        ) : (
          <Box className="header-container space-between-root">
            <Box sx={{ width: "60%" }}>
              <Typography variant="subtitle2">Product</Typography>
            </Box>
            <Box
              className="space-between-root"
              sx={{ width: "40%" }}
              display="flex"
              flexDirection={isTablet ? "row-reverse" : "inherit"}
            >
              <Typography variant="subtitle2">Price</Typography>

              {!isTablet && (
                <>
                  <Typography variant="subtitle2">Quantity</Typography>
                  <Typography variant="subtitle2">Total</Typography>
                </>
              )}
            </Box>
          </Box>
        )}
        {cart.items.map((item) => (
          <CartItem
            key={item.product.id}
            product={{
              id: item.product.id,
              title: item.product.title,
              price: item.product.price,
              image: item.product.image,
            }}
            quantity={item.quantity}
            onRemoveItem={() => handleRemoveItem(item.product.id)}
            onAddItem={() => handleAddItem(item.product, item.type)}
            onDecreaseItem={() => handleDecreaseItem(item.product.id)}
          />
        ))}
        <Box display="flex" className="total-price" sx={{ marginTop: "42px" }}>
          <Link href="/checkout">
            <AppButton>Check-out</AppButton>
          </Link>
          <Box sx={{ marginRight: { sm: 0, md: "70px" } }}>
            <Box
              display="flex"
              flexDirection="row-reverse"
              className={isTablet ? "center-root" : ""}
            >
              <Typography variant="h4" sx={{ marginLeft: "40px" }}>
                ${cart.totalPrice.toFixed(2)}
              </Typography>
              <Typography variant="h4">Sub-total</Typography>
            </Box>
            <Typography
              variant="body1"
              color="#9E9E9E"
              sx={{ margin: "10px 0" }}
            >
              Tax and shipping cost will be calculated later
            </Typography>
          </Box>
        </Box>
      </Container>
    </StyledCart>
  );
};

export default Cart;

const StyledCart = styled("div")(({ theme }: any) => {
  return {
    backgroundColor: theme.palette.common.white,

    ".app-container": {
      display: "flex",
      flexDirection: "column",
      padding: "90px 42px 70px 42px",

      [theme.breakpoints.down("sm")]: {
        padding: "20px 21px 21px 30px",
      },
    },
    ".header-container": {
      padding: "0 0 15px",
      borderBottom: "1px solid #E5E5E5",
      width: "100%",
      display: "flex",
    },
    ".total-price": {
      display: "flex",
      flexDirection: "row-reverse",

      [theme.breakpoints.down("md")]: {
        flexDirection: "column-reverse",
        alignItems: "center",
      },
    },
  };
});
