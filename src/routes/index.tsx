import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "../components/Account/Account";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import SingleAssetView from "../components/SingleAssetView";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/account" element={<Account />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route path="/:coinName" element={<SingleAssetView />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
