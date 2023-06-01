"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { BGImage, NonAvatar } from "@/assets/images";
import AppButton from "@/components/common/AppButton";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/features/authSlice";
import { auth } from "../../../../../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Confirm Password is required"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
const RegisterForm = ({ onSwitchForm }: { onSwitchForm: () => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [error, setError] = useState("");

  const handleSwitchForm = () => {
    onSwitchForm();
    setError("");
  };

  const onSubmit = async (data: any) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        dispatch(
          login({
            email: userCredential.user.email || "",
            token: userCredential.user.accessToken,
            avatar: userCredential.user.photoURL || NonAvatar.src,
          })
        );
        router.push("/");
      })
      .catch(() => {
        setError("Email is taken");
      });
  };

  return (
    <RegisterFormStyled>
      <Box className="background">
        <form
          className="card center-root-column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography className="login-title center-root">Register</Typography>
          {Boolean(error) && (
            <Typography sx={{ color: "#d32f2f" }} align="center">
              {error}
            </Typography>
          )}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                InputProps={{
                  style: {
                    color: "#272727",
                  },
                }}
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                InputProps={{
                  style: {
                    color: "#272727",
                  },
                }}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                InputProps={{
                  style: {
                    color: "#272727",
                  },
                }}
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.confirmPassword || !!errors[""]}
                helperText={
                  errors.confirmPassword?.message || errors[""]?.message
                }
              />
            )}
          />

          <Typography className="login-typography" onClick={handleSwitchForm}>
            Already had an account? Try to login
          </Typography>

          <AppButton center type="submit" variant="contained" color="primary">
            Register
          </AppButton>
        </form>
      </Box>
    </RegisterFormStyled>
  );
};

export default RegisterForm;

const RegisterFormStyled = styled("div")(({ theme }: any) => {
  return {
    ".background": {
      backgroundImage: `url(${BGImage.src})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
    },
    ".card": {
      background: "rgba(247, 248, 250, 0.8)",
      backdropFilter: "blur(2px)",
      width: "350px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "2px",
      padding: "40px 20px",
    },
    ".login-title": {
      ...theme.typography.h2,
      color: theme.palette.common.black,
    },
    ".login-typography": {
      cursor: "pointer",
      color: theme.palette.common.black,
      ":hover": {
        color: theme.palette.primary.main,
      },
    },
  };
});
