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

  export interface UpdateUserName {
    user_name: string;
  }

  export interface UpdateUserPassword {
    password: string;
  }

  export interface UserId {
    user_id: number;
  }
