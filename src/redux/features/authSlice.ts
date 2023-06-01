import { AccountState } from "@/app/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  avatar: "",
} as AccountState;

export const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AccountState>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.avatar = action.payload.avatar;
    },
    logout: (state) => {
      state.email = "";
      state.token = "";
      state.avatar = "";
    },
  },
});

export const { login, logout } = authentication.actions;
export default authentication.reducer;
