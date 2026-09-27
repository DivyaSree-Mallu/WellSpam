import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import Alerts from "./pages/Alerts";
import History from "./pages/History";
import PlatformStatus from "./pages/PlatformStatus";
import ModelAnalysis from "./pages/ModelAnalysis";
import About from "./pages/About";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/history" element={<History />} />
        <Route path="/platform" element={<PlatformStatus />} />
        <Route path="/model" element={<ModelAnalysis />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}
