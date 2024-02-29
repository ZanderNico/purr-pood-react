import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import { petFoodReducer } from '../slices/petFoodSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    petfood: petFoodReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch