import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import SingleAssetView from "../components/SingleAssetView";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/:coinName" element={<SingleAssetView />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
