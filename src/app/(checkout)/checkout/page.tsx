"use client";

import styled from "@emotion/styled";
import DetailForm from "./components/DetailForm";
import { Badge, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import {
  BillingAddress,
  CheckoutState,
  FormState,
  ShippingMethod,
} from "../../models";
import ShippingForm from "./components/ShippingForm";
import PaymentForm from "./components/PaymentForm";
import PreviewCart from "./components/PreviewCart";
import { resetCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useResponsive } from "@/hooks";
import { Logo } from "@/assets/images";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, CartIcon } from "@/components/icons";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY || "");

const STEPS = [
  { value: CheckoutState.Cart, label: "Cart", icon: <ArrowRightIcon /> },
  { value: CheckoutState.Detail, label: "Details", icon: <ArrowRightIcon /> },
  {
    value: CheckoutState.Shipping,
    label: "Shipping",
    icon: <ArrowRightIcon />,
  },
  { value: CheckoutState.Payment, label: "Payment" },
];

const Checkout = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.persistedReducer.CartReducer);
  const items = cart.items.map((item) => ({
    price: item.product.apiID,
    quantity: item.quantity,
  }));
  const [isShowCart, setIsShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutState>(
    CheckoutState.Detail
  );
  const isTablet = useResponsive("down", "md");
  const [checkoutInfo, setCheckoutInfo] = useState<FormState>({
    phoneEmail: "",
    name: "",
    secondName: "",
    addressNumber: "",
    city: "",
    postalCode: "",
    discount: true,
    country: 0,
    province: 0,
    saveInfo: false,
    note: "",
    shippingMethod: ShippingMethod.Standard,
    cardNumber: "",
    holderName: "",
    expireDate: "/",
    cvv: "",
    VATNumber: "",
    PEC: "",
    billingAddress: BillingAddress.SameAddress,
  });

  const handleShowCart = () => {
    setIsShowCart(true);
  };

  const handleBackToDetail = () => {
    setCheckoutStep(CheckoutState.Detail);
  };

  const handleBackToShipping = () => {
    setCheckoutStep(CheckoutState.Shipping);
  };

  const handleSubmitDetailForm = (data: any) => {
    setCheckoutInfo({ ...checkoutInfo, ...data });
    setCheckoutStep(CheckoutState.Shipping);
  };

  const handleSubmitShippingForm = (data: any) => {
    setCheckoutInfo({ ...checkoutInfo, ...data });
    setCheckoutStep(CheckoutState.Payment);
  };

  const handleSubmitPaymentForm = async (data: any) => {
    setCheckoutInfo({ ...data });
    const stripe = await stripePromise;

    await stripe?.redirectToCheckout({
      mode: "payment",
      lineItems: items,
      successUrl: "http://localhost:3000/",
      cancelUrl: "http://localhost:3000/checkout",
    });

    dispatch(resetCart());
  };

  const renderForm = () => {
    switch (checkoutStep) {
      case CheckoutState.Detail:
        return (
          <DetailForm
            onSubmitForm={handleSubmitDetailForm}
            data={checkoutInfo}
          />
        );
      case CheckoutState.Shipping:
        return (
          <ShippingForm
            onBackToDetail={handleBackToDetail}
            onSubmitForm={handleSubmitShippingForm}
            data={checkoutInfo}
          />
        );
      case CheckoutState.Payment:
        return (
          <PaymentForm
            onBackToShipping={handleBackToShipping}
            onSubmitForm={handleSubmitPaymentForm}
            data={checkoutInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isTablet && (
        <Box
          className="space-between-root"
          sx={{
            padding: "30px 15px",
            backgroundColor: "#F2F2F2",
            position: "absolute",
            top: 110,
            width: "100%",
          }}
        >
          <Box className="right-icon center-root">
            <Badge badgeContent={cart.items.length} color="primary">
              {<CartIcon sx={{ fontSize: 25 }} />}
            </Badge>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "primary.main", cursor: "pointer" }}
            onClick={handleShowCart}
          >
            See your order details
          </Typography>
          <Typography variant="h4" sx={{ fontSize: 24, fontWeight: 600 }}>
            ${cart.totalPrice}
          </Typography>
        </Box>
      )}
      <StyledCheckout>
        <Box className="form-container">
          <Box className="logo-container">
            <Box>
              <Link href="/">
                <Box display="flex" alignItems="center">
                  <Image src={Logo} alt="Candleaf" className="logo" />
                  <Typography className="brand-name">Candleaf</Typography>
                </Box>
              </Link>

              <Stack
                direction="row"
                spacing={1.25}
                sx={{
                  marginBottom: "28px",
                  marginTop: { xs: "120px", sm: "120px", md: "24px" },
                }}
              >
                {STEPS.map((item, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                      onClick={() => {
                        setCheckoutStep(item.value);
                      }}
                      color={
                        checkoutStep === item.value
                          ? "common.black"
                          : checkoutStep > item.value
                          ? "primary.main"
                          : "#616161"
                      }
                    >
                      {item.label}
                    </Typography>
                    {item.icon}
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Box>
          {renderForm()}
        </Box>

        <Box className="cart-container">
          {(!isTablet || isShowCart) && <PreviewCart />}
        </Box>
      </StyledCheckout>
    </>
  );
};

export default Checkout;

const StyledCheckout = styled("div")(({ theme }: any) => {
  return {
    backgroundColor: theme.palette.common.white,
    display: "flex",
    justifyContent: "end",

    [theme.breakpoints.down("md")]: {
      padding: "20px 15px 60px",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    ".logo-container": {
      backgroundColor: theme.palette.common.white,
      display: "flex",
      alignItems: "center",
      padding: "24px",

      [theme.breakpoints.down("md")]: {
        width: "100%",
        justifyContent: "center",
      },
    },
    ".form-container": {
      width: "50%",
      padding: "20px 42px 100px 42px",
      maxWidth: 650,

      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: "20px 15px 60px",
      },
    },
    ".cart-container": {
      width: "50%",
      backgroundColor: "#F2F2F2",

      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    ".logo": {
      width: 34,
      height: 34,
      marginRight: 6,
    },
    ".brand-name": {
      color: theme.palette.primary.main,
      lineHeight: "15px",
      fontWeight: 900,
    },
  };
});
