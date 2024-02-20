export interface UserData {
    email: string;
    password: string;
    user_name: string;
    user_role: string;
  }

  export interface CreateUserResponse {
    userId: number;
  }

  export interface GetUserData {
    user_id: number;
    email: string;
    password: string;
    user_name: string;
    user_role: string;
  }

  export interface LoginUser {
    email: string;
    password: string;
  }