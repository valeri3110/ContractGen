import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ContractGen from "./pages/LandingPage";
import FallbackPage from "./pages/FallbackPage";

function App() {
  return (
    <Router basename="/ContractGen">
      <Routes>
        <Route path="/YKPPEF0-ContractFormatter-557763939" element={<ContractGen />} />
        <Route path="*" element={<FallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;