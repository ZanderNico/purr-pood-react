export interface PetFoodData {
    food_name: string;
    food_description: string;
    category: string;
    price: number;
    stock_quantity: number;
    food_image: string;
  }

  export interface GetPetFoodData {
    food_id: number;
    food_name: string;
    food_description: string;
    category: string;
    price: number;
    stock_quantity: number;
    food_image: string;
  }