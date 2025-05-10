import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import ChangePassword from "./ChangePassword";
import Home from "./HomePage"; 
import Home2 from "./HomePageNotLogin"; 
import Feedback from "./Feedback";
import Cart from "./Cart";
import Order from "./Order";
import { CartProvider } from "./CartContext";

function App() {
  return (
  <CartProvider>
    <Routes>
      <Route path="/" element={<Home2 />} />
      <Route path="/dang-nhap" element={<Login />} />
      <Route path="/dang-ky" element={<Register />} />
      <Route path="/quen-mat-khau" element={<ForgotPassword />} />
      <Route path="/dat-lai-mat-khau" element={<ResetPassword />} />
      <Route path="/doi-mat-khau" element={<ChangePassword/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home2" element={<Home2/>}/>
      <Route path="/phan-hoi" element={<Feedback />} />
      <Route path="/gio-hang" element={<Cart />} />
      <Route path="/dat-hang" element={<Order />} />
      {/* Nếu đường dẫn không tồn tại, chuyển về Home */}
      <Route path="*" element={<Home/>}/>
    </Routes>
    <ToastContainer position="top-right" autoClose={1500} />
  </CartProvider>
  );
}

export default App;


