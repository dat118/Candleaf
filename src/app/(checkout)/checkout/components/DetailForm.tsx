"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Container,
  Grid,
  Checkbox,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import { AppButton, AppInput, AppSelect } from "@/components/common";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { FormState } from "@/app/models";

const schema = z.object({
  phoneEmail: z.string().nonempty("Phone, Email are required"),
  name: z.string().nonempty("Name is required"),
  secondName: z.string().nonempty("Second Name is required"),
  addressNumber: z.string().nonempty("Address and Number is required"),
  city: z.string().nonempty("City is required"),
  postalCode: z.string().nonempty("Postal code is required"),
  discount: z.boolean(),
  country: z.number(),
  province: z.number(),
  saveInfo: z.boolean(),
  note: z.string(),
});

type DetailFormProps = {
  onSubmitForm: (data: FormState) => void;
  data: FormState;
  isEdited?: boolean;
  children?: ReactNode;
  buttonText?: string;
};

const DetailForm = ({
  data,
  onSubmitForm,
  isEdited,
  children,
  buttonText,
}: DetailFormProps) => {
  const [anchorElProvince, setAnchorElProvince] = useState<HTMLElement | null>(
    null
  );

  const [anchorElCountry, setAnchorElCountry] = useState<HTMLElement | null>(
    null
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    onSubmitForm(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: "12px", fontWeight: 900 }}
              variant="h4"
            >
              Contact
            </Typography>
            <Controller
              defaultValue={data.phoneEmail}
              control={control}
              name="phoneEmail"
              render={({ field }) => (
                <AppInput
                  {...field}
                  placeholder="Email or mobile phone number"
                  error={Boolean(!!errors.phoneEmail)}
                  fullWidth
                  helperText={errors.phoneEmail?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Controller
              defaultValue={data.discount}
              control={control}
              name="discount"
              render={({ field }) => (
                <FormControl>
                  <Checkbox
                    defaultChecked={data.discount}
                    {...field}
                    sx={{ color: "#898989" }}
                  />
                </FormControl>
              )}
            />
            <Typography variant="caption">
              Add me to Candleaf newsletter for a 10% discount
            </Typography>
          </Grid>
          <Typography
            sx={{ width: "100%", margin: "40px 0 12px 16px", fontWeight: 900 }}
            variant="h4"
          >
            Shipping address
          </Typography>
          <Grid item xs={12} md={6}>
            <Controller
              defaultValue={data.name}
              control={control}
              name="name"
              render={({ field }) => (
                <AppInput
                  {...field}
                  placeholder="Name"
                  error={!!errors.name}
                  fullWidth
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              defaultValue={data.secondName}
              name="secondName"
              render={({ field }) => (
                <AppInput
                  {...field}
                  placeholder="Second Name"
                  error={!!errors.secondName}
                  helperText={errors.secondName?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              defaultValue={data.addressNumber}
              control={control}
              name="addressNumber"
              render={({ field }) => (
                <AppInput
                  {...field}
                  placeholder="Address and number"
                  error={!!errors.addressNumber}
                  helperText={errors.addressNumber?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              defaultValue={data.note}
              name="note"
              render={({ field }) => (
                <AppInput
                  {...field}
                  placeholder="Shipping note (optional)"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Controller
              control={control}
              defaultValue={data.city}
              name="city"
              render={({ field }) => (
                <AppInput
                  {...field}
                  placeholder="City"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Controller
              control={control}
              defaultValue={data.postalCode}
              name="postalCode"
              render={({ field }) => (
                <AppInput
                  {...field}
                  placeholder="Postal Code"
                  helperText={errors.postalCode?.message}
                  error={!!errors.postalCode}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Controller
              defaultValue={data.province}
              control={control}
              name="province"
              render={({ field }) => (
                <FormControl fullWidth>
                  <AppSelect
                    open={Boolean(anchorElProvince)}
                    anchorEl={anchorElProvince}
                    defaultValue={data.province as number}
                    options={[
                      {
                        value: 0,
                        label: "BAC NINH",
                      },
                      {
                        value: 1,
                        label: "HA NOI",
                      },
                    ]}
                    onClose={() => setAnchorElProvince(null)}
                    onClickOpenMenu={(event) =>
                      setAnchorElProvince(event.currentTarget)
                    }
                    onChangeMenu={(index) => {
                      field.onChange(index);
                      setAnchorElProvince(null);
                    }}
                    {...field}
                    label="Province"
                  />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              defaultValue={data.country}
              control={control}
              name="country"
              render={({ field }) => (
                <FormControl fullWidth>
                  <AppSelect
                    open={Boolean(anchorElCountry)}
                    anchorEl={anchorElCountry}
                    defaultValue={data.country as number}
                    options={[
                      {
                        value: 0,
                        label: "VIET NAM",
                      },
                      {
                        value: 1,
                        label: "USA",
                      },
                    ]}
                    onClose={() => setAnchorElCountry(null)}
                    onClickOpenMenu={(event) =>
                      setAnchorElCountry(event.currentTarget)
                    }
                    onChangeMenu={(index) => {
                      field.onChange(index);
                      setAnchorElCountry(null);
                    }}
                    {...field}
                    label="Country"
                  />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Controller
              defaultValue={data.saveInfo}
              control={control}
              name="saveInfo"
              render={({ field }) => (
                <FormControl>
                  <Checkbox
                    {...field}
                    defaultChecked={data.saveInfo}
                    sx={{ color: "#898989" }}
                  />
                </FormControl>
              )}
            />
            <Typography variant="caption">
              Save this informations for a future fast checkout
            </Typography>
          </Grid>
          {children}
          {isEdited ? (
            <Box
              className="center-root"
              sx={{ width: "100%", marginTop: "40px" }}
            >
              <AppButton type="submit">{buttonText}</AppButton>
            </Box>
          ) : (
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
              <Link href="/cart">
                <Typography
                  variant="h5"
                  sx={{
                    color: "primary.main",
                    margin: "15px 0 60px",
                    textDecoration: "underline",
                  }}
                >
                  Back to cart
                </Typography>
              </Link>
              <AppButton type="submit">Go to shipping</AppButton>
            </Box>
          )}
        </Grid>
      </form>
    </Container>
  );
};

export default DetailForm;
