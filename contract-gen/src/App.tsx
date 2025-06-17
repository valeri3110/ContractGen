import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FallbackPage from "./pages/FallbackPage";

function App() {
  return (
    <Router basename="/YKPPEF0-ContractFormatter-557763939">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<FallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;