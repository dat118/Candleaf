import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "@/app/models";

const ToggleIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 32 17"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <rect width="32" height="3" fill="#272727" />
      <rect y="7" width="32" height="3" fill="#272727" />
      <rect y="14" width="32" height="3" fill="#272727" />
    </SvgIcon>
  );
};

export default memo(ToggleIcon);
