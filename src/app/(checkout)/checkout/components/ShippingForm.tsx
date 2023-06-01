"use client";

import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FormState, ShippingMethod } from "@/app/models";
import styled from "@emotion/styled";
import { useState } from "react";
import DetailForm from "./DetailForm";
import { AppButton } from "@/components/common";

type ShippingFormProps = {
  onSubmitForm: (data: FormState) => void;
  onBackToDetail: () => void;
  data: FormState;
};

const ShippingForm = ({
  data,
  onSubmitForm,
  onBackToDetail,
}: ShippingFormProps) => {
  const [editInfo, setEditInfo] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(
    ShippingMethod.Standard
  );

  return (
    <StyledShippingForm>
      {!editInfo ? (
        <>
          <Typography
            onClick={() => setEditInfo(true)}
            variant="h5"
            align="right"
            sx={{
              color: "primary.main",
              margin: "15px 0 20px",
            }}
          >
            Edit
          </Typography>
          <Box className="info-container">
            <Box
              className="info"
              sx={{ borderBottom: "1px solid rgba(86, 178, 128, 0.2)" }}
            >
              <Box width="65px">
                <Typography variant="caption" color="#818181">
                  Contact
                </Typography>
              </Box>
              <Typography variant="caption">{data.phoneEmail}</Typography>
            </Box>
            <Box>
              <Box className="info">
                <Box width="65px">
                  <Typography variant="caption" color="#818181">
                    Ship to
                  </Typography>
                </Box>
                <Typography variant="caption">{data.addressNumber}</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                width: "100%",
                margin: "40px 0 12px ",
                fontWeight: 900,
              }}
              variant="h4"
            >
              Shipping method
            </Typography>
            <Box className="method">
              <RadioGroup
                value={shippingMethod}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setShippingMethod(
                    event.target.value as unknown as ShippingMethod
                  );
                }}
              >
                <FormControlLabel
                  value={ShippingMethod.Standard}
                  control={<Radio />}
                  sx={{
                    ".MuiFormControlLabel-label": {
                      width: "100%",
                    },
                  }}
                  label={
                    <Box className="space-between-root">
                      <Typography variant="caption">
                        Standard Shipping
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 800 }}
                        align="right"
                      >
                        FREE
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column-reverse",
                  sm: "column-reverse",
                  md: "row",
                },
                width: "100%",
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "center", md: "baseline" },
                marginTop: "60px",
              }}
            >
              <Typography
                onClick={onBackToDetail}
                variant="h5"
                sx={{
                  color: "primary.main",
                  margin: "15px 0 60px",
                  textDecoration: "underline",
                }}
              >
                Back to details
              </Typography>
              <AppButton
                onClick={() => onSubmitForm({ ...data, shippingMethod })}
              >
                Go to payment
              </AppButton>
            </Box>
          </Box>
        </>
      ) : (
        <DetailForm
          onSubmitForm={(data) => onSubmitForm({ ...data, shippingMethod })}
          data={data}
          isEdited={true}
          buttonText="Go to payment"
        >
          {" "}
          <Box width="100%">
            <Typography
              sx={{
                width: "100%",
                margin: "40px 0 12px ",
                fontWeight: 900,
              }}
              variant="h4"
            >
              Shipping method
            </Typography>
            <Box className="method">
              <RadioGroup
                value={shippingMethod}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setShippingMethod(
                    event.target.value as unknown as ShippingMethod
                  );
                }}
              >
                <FormControlLabel
                  value={ShippingMethod.Standard}
                  control={<Radio />}
                  sx={{
                    ".MuiFormControlLabel-label": {
                      width: "100%",
                    },
                  }}
                  label={
                    <Box className="space-between-root">
                      <Typography variant="caption">
                        Standard Shipping
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 800 }}
                        align="right"
                      >
                        FREE
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </Box>
          </Box>
        </DetailForm>
      )}
    </StyledShippingForm>
  );
};

export default ShippingForm;

const StyledShippingForm = styled(Container)(({ theme }: any) => {
  return {
    ".info-container": {
      padding: "0 21px",
      border: "1px solid rgba(86, 178, 128, 0.2)",
      borderRadius: "7px",
    },
    ".info": {
      display: "flex",
      alignItems: "center",
      height: "58px",
      boxSizing: "border-box",
      padding: "21px 0",
    },
    ".method": {
      padding: "8px 21px",
      border: "1px solid #E5E5E5",
      borderRadius: "7px",
    },
  };
});
