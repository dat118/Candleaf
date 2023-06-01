"use client";

import styled from "@emotion/styled";
import CardProduct from "./components/CardProduct";
import { Container, Typography, Grid, Box } from "@mui/material";
import { useGetProductsQuery } from "@/redux/services/productApi";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks";
import AppButton from "@/components/common/AppButton";

const PopularProduct = () => {
  const { data, error } = useGetProductsQuery({ type: "popular" });

  const [products, setProducts] = useState(data);

  const [isShown, setIsShown] = useState(false);

  const isTablet = useResponsive("down", "md");

  useEffect(() => {
    if (!isShown && isTablet) {
      setProducts(data?.slice(0, 4));
    } else setProducts(data);
  }, [isShown, data, isTablet]);
  return (
    <StyledPopularProduct>
      <Container className="app-container">
        <Typography variant="h1">Popular</Typography>
        <Typography
          variant="h4"
          sx={{ fontSize: "18px", color: "#5E6E89", marginTop: "15px" }}
        >
          Our top selling product that you may like
        </Typography>
        {!data || data?.length === 0 || error ? (
          <Typography variant="h3" sx={{ color: "#5E6E89", marginTop: "15px" }}>
            No data to display
          </Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {products?.map((item, index) => (
                <Grid key={index} item sm={12} md={6} lg={3}>
                  <Box className="center-root product-container">
                    <CardProduct
                      productImage={item.image}
                      productName={item.title}
                      price={item.price}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            {isTablet && data.length > 4 && (
              <AppButton
                sx={{ marginTop: "80px" }}
                onClick={() => setIsShown(!isShown)}
              >
                {isShown ? "Shorten" : "See more"}
              </AppButton>
            )}
          </>
        )}
      </Container>
    </StyledPopularProduct>
  );
};

export default PopularProduct;

const StyledPopularProduct = styled("div")(({ theme }: any) => {
  return {
    backgroundColor: theme.palette.common.white,

    ".app-container": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "90px 42px 70px 42px",

      [theme.breakpoints.down("sm")]: {
        padding: "20px 21px 21px 30px",
      },
      ".product-container": {
        [theme.breakpoints.down("md")]: {
          height: 150,
          marginTop: 0,
        },
      },
    },
  };
});
