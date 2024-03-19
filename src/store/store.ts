import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import { petFoodReducer } from "../slices/petFoodSlice";
import { cartReducer } from "../slices/cartsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    petfood: petFoodReducer,
    carts: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
