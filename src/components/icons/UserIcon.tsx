import React, { memo } from "react";
import { SvgIcon } from "@mui/material";
import { IIconProps } from "@/app/models";

const UserIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 26 26"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.625 25.75C23.625 25.75 25.75 25.75 25.75 23.625C25.75 21.5 23.625 15.125 13 15.125C2.375 15.125 0.25 21.5 0.25 23.625C0.25 25.75 2.375 25.75 2.375 25.75H23.625ZM2.38563 23.744V23.7397V23.744ZM2.42175 23.625H23.5782C23.5882 23.6238 23.5981 23.6224 23.608 23.6208L23.625 23.6165C23.6229 23.0938 23.2978 21.5212 21.857 20.0805C20.4715 18.695 17.8641 17.25 13 17.25C8.13375 17.25 5.5285 18.695 4.143 20.0805C2.70225 21.5212 2.37925 23.0938 2.375 23.6165C2.39055 23.6195 2.40614 23.6223 2.42175 23.625V23.625ZM23.6165 23.744V23.7397V23.744ZM13 10.875C14.1272 10.875 15.2082 10.4272 16.0052 9.6302C16.8022 8.83317 17.25 7.75217 17.25 6.625C17.25 5.49783 16.8022 4.41683 16.0052 3.6198C15.2082 2.82277 14.1272 2.375 13 2.375C11.8728 2.375 10.7918 2.82277 9.9948 3.6198C9.19777 4.41683 8.75 5.49783 8.75 6.625C8.75 7.75217 9.19777 8.83317 9.9948 9.6302C10.7918 10.4272 11.8728 10.875 13 10.875V10.875ZM19.375 6.625C19.375 8.31576 18.7034 9.93726 17.5078 11.1328C16.3123 12.3283 14.6908 13 13 13C11.3092 13 9.68774 12.3283 8.49219 11.1328C7.29665 9.93726 6.625 8.31576 6.625 6.625C6.625 4.93424 7.29665 3.31274 8.49219 2.11719C9.68774 0.92165 11.3092 0.25 13 0.25C14.6908 0.25 16.3123 0.92165 17.5078 2.11719C18.7034 3.31274 19.375 4.93424 19.375 6.625V6.625Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(UserIcon);
