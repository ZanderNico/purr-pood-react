import axios from "axios"
import { CreateUserResponse, GetUserData, LoginUser, UserData } from "../types/userTypes"

const createUser = async (userData: UserData): Promise<number> => {
    try{
        const response = await axios.post<CreateUserResponse>("http://localhost:5000/users/create-users", userData)
        return response.data.userId
    } catch(error) {
        throw error
    }
}

const getAllUsers = async (): Promise<GetUserData[]> => {
    try{
        const response = await axios.get<GetUserData[]>("http://localhost:5000/users")
        return response.data
    }catch(error){throw error}

}

const loginUser = async (values: { email: string; password: string }): Promise<string> => {
    try{
        const response = await axios.post<{token: string}>("http://localhost:5000/users/login", values)
        const {token} = response.data
        
        return token
    } catch (error) {
        throw error
    }
}

const userService = {
    createUser,
    getAllUsers,
    loginUser
}

export default userService;