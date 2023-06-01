"use client";

import styled from "@emotion/styled";
import { BGImage } from "@/assets/images";
import { Typography } from "@mui/material";
import AppButton from "@/components/common/AppButton";

const Welcome = () => {
  return (
    <StyledHomeWelcome>
      <div className="background">
        <div className="card">
          <Typography variant="h1" align="center">
            🌱
          </Typography>
          <Typography variant="h1" align="center">
            The nature candle
          </Typography>
          <Typography variant="h5" align="center">
            All handmade with natural soy wax, Candleaf is a companion for all
            your pleasure moments
          </Typography>
          <AppButton center classes="button">
            Discovery our collection
          </AppButton>
        </div>
      </div>
    </StyledHomeWelcome>
  );
};

export default Welcome;

const StyledHomeWelcome = styled("div")(({ theme }: any) => {
  return {
    ".background": {
      backgroundImage: `url(${BGImage.src})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "710px",
      width: "100%",
      position: "relative",
    },
    ".card": {
      background: "rgba(247, 248, 250, 0.8)",
      backdropFilter: "blur(2px)",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "2px",
      padding: "33px 58px 63px 58px",
      display: "flex",
      flexDirection: "column",
      minWidth: 346,

      [theme.breakpoints.down("md")]: {
        padding: "33px 20px 63px 20px",
      },
    },
    ".button": {
      marginTop: "45px",
      fontSize: "18px !important",
    },
  };
});
