import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateCartsData, GetCartsData, UserWithCart } from "../types/cartsTypes";
import cartsService from "../services/cartsService";

export const addCart = createAsyncThunk(
  "carts/addToCart",
  async (cartData: CreateCartsData) => {
    const carts = await cartsService.addCarts(cartData);
    console.log("SA SLICE ADDCART", carts)
    return carts;
  }
);

export const updateCartsQuantity = createAsyncThunk(
  "carts/updateCartsQuantity",
  async ({
    cartsQuantity,
    cart_id,
  }: {
    cartsQuantity: number;
    cart_id: number;
  }) => {
    const result = await cartsService.updateCartsQuantity(
      cartsQuantity,
      cart_id
    );
    return result;
  }
);

export const getCartsWithPetFood = createAsyncThunk(
  "carts/getCartsWithPetFood",
  async () => {
    try {
      const cartsWithPetFood = await cartsService.getCartsWithPetFood();
      console.log(cartsWithPetFood);
      return cartsWithPetFood;
    } catch (error) {
      throw error;
    }
  }
);

export const getUsersWithCartsAndPetFood = createAsyncThunk(
  "carts/getUsersWithCartsAndPetFood",
  async () => {
    try {
      const usersWithCartsAndPetFood =
        await cartsService.getUsersWithCartsAndPetFood();
      console.log(usersWithCartsAndPetFood);
      console.log("SA SLICE GETUSERCART", usersWithCartsAndPetFood)
      return usersWithCartsAndPetFood;
    } catch (error) {
      throw error;
    }
  }
);

export const getCartWithUserById = createAsyncThunk(
  "carts/getCartWithUserById",
  async (userId: number) => {
    try {
      const cartWithUser = await cartsService.getCartWithUserById(userId);
      console.log("SA SLICE", cartWithUser)
      return cartWithUser;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCart = createAsyncThunk(
    "carts/deleteCart",
    async (cart_id: number) => {
      try {
        await cartsService.deleteCart(cart_id);
        return cart_id;
      } catch (error) {
        throw error;
      }
    }
  );

interface CartSliceState {
  createData: CreateCartsData[];
  getData: GetCartsData[];
  cartsWithPetFood: any;
  usersWithCartsAndPetFood: UserWithCart[];
  usersWithCartsAndPetFoodById: UserWithCart;
}

const initialState: CartSliceState = {
  createData: [],
  getData: [],
  cartsWithPetFood: null,
  usersWithCartsAndPetFood: [],
  usersWithCartsAndPetFoodById: {},
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCart.fulfilled, (state, action) => {
        state.createData.push(action.payload);
      })
      .addCase(getCartsWithPetFood.fulfilled, (state, action) => {
        state.cartsWithPetFood = action.payload;
      })
      .addCase(getUsersWithCartsAndPetFood.fulfilled, (state, action) => {
        state.usersWithCartsAndPetFood = action.payload;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        // Remove the deleted cart from state
        state.createData = state.getData.filter((cart) => cart.cart_id !== action.payload);
      })
      .addCase(getCartWithUserById.fulfilled, (state, action) => {

        state.usersWithCartsAndPetFoodById = action.payload;
        console.log("Updated usersWithCartsAndPetFoodById:", state.usersWithCartsAndPetFoodById);
      })
      
  },
});

export const { actions, reducer: cartReducer } = cartSlice;

export default cartSlice;
