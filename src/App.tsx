import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
