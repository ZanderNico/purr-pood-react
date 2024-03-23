import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PetfoodPage from "./pages/PetfoodPage";
import AdminPage from "./pages/AdminPage";
import UserProfilePage from "./pages/UserProfilePage";
import { UserProvider } from "./contexts/authContext";

function App() {
  return (
    <BrowserRouter>
       <UserProvider>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/sign-up" element={<SignupPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/petfood" element={<PetfoodPage/>}/>
        <Route path="/admin-dashboard" element={<AdminPage/>}/>
        <Route path="/user-profile" element={<UserProfilePage/>}/>
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
