import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { GetUserData, UserData, UserId } from "../types/userTypes";
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
      console.log(token);
      return { token };
    } catch (error) {
      throw error;
    }
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId: UserId) => {
    const userById = await userService.getUserById(userId);
    return userById;
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({
    userId,
    newData,
  }: {
    userId: UserId;
    newData: Partial<GetUserData>;
  }) => {
    try {
      const updated = await userService.updateUser(userId, newData);
      return { userId, updated };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId: UserId) => {
    try {
      return await userService.deleteUser(userId);
    } catch (error) {
      throw error;
    }
  }
);

interface UserSliceState {
  data: GetUserData[];
  dataById: GetUserData[];
}

const initialState: UserSliceState = {
  data: [],
  dataById: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteUserFromState: (state, action) => {
      const userId = action.payload;
      state.data = state.data.filter((user) => user.user_id !== userId);
      console.log("User deleted from state:", userId);
    },

    updateUserInState: (state, action) => {
      const { userId, updated } = action.payload;
      const index = state.data.findIndex((user) => user.user_id === userId);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updated };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {});
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(decodeJwtToken(action.payload.token));
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.dataById = action.payload;
    });
  },
});

export const { actions, reducer: userReducer } = userSlice;

export default userReducer;
