import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
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
  loading: boolean;
  error: string | null;
}
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};
