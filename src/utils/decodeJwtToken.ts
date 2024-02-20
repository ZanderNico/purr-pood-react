import {JwtPayload, jwtDecode} from 'jwt-decode'; 

export const decodeJwtToken = (token: string) => {
  try {
    const decodedToken = jwtDecode<any>(token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    throw error;
  }
};
