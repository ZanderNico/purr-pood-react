import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetPetFoodData, PetFoodData } from "../types/petFoodTypes";
import petFoodService from "../services/petFoodService";

export const createPetFood = createAsyncThunk(
  "petfood/createPetFood",
  async (petFoodData: PetFoodData) => {
    const petfood = await petFoodService.createPetFood(petFoodData);
    console.log("CREATEED SA SLICE", petfood);
    return petfood;
  }
);

export const getAllPetFood = createAsyncThunk(
  "petfood/getAllPetFood",
  async () => {
    const petfoods = await petFoodService.getAllPetFood();
    return petfoods;
  }
);

export const uploadPetFoodImage = createAsyncThunk(
  "petfood/uploadPetFoodImage",
  async ({ file, foodId }: { file: File; foodId: any }) => {
    const result = await petFoodService.uploadPetFoodImage(file, foodId);
    return result;
  }
);

export const updatePetFood = createAsyncThunk(
  "petfood/updatePetFood",
  async ({ foodId, updatedData }: { foodId: number; updatedData: Partial<GetPetFoodData>; }) => {
    try {
      const response = await petFoodService.updatePetFood(foodId, updatedData);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const deletePetFood = createAsyncThunk(
  "petfood/deletePetFood", async(foodId: number) => {
    try{
    return await petFoodService.deletePetFood(foodId)
    } catch (error){
      console.log(error)
      throw error
    }
  }
)

export const getFoodImageById = createAsyncThunk("petfood/getFoodImageById", async (foodId: number) =>{
  const petFoodImage = await petFoodService.getFoodImageById(foodId);
  return petFoodImage
})

interface PetFoodSliceState {
  data: PetFoodData[];
  dataById: GetPetFoodData[];
}

const initialState: PetFoodSliceState = {
  data: [],
  dataById: [],
};

const petFoodSlice = createSlice({
  name: "petfood",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPetFood.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(getAllPetFood.fulfilled, (state, action) => {
      state.dataById = action.payload;
    });
    builder.addCase(uploadPetFoodImage.fulfilled, (state, action) => {
      // Handle the result of the image upload if needed
      console.log(action.payload);
    });

  },
});

export const { actions, reducer: petFoodReducer } = petFoodSlice;

export default petFoodSlice;
