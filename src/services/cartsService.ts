import axios from "axios";
import { CreateCartsData } from "../types/cartsTypes";
import getTokenAuth from "../utils/getTokenAuth";

const base_url: string = "http://localhost:5000";

const addCarts = async (cartData: CreateCartsData) => {
try{
    const token = getTokenAuth();
    const response = await axios.post(`${base_url}/carts/addToCart`, cartData,
    {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

    return response.data
} catch (error) {
    console.error(error)
    throw error
}
}

const updateCartsQuantity = async(cartsQuantity: number, cart_id:number) => {
try{
    const token = getTokenAuth();
    const response = await axios.put(`${base_url}/carts/${cart_id}`, {quantity: cartsQuantity},
    {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

    return response.data
} catch(error){
    console.error(error)
    throw error
}
}

const getCartsWithPetFood = async () => {
    try {
        const token = getTokenAuth()
        const response = await axios.get(`${base_url}/carts/carts-petfood`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getUsersWithCartsAndPetFood = async () => {
    try {
        const token = getTokenAuth();
        const response = await axios.get(`${base_url}/usersWithCartsAndPetFood`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteCart = async(cart_id: number) => {
    try{
        const token = getTokenAuth()
        await axios.delete(`${base_url}/carts/${cart_id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })

        return true
    } catch(error){
        console.error(error)
        throw error
    }
}


const cartsService = {
    addCarts,
    updateCartsQuantity,
    getCartsWithPetFood,
    getUsersWithCartsAndPetFood,
    deleteCart
}

export default cartsService