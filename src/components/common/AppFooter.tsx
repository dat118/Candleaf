"use client";

import Link from "next/link";
import { Box, Container, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import { FooterLogo } from "@/assets/images";

const DISCOVERY = [
  { title: "New season", link: "/" },
  { title: "Most searched", link: "/" },
  { title: "Most sold", link: "/" },
];
const ABOUT = [
  { title: "Help", link: "/" },
  { title: "Shipping", link: "/" },
  { title: "Affiliate", link: "/" },
];
const INFO = [
  { title: "Contact us", link: "/" },
  { title: "Privacy Policies", link: "/" },
  { title: "Terms & Conditions", link: "/" },
];

const Footer = () => {
  return (
    <StyledFooter>
      <Container className="container" maxWidth="lg">
        <Box className="white-line"></Box>
        <Box className="flex-container">
          <Box sx={{ width: { md: "100%", lg: "50%" }, marginBottom: "52px" }}>
            <Image src={FooterLogo} alt="Candleaf" />
            <Typography variant="body1">
              Your natural candle made for your home and for your wellness.
            </Typography>
          </Box>
          <Box
            sx={{ width: { md: "100%", lg: "50%" }, flexWrap: "wrap" }}
            display="flex"
            justifyContent="space-between"
          >
            <Stack spacing={1.5} direction="column" className="footer-info">
              <Typography variant="subtitle2" color="primary.main">
                Discovery
              </Typography>
              {DISCOVERY.map((item, index) => (
                <Link className="footer-link" href={item.link} key={index}>
                  {item.title}
                </Link>
              ))}
            </Stack>
            <Stack spacing={1.5} direction="column" className="footer-info">
              <Typography variant="subtitle2" color="primary.main">
                About
              </Typography>
              {ABOUT.map((item, index) => (
                <Link className="footer-link" href={item.link} key={index}>
                  {item.title}
                </Link>
              ))}
            </Stack>
            <Stack spacing={1.5} direction="column" className="footer-info">
              <Typography variant="subtitle2" color="primary.main">
                Info
              </Typography>
              {INFO.map((item, index) => (
                <Link className="footer-link" href={item.link} key={index}>
                  {item.title}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled("div")(({ theme }: any) => {
  return {
    backgroundColor: "#1a1a1a",
    color: theme.palette.common.white,
    padding: "60px 0 115px",

    [theme.breakpoints.down("md")]: {
      padding: "31px 0 85px",
    },

    ".flex-container": {
      display: "flex",
      flexDirection: "row",

      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
    ".white-line": {
      width: "100%",
      height: "1.5px",
      backgroundColor: theme.palette.common.white,
      marginBottom: "15px",
    },
    "footer-link": {
      ...theme.typography.subtitle2,
    },
    ".footer-info": {
      width: "33%",

      [theme.breakpoints.down("md")]: {
        width: "50%",
        marginBottom: "40px",
      },
    },
  };
});
