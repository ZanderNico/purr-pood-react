import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../reducers/userSlice";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { decodeJwtToken } from "../utils/decodeJwtToken";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const resultAction = await dispatch(loginUser(values));
      const token = localStorage.getItem("token");

      if (token !== null) {
        const userData = decodeJwtToken(token);
        console.log("LOGIN PAGE TO", userData);
        // Access the user_role property
        const userRole = userData?.user?.user_role;
        console.log("LOGIN PAGE ROLLLESSSS", userRole);
        // Handle navigation based on user role
        if (userRole === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      } else {
        console.error("Token not found in localStorage");
      }
    } catch (error) {
      // Handle login error if needed
      console.error("Login failed:", error);
    }
  };
  return (
    <>
      <div>LoginPage</div>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
}

export default LoginPage;
