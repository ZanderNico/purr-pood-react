import axios from "axios";
import {
  CreateUserResponse,
  GetUserData,
  UserData,
  UserId,
} from "../types/userTypes";
import getTokenAuth from "../utils/getTokenAuth";

const base_url: string = "http://localhost:5000";

const createUser = async (userData: UserData): Promise<number> => {
  try {
    const response = await axios.post<CreateUserResponse>(
      `${base_url}/users/create-users`,
      userData
    );
    return response.data.userId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllUsers = async (): Promise<GetUserData[]> => {
  try {
    //For testing to 
    const token = getTokenAuth();

    const response = await axios.get<GetUserData[]>(`${base_url}/users`, {
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

const loginUser = async (values: {
  email: string;
  password: string;
}): Promise<string> => {
  try {
    const response = await axios.post<{ token: string }>(
      `${base_url}/users/login`,
      values
    );
    const { token } = response.data;

    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserById = async (userId: UserId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found in localStorage");
    }
    const response = await axios.get(`${base_url}/users/${userId}`, {
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

const updateUser = async (userId: UserId, newData: Partial<GetUserData>) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    const response = await axios.put(
      `${base_url}/users/update-users/${userId}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.updated) {
      return true; // Returns true if the user was updated
    } else {
      throw new Error("User not found or data not modified");
    }
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId: UserId) => {
    try{
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found in localStorage");
      }
      const response = await axios.delete(
        `${base_url}/users/delete-users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;

    }catch(error){
      console.error("Error deleting user:", error);
      throw error
    }
}

const userService = {
  createUser,
  getAllUsers,
  loginUser,
  getUserById,
  updateUser,
  deleteUser
};

export default userService;
