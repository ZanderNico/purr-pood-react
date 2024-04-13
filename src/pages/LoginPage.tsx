import { useNavigate } from "react-router-dom";
import { loginUser } from "../slices/userSlice";
import LoginForm from "../components/forms/LoginForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { decodeJwtToken } from "../utils/decodeJwtToken";
import getTokenAuth from "../utils/getTokenAuth";
import bg from "../assets/petFoodBackground.jpg";
import logo from "../assets/good-pet-food.svg"

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
      >
        <img
          src={bg}
          alt="background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-45 z-10"></div>
        <div className="flex flex-col justify-center items-center gap-1 relative z-20 rounded-md  px-14 pt-4 bg-white">
        <img className="max-h-16 max-w-16 mt-2" src={logo} alt="Logo" />
          <h1 className="text-3xl  text-yellow-400 font-bold p-2">
            <span className=" text-slate-500">PURR</span> POOD
          </h1>
          <p className="text-2sm text-yellow-400 font-semibold italic m-1">
            "Pet food that works."
          </p>
          <LoginForm onSubmit={handleLogin} />
        </div>
        
      </div>
    </>
  );
}

export default LoginPage;
