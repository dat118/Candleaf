import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "@/app/models";

const CartIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 32 24"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <rect
        x="3"
        y="21"
        width="32"
        height="3"
        transform="rotate(-40 3 21)"
        fill="#272727"
      />
      <rect
        x="5"
        width="32"
        height="3"
        transform="rotate(40 5 0)"
        fill="#272727"
      />
    </SvgIcon>
  );
};

export default memo(CartIcon);
