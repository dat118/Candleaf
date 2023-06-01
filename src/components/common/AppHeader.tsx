"use client";

import React, { useState } from "react";
import {
  Button,
  AppBar,
  Typography,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  Badge,
  Avatar,
  Popover,
} from "@mui/material";
import Image from "next/image";
import { logout } from "@/redux/features/authSlice";
import { Logo } from "@/assets/images";
import { UserIcon, CartIcon, ToggleIcon, CancelIcon } from "../icons";
import { useResponsive } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import Link from "next/link";

const Header = () => {
  const isTablet = useResponsive("down", "md");
  const cart = useAppSelector((state) => state.persistedReducer.CartReducer);
  const user = useAppSelector(
    (state) => state.persistedReducer.AuthenticationReducer
  );
  const dispatch = useAppDispatch();

  const [anchor, setAnchor] = useState(false);
  const [anchorElAvatar, setAnchorElAvatar] = useState<HTMLElement | null>(
    null
  );

  const handleOpenAvatar = (event: any) => {
    setAnchorElAvatar(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorElAvatar(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    setAnchorElAvatar(null);
  };
  return (
    <StyledHeader>
      <AppBar className="app-header">
        <Container className="app-container">
          {isTablet && !anchor && (
            <Box
              className="right-icon center-root"
              sx={{ marginRight: "20px" }}
              onClick={() => setAnchor(!anchor)}
            >
              {<ToggleIcon sx={{ fontSize: 25 }} />}
            </Box>
          )}
          {isTablet && anchor && (
            <Box
              className="right-icon center-root"
              sx={{ marginRight: "20px" }}
              onClick={() => setAnchor(!anchor)}
            >
              {<CancelIcon sx={{ fontSize: 25 }} />}
            </Box>
          )}

          <Drawer anchor="top" open={anchor} onClose={() => setAnchor(false)}>
            <List sx={{ marginTop: "75px" }}>
              {["Discovery", "About", "Contact Us"].map((text, index) => (
                <ListItem key={index} onClick={() => setAnchor(false)}>
                  <Box
                    sx={{
                      color: "common.black",
                      width: "100%",
                      fontSize: 24,
                      fontWeight: 400,
                      lineHeight: "28px",
                      textTransform: "none",
                      paddingLeft: "63px",
                      cursor: "pointer",
                    }}
                  >
                    {text}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Link href="/">
            <Box className="logo-container">
              <Image src={Logo} alt="Candleaf" className="logo" />
              <Typography className="brand-name">Candleaf</Typography>
            </Box>
          </Link>
          {!isTablet && (
            <Box className="tab-container">
              <Button
                variant="text"
                className={"app-button"}
                endIcon={<ExpandMoreIcon />}
              >
                Discovery
              </Button>
              <Button variant="text" className={"app-button"}>
                About
              </Button>
              <Button variant="text" className={"app-button"}>
                Contact Us
              </Button>
            </Box>
          )}

          <Box className="logo-container">
            {user.token ? (
              <>
                <Avatar
                  alt={user.email}
                  src={user.avatar}
                  sx={{ marginRight: "20px" }}
                  onClick={handleOpenAvatar}
                />
                <Popover
                  open={Boolean(anchorElAvatar)}
                  anchorEl={anchorElAvatar}
                  onClose={handleCloseAvatar}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Button onClick={handleLogout} variant="text" sx={{ p: 2 }}>
                    Logout
                  </Button>
                </Popover>
              </>
            ) : (
              <Link href="/login">
                <Box
                  className="right-icon center-root"
                  sx={{ marginRight: "20px" }}
                >
                  {<UserIcon sx={{ fontSize: 25 }} />}
                </Box>
              </Link>
            )}
            <Link href="/cart">
              <Box className="right-icon center-root">
                <Badge badgeContent={cart.items.length} color="primary">
                  {<CartIcon sx={{ fontSize: 25 }} />}
                </Badge>
              </Box>
            </Link>
          </Box>
        </Container>
      </AppBar>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled("div")(({ theme }: any) => {
  return {
    ".app-header": {
      height: 75,
      backgroundColor: theme.palette.common.white,
      border: "0.5px solid rgba(86, 178, 128, 0.2)",
      boxShadow: "none",
      zIndex: 1201,
    },
    ".logo": {
      width: 34,
      height: 34,
      marginRight: 6,
    },
    ".app-container": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 42px 21px 42px",

      [theme.breakpoints.down("sm")]: {
        padding: "20px 21px 21px 30px",
      },
    },
    ".logo-container": {
      display: "flex",
      alignItems: "center",
    },
    ".brand-name": {
      color: theme.palette.primary.main,
      lineHeight: "15px",
      fontWeight: 900,
    },
    ".tab-container": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: 360,
    },
    ".right-icon": {
      color: theme.palette.common.black,
      width: 34,
      height: 34,
      padding: 0,
      boxSizing: "border-box",
      cursor: "pointer",
    },
    ".app-button": {
      ...theme.typography.subtitle2,
      lineHeight: "18px",
      color: theme.palette.common.black,
      textTransform: "none",
    },
  };
});
