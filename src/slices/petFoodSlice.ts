import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PetFoodData } from "../types/petFoodTypes";
import petFoodService from "../services/petFoodService";

export const createPetFood = createAsyncThunk("petfood/createPetFood", 
async (petFoodData: PetFoodData) => {
  const petfood = await petFoodService.createPetFood(petFoodData);

  return petfood;
}
)

export const getAllPetFood = createAsyncThunk("petfood/getAllPetFood",
async () => {
  const petfoods = await petFoodService.getAllPetFood();
  return petfoods
}
)

interface PetFoodSliceState {
    data: PetFoodData[];
  }
  
  const initialState: PetFoodSliceState = {
    data: [],
  };

const petFoodSlice = createSlice({
    name: "petfood",
    initialState,
    reducers: {
      },
      extraReducers: (builder) => {
        builder.addCase(createPetFood.fulfilled, (state, action) => {
          state.data.push(action.payload);
        });
        builder.addCase(getAllPetFood.fulfilled, (state, action) => {
          state.data = action.payload;
        });
      },
})

export const {actions, reducer: petFoodReducer} = petFoodSlice

export default petFoodSlice