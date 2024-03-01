import axios from "axios";
import { GetPetFoodData, PetFoodData } from "../types/petFoodTypes";
import getTokenAuth from "../utils/getTokenAuth";

const base_url: string = "http://localhost:5000";

const createPetFood = async (
  petFoodData: PetFoodData
): Promise<PetFoodData> => {
  try {
    const token = getTokenAuth();

    const response = await axios.post(
      `${base_url}/petfood/create-petfood`,
      petFoodData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
      const petFoodId = response.data.food_id;
      console.log("CREATED", petFoodId)
    return petFoodId;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllPetFood = async (): Promise<GetPetFoodData[]> => {
  try {
    const token = getTokenAuth();
    const response = await axios.get(`${base_url}/petfood`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPetFoodById = async (petFoodId: number): Promise<GetPetFoodData> => {
  try {
    const token = getTokenAuth();
    const response = await axios.get(`${base_url}/petfood/${petFoodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const uploadPetFoodImage = async ( file: File, foodId: number): Promise<string> => {
    const token = getTokenAuth();
  
    try {
      const formData = new FormData();
      formData.append("food_image", file);

      const response = await axios.put(
        `${base_url}/petfood/upload-image/${foodId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Sa axios ng image to", response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


const petFoodService = {
  createPetFood,
  getAllPetFood,
  getPetFoodById,
  uploadPetFoodImage
};

export default petFoodService;
