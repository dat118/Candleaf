import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "@/app/models";

const StarIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 22"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        d="M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(StarIcon);
