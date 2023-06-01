"use client";

import styled from "@emotion/styled";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

type CommonSelectProps = {
  open: boolean;
  anchorEl: null | HTMLElement;
  defaultValue: number;
  options: Array<{ value: number; label: string }>;
  label?: string;
  small?: boolean;
  onClose: () => void;
  onClickOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
  onChangeMenu: (index: number) => void;
};

const AppSelect = ({
  options,
  label,
  open,
  anchorEl,
  defaultValue,
  small,
  onClose,
  onClickOpenMenu,
  onChangeMenu,
}: CommonSelectProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(defaultValue);

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    onChangeMenu(index);
  };

  return (
    <StyledSelect small={small}>
      <Box display="select-container" onClick={onClickOpenMenu}>
        <Box className="label">
          <Typography
            sx={{
              fontSize: 10,
              fontweight: 400,
              lineHeight: "11px",
              color: "#616161",
            }}
          >
            {label}
          </Typography>
          <Typography
            sx={{
              color: "#272727",
              fontSize: 14,
              fontweight: 400,
              lineHeight: "15px",
            }}
          >
            {options[selectedIndex].label}
          </Typography>
        </Box>
        <Box className="arrow center-root">
          <ExpandMoreIcon sx={{ fontSize: small ? 15 : 24 }} />
        </Box>
      </Box>
      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        className="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.value}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </StyledSelect>
  );
};

export default AppSelect;

const StyledSelect = styled("div")(({ theme, small }: any) => {
  return {
    padding: small ? "2px 0 2px 6px" : "6px 0 6px 9px",
    border: `0.5px solid ${theme.palette.grey[100]}`,
    height: small ? 21 : 40,
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    width: small ? 80 : "100%",
    position: "relative",

    ".select-container": {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    ".label": {
      width: "100%",
    },
    ".arrow": {
      width: small ? 15 : 40,
      borderLeft: "0.25px solid rgba(137, 137, 137, 0.5);",
      position: "absolute",
      right: 1,
      top: small ? "" : 8,
    },
  };
});
