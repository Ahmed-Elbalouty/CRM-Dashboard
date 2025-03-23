import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddNewCustomer from "./pages/AddNewCustomer";
import AddNewDeal from "./pages/AddNewDeal";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-customer" element={<AddNewCustomer />} />
        <Route path="/add-deal" element={<AddNewDeal />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>

    </Router>
  );
}

export default App;
