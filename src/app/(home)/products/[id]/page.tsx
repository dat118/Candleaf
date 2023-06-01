"use client";

import styled from "@emotion/styled";
import {
  Container,
  Typography,
  Box,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import Image from "next/image";
import ChooseDeliveryType from "../components/ChooseDeliveryType";
import { AppButton, CartButton } from "@/components/common";
import { CartIcon } from "@/components/icons";
import { useResponsive } from "@/hooks";
import { useState } from "react";
import { addItem } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { DeliveryOptions, RecurringDelivery } from "@/app/models";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { data, error } = useGetProductByIdQuery({ id });
  const dispatch = useAppDispatch();
  const isTablet = useResponsive("down", "md");

  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState({
    deliveryOption: DeliveryOptions.Subscribe,
    subscribeTime: RecurringDelivery.OneWeek,
  });

  const handleOnCloseSnackbar = () => {
    setIsOpenSnackbar(false);
  };

  const handleAddToCart = () => {
    if (data) {
      dispatch(
        addItem({
          product: {
            id: data.id.toString(),
            title: data.title,
            price: data.price,
            image: data.image,
            apiID: data.apiID,
          },
          quantity,
          type: deliveryOption,
        })
      );
      setIsOpenSnackbar(true);
    }
  };

  return (
    <StyledProduct>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpenSnackbar}
        onClose={handleOnCloseSnackbar}
      >
        <Alert
          onClose={handleOnCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {`${data?.title} is added to cart successfully`}
        </Alert>
      </Snackbar>
      <Container maxWidth="lg" className="app-container space-between-root">
        {error && (
          <Typography align="center" variant="h1">
            Somethings went wrong !!!
          </Typography>
        )}
        <Stack spacing={2} className="image center-root">
          {isTablet && (
            <Typography variant="h3" sx={{ position: "relative" }}>
              {data?.title}
              <span className="r-icon">®</span>
            </Typography>
          )}
          {data?.image && (
            <Image width={500} height={400} src={data?.image} alt={""} />
          )}
          {!isTablet && (
            <>
              <Typography align="center" variant="h4">
                All hand-made with natural soy wax, Candleaf is made for your
                pleasure moments.
              </Typography>
              <Typography align="center" variant="h4" color="primary.main">
                🚚 FREE SHIPPING
              </Typography>
            </>
          )}
        </Stack>
        <Box flexDirection="column" className="info">
          {!isTablet && (
            <Typography variant="h3" sx={{ position: "relative" }}>
              {data?.title}
              <span className="r-icon">®</span>
            </Typography>
          )}
          <Stack
            direction={isTablet ? "column" : "row"}
            className="price-container center-root"
          >
            <Stack direction={!isTablet ? "column" : "row"} spacing={3}>
              <Typography
                variant="h1"
                sx={{ fontWeight: 600, fontSize: 26, color: "primary.main" }}
              >{`$${data?.price}`}</Typography>
              <Stack direction="column" spacing={1}>
                <Typography variant="subtitle1">Quantity</Typography>
                <CartButton
                  quantity={quantity}
                  onIncrease={() => setQuantity(quantity + 1)}
                  onDecrease={() => setQuantity(quantity - 1)}
                />
              </Stack>
            </Stack>
            <Stack spacing={6}>
              <ChooseDeliveryType
                onChangeDeliveryType={(deliveryOption, subscribeTime) => {
                  setDeliveryOption({ deliveryOption, subscribeTime });
                }}
              />
              <AppButton
                sx={{ width: "100%", marginBottom: "40px" }}
                onClick={handleAddToCart}
              >
                <CartIcon sx={{ fontSize: 22, marginRight: "10px" }} />
                Add to cart
              </AppButton>
            </Stack>
          </Stack>

          <Stack spacing={1} direction="column" className="ingredient">
            <Typography variant="body1" className="typography">
              <span className="wax">Wax:</span>
              Top grade Soy wax that delivers a smoke less, consistent burn
            </Typography>

            <Typography variant="body1" className="typography">
              <span className="wax">Fragrance: </span>
              Premium quality ingredients with natural essential oils
            </Typography>
            <Stack spacing={0.5} direction={isTablet ? "column" : "row"}>
              <Typography variant="body1" className="typography">
                <span className="wax"> Burning Time: </span>
                70-75 hours
              </Typography>
              <Typography variant="body1" className="typography">
                <span className="wax"> Dimension: </span>
                10cm x 5cm
              </Typography>
              <Typography variant="body1" className="typography">
                <span className="wax"> Weight: </span>
                400g
              </Typography>
            </Stack>
          </Stack>
          {isTablet && (
            <>
              <Typography
                align="center"
                variant="h4"
                sx={{ marginTop: "35px" }}
              >
                All hand-made with natural soy wax, Candleaf is made for your
                pleasure moments.
              </Typography>
              <Typography align="center" variant="h4" color="primary.main">
                🚚 FREE SHIPPING
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </StyledProduct>
  );
};

export default ProductDetail;

const StyledProduct = styled("div")(({ theme }: any) => {
  return {
    backgroundColor: theme.palette.common.white,

    ".app-container": {
      display: "flex",
      width: "100%",
      padding: "90px 42px 125px 42px",

      [theme.breakpoints.down("md")]: {
        padding: "90px 21px 63px 30px",
        flexDirection: "column",
      },
    },
    ".image": {
      width: "50%",

      [theme.breakpoints.down("lg")]: {
        width: "100%",
      },
    },
    ".r-icon": {
      fontSize: 12,
      fontWeight: 900,
      position: "absolute",
      top: -2,
    },
    ".info": {
      width: "50%",

      [theme.breakpoints.down("lg")]: {
        width: "100%",
      },
    },
    ".ingredient": {
      padding: "22px",
      border: "1px solid #E6E6E6",
      borderRadius: 7,
    },
    ".wax": {
      fontWeight: 800,
      color: theme.palette.common.black,
      marginRight: "5px",
    },
    ".price-container": {
      display: "flex",
      justifyContent: "space-between",
    },
    ".typography": {
      lineHeight: "24px",
      color: "#849A8E",
      fontSize: 15,
    },
  };
});
