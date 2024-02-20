import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { GetUserData, UserData } from "../types/userTypes";
import { decodeJwtToken } from "../utils/decodeJwtToken";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: UserData) => {
    const userId = await userService.createUser(userData);
    return userId;
  }
);

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const users = await userService.getAllUsers();
  console.log(users);
  return users;
});

export const loginUser = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }) => {
    try {
      const token = await userService.loginUser(values);
      console.log(token)
    return { token };

    } catch (error) {
      throw error;
    }
  }
);

interface UserSliceState {
  data: GetUserData[];
}

const initialState: UserSliceState = {
  data: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Define your actions and reducers for user state
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      // Handle the fulfilled action if needed
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(decodeJwtToken(action.payload.token))
      localStorage.setItem('token', action.payload.token);
    });
  },
});

export const { actions, reducer: userReducer } = userSlice;

export default userReducer;
