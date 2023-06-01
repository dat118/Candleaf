"use client";

import styled from "@emotion/styled";
import { Box, Container, Skeleton, Stack } from "@mui/material";

export default function Loading() {
  return (
    <StyledProduct>
      <Container maxWidth="lg" className="app-container space-between-root">
        <Skeleton variant="rectangular" width={540} height={433} />

        <Box flexDirection="column" className="info">
          <Stack className="price-container" spacing={2}>
            <Skeleton variant="rectangular" width={200} height={40} />
            <Skeleton variant="rectangular" width={540} height={160} />
            <Skeleton variant="rectangular" width={540} height={160} />
          </Stack>
        </Box>
      </Container>
    </StyledProduct>
  );
}
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

    ".info": {
      width: "50%",

      [theme.breakpoints.down("lg")]: {
        width: "100%",
      },
    },

    ".price-container": {
      display: "flex",
      justifyContent: "space-between",
    },
  };
});
