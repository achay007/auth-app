// store/features/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: null | {
    id: string;
    email: string;
    name: string;
    image: string | null;
    role: string;
    school: string | null;
    createdAt: string;
    updatedAt: string;
  }
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { setLoggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
