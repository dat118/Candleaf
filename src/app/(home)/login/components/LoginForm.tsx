"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { BGImage, NonAvatar } from "@/assets/images";
import AppButton from "@/components/common/AppButton";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/features/authSlice";
import { auth } from "../../../../../firebaseconfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import GoogleIcon from "@mui/icons-material/Google";

const schema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});
const LoginForm = ({ onSwitchForm }: { onSwitchForm: () => void }) => {
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
    signInWithEmailAndPassword(auth, data.email, data.password)
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
        setError("Email or Password is incorrect");
      });
  };

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          login({
            email: user.email || "",
            token: user.accessToken,
            avatar: user.photoURL || NonAvatar.src,
          })
        );
        router.push("/");
      })
      .catch((error) => {
        setError("Something went wrong");
      });
  };

  return (
    <LoginFormStyled>
      <Box className="background">
        <form
          className="card center-root-column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography className="login-title center-root">Login</Typography>
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

          <Typography className="login-typography" onClick={handleSwitchForm}>
            Do not have account? Register now!
          </Typography>

          <AppButton center type="submit" variant="contained" color="primary">
            Login
          </AppButton>
          <Button
            onClick={handleLoginWithGoogle}
            variant="outlined"
            sx={{ marginTop: "20px" }}
            endIcon={<GoogleIcon />}
          >
            Login with Google
          </Button>
        </form>
      </Box>
    </LoginFormStyled>
  );
};

export default LoginForm;

const LoginFormStyled = styled("div")(({ theme }: any) => {
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
