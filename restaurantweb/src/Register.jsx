import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    CustomerName: "",
    Phone_customer: "",
    Email_customer: "",
    Password_customer: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password_customer !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/register", {
        CustomerName: formData.CustomerName,
        Phone_customer: formData.Phone_customer,
        Email_customer: formData.Email_customer,
        Password_customer: formData.Password_customer,
      });

      alert(res.data.message);
      navigate("/dang-nhap"); // điều hướng sau khi đăng ký thành công
    } catch (err) {
      alert(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1950&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="row shadow p-4 rounded"
        style={{
          maxWidth: "800px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <div className="col-md-6 d-none d-md-block">
          <img
            src="res3.jpg"
            alt="Restaurant"
            className="img-fluid"
            style={{
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="col-md-6">
          <h3 className="mb-4 text-center">Đăng ký tài khoản</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                name="CustomerName"
                value={formData.CustomerName}
                onChange={handleChange}
                placeholder="Nhập họ tên"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                name="Phone_customer"
                value={formData.Phone_customer}
                onChange={handleChange}
                placeholder="SĐT"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="Email_customer"
                value={formData.Email_customer}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                name="Password_customer"
                value={formData.Password_customer}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Xác nhận mật khẩu</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Đăng ký</button>
            <p className="text-center mt-3">
              Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
