import { useNavigate } from "react-router-dom";
import { loginUser } from "../slices/userSlice";
import LoginForm from "../components/forms/LoginForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { decodeJwtToken } from "../utils/decodeJwtToken";
import getTokenAuth from "../utils/getTokenAuth";
import bg from "../assets/petFoodBackground.jpg";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  //handle log-in logic.
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await dispatch(loginUser(values));
      const token = getTokenAuth();

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
      <div
        className="min-h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="text-4xl sm:text-6xl xl:text-7xl text-yellow-400 font-bold">PURR POOD</h1>
          <p className="text-xl sm:text-2xl xl:text-3xl text-yellow-400 font-semibold italic m-1">
            "Pet food that works."
          </p>
        </div>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </>
  );
}

export default LoginPage;
