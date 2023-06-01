"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import CardProduct from "./components/CardProduct";
import { Container, Typography, Grid, Box } from "@mui/material";
import { useGetProductsQuery } from "@/redux/services/productApi";
import { useResponsive } from "@/hooks";
import AppButton from "@/components/common/AppButton";
import Link from "next/link";

const Product = () => {
  const { data, error } = useGetProductsQuery(null);

  const [products, setProducts] = useState(data);

  const [isShown, setIsShown] = useState(false);

  const isTablet = useResponsive("down", "md");

  useEffect(() => {
    if (!isShown && isTablet) {
      setProducts(data?.slice(0, 4));
    } else setProducts(data);
  }, [isShown, data, isTablet]);

  return (
    <StyledProduct>
      <Container className="app-container">
        <Typography variant="h1">Products</Typography>
        <Typography
          variant="h4"
          sx={{ fontSize: "18px", color: "#5E6E89", marginTop: "15px" }}
        >
          Order it for you or for your beloved ones
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
                    <Link href={`/products/${item.id}`}>
                      <CardProduct
                        productImage={item.image}
                        productName={item.title}
                        price={item.price}
                      />
                    </Link>
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
    </StyledProduct>
  );
};

export default Product;

const StyledProduct = styled("div")(({ theme }: any) => {
  return {
    backgroundColor: theme.palette.common.white,

    ".app-container": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "90px 42px 125px 42px",

      [theme.breakpoints.down("md")]: {
        padding: "34px 21px 63px 30px",
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
