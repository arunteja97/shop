import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/home-page.route";
import NavBar from "./components/navbar.component";
import Register from "./routes/register.route";
import Login from "./routes/login.route";
import Products from "./routes/products.route";
import Checkout from "./routes/checkout.route";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
