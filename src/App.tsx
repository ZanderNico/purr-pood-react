import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PetfoodPage from "./pages/PetfoodPage";
import AdminPage from "./pages/AdminPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignupPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/log-in" element={<LoginPage/>}/>
        <Route path="/petfood" element={<PetfoodPage/>}/>
        <Route path="/admin-dashboard" element={<AdminPage/>}/>
        <Route path="/user-profile" element={<UserProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
