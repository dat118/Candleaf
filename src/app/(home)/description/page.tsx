"use client";

import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import AppButton from "@/components/common/AppButton";
import { CheckIcon } from "@/components/icons";
import { CandleImage } from "@/assets/images";
import { useResponsive } from "@/hooks";
import Image from "next/image";

const PRODUCT_DETAIL = [
  {
    title: "Eco-sustainable:",
    description: "All recyclable materials, 0% CO2 emissions",
  },
  {
    title: "Hyphoallergenic:",
    description: "100% natural, human friendly ingredients",
  },
  {
    title: "Handmade:",
    description: "All candles are craftly made with love.",
  },
  {
    title: "Long burning:",
    description: " No more waste. Created for last long.",
  },
];

const Description = () => {
  const isTablet = useResponsive("down", "lg");

  return (
    <StyledHomeDescription>
      <Container className="container">
        <div className="title">
          <Typography
            variant={isTablet ? "h3" : "h2"}
            align={isTablet ? "center" : "left"}
          >
            Clean and
          </Typography>
          <Typography
            variant={isTablet ? "h3" : "h2"}
            align={isTablet ? "center" : "left"}
          >
            fragrant soy wax
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: "15px 0 38px" }}
            color="primary.main"
          >
            Made for your home and for your wellness
          </Typography>
        </div>
        <div className="flex-card">
          <div className="description">
            {PRODUCT_DETAIL.map((item, index) => (
              <Box display="flex" alignItems="center" key={index}>
                <CheckIcon />
                <Typography className="typo" variant="subtitle2" align="center">
                  {item.title}
                </Typography>
                <Typography variant="body1" align="center">
                  {item.description}
                </Typography>
              </Box>
            ))}
            <AppButton center={isTablet} classes="button">
              Learn more
            </AppButton>
          </div>
          <div className="image-container">
            <Image className="image" src={CandleImage} alt="Candle" />
          </div>
        </div>
      </Container>
    </StyledHomeDescription>
  );
};

export default Description;

const StyledHomeDescription = styled("div")(({ theme }: any) => {
  return {
    backgroundColor: "#F7F8FA",
    ".container": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "133px 42px 209px 42px",

      [theme.breakpoints.down("md")]: {
        padding: "20px 21px 21px 30px",
      },
    },
    ".title": {
      width: "100%",

      [theme.breakpoints.down("lg")]: {
        width: "auto",
      },
    },
    ".flex-card": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      position: "relative",

      [theme.breakpoints.down("lg")]: {
        flexDirection: "column-reverse",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    ".image-container": {
      height: 377,
      width: 540,
      position: "absolute",
      top: -160,
      right: 0,
      backgroundColor: theme.palette.common.white,

      [theme.breakpoints.down("lg")]: {
        position: "inherit",
        top: 0,
        height: 241,
        width: 325,
        marginBottom: "45px",
      },
    },
    ".image": {
      height: "auto",
      width: "100%",
    },
    ".typo": {
      fontWeight: 900,
      marginLeft: "10px",
      whiteSpace: "nowrap",
    },
    ".button": {
      marginTop: "68px",
    },
  };
});
