"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { BillingAddress, FormState, ShippingMethod } from "@/app/models";
import styled from "@emotion/styled";
import { ReactNode, useState } from "react";
import DetailForm from "./DetailForm";
import { AppButton, AppInput } from "@/components/common";
import { CardIcon, InfoIcon, LockIcon } from "@/components/icons";

type PaymentFormProps = {
  onSubmitForm: (data: FormState) => void;
  onBackToShipping: () => void;
  data: FormState;
};

const schema = z.object({
  cardNumber: z.string().nonempty("Card Number is require"),
  holderName: z.string().nonempty("Holder Name is require"),
  expireDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/)
    .nonempty("MM/YY"),
  cvv: z.string().nonempty("CVV is require"),
  VATNumber: z.string(),
  PEC: z.string(),
  billingAddress: z.unknown(),
});

const PaymentForm = ({
  data,
  onSubmitForm,
  onBackToShipping,
}: PaymentFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const [editInfo, setEditInfo] = useState(false);

  const onSubmit = () => {
    const paymentData = watch();

    onSubmitForm({ ...data, ...paymentData });
  };

  const onSubmitEditForm = (detailData: any) => {
    const paymentData = watch();

    onSubmitForm({ ...data, ...detailData, ...paymentData });
  };

  const PaymentForm = (
    <div>
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <Typography
            sx={{
              width: "100%",
              margin: "40px 0 23px ",
              fontWeight: 900,
            }}
            variant="h4"
          >
            Payment method
          </Typography>
          <Box className="card">
            <Stack
              spacing={3}
              direction="row"
              className="card-header"
              alignItems="center"
            >
              <CardIcon sx={{ fontSize: 31 }} />
              <Typography
                variant="caption"
                sx={{ fontWeight: 900 }}
                color="primary.main"
              >
                Credit Card
              </Typography>
            </Stack>
            <Grid container spacing={2} sx={{ padding: "24px 18px" }}>
              <Grid item xs={12}>
                <Controller
                  defaultValue={data.cardNumber}
                  control={control}
                  name="cardNumber"
                  render={({ field }) => (
                    <AppInput
                      {...field}
                      placeholder="Card Number"
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  defaultValue={data.holderName}
                  control={control}
                  name="holderName"
                  render={({ field }) => (
                    <AppInput
                      {...field}
                      placeholder="Holder Name"
                      helperText={errors.holderName?.message}
                      error={!!errors.holderName}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  defaultValue={data.expireDate}
                  control={control}
                  name="expireDate"
                  render={({ field }) => (
                    <AppInput
                      {...field}
                      helperText={errors.expireDate?.message}
                      placeholder="Expiration (MM/YY)"
                      error={!!errors.expireDate}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  defaultValue={data.cvv}
                  control={control}
                  name="cvv"
                  render={({ field }) => (
                    <AppInput
                      {...field}
                      placeholder="CVV"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <InfoIcon />
                          </InputAdornment>
                        ),
                      }}
                      helperText={errors.cvv?.message}
                      error={!!errors.cvv}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid> */}
        <Grid item xs={12}>
          <Typography
            sx={{
              width: "100%",
              margin: "40px 0 23px ",
              fontWeight: 900,
            }}
            variant="h4"
          >
            Tax Information
          </Typography>
          <Controller
            defaultValue={data.VATNumber}
            control={control}
            name="VATNumber"
            render={({ field }) => (
              <AppInput
                {...field}
                placeholder="VAT number  (optional)"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            defaultValue={data.PEC}
            control={control}
            name="PEC"
            render={({ field }) => (
              <AppInput {...field} placeholder="PEC  (optional)" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              width: "100%",
              margin: "40px 0 23px ",
              fontWeight: 900,
            }}
            variant="h4"
          >
            Billing address
          </Typography>
          <Controller
            defaultValue={BillingAddress.SameAddress}
            control={control}
            name="billingAddress"
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControl className="billing-address">
                  <FormControlLabel
                    sx={{
                      borderBottom: "1px solid #E5E5E5",
                    }}
                    className="info"
                    value={BillingAddress.SameAddress}
                    control={<Radio />}
                    label={
                      <Typography variant="caption">
                        Same as the shipping address
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    className="info"
                    value={BillingAddress.DifferentAddress}
                    control={<Radio />}
                    label={
                      <Typography variant="caption">
                        Use a different address for billing
                      </Typography>
                    }
                  />
                </FormControl>
              </RadioGroup>
            )}
          />
        </Grid>
      </Grid>
    </div>
  );

  return (
    <StyledPaymentForm>
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
              <Box
                className="info"
                sx={{ borderBottom: "1px solid rgba(86, 178, 128, 0.2)" }}
              >
                <Box width="65px">
                  <Typography variant="caption" color="#818181">
                    Ship to
                  </Typography>
                </Box>
                <Typography variant="caption">{data.addressNumber}</Typography>
              </Box>
              <Box className="info">
                <Box width="65px">
                  <Typography variant="caption" color="#818181">
                    Method
                  </Typography>
                </Box>
                <Typography variant="caption">
                  {data.shippingMethod === ShippingMethod.Standard
                    ? "Standard Shipping - FREE"
                    : "Express Shipping"}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>{PaymentForm}</form>
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
                onClick={onBackToShipping}
                variant="h5"
                sx={{
                  color: "primary.main",
                  margin: "15px 0 60px",
                  textDecoration: "underline",
                }}
              >
                Back to shipping
              </Typography>
              <AppButton type="submit" onClick={onSubmit}>
                Pay now
              </AppButton>
            </Box>
          </Box>
        </>
      ) : (
        <DetailForm
          onSubmitForm={onSubmitEditForm}
          data={data}
          isEdited={true}
          buttonText="Pay now"
        >
          <Box width="100%">{PaymentForm}</Box>
        </DetailForm>
      )}
    </StyledPaymentForm>
  );
};

export default PaymentForm;

const StyledPaymentForm = styled(Container)(({ theme }: any) => {
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
    ".card-header": {
      borderRadius: " 7px 7px 0px 0px",
      backgroundColor: "#56B28033",
      padding: "13px 21px",
      height: 58,
      boxSizing: "border-box",
    },
    ".card": {
      borderRadius: 7,
      border: "1px solid #E5E5E5",
    },
    ".billing-address": {
      padding: "0 5px 0 21px",
      border: "1px solid #E5E5E5",
      borderRadius: "7px",
    },
  };
});
