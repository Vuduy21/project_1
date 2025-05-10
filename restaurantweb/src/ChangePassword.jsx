import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ChangePassword() {
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu mới không khớp.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/changepassword", {
        phone: phone,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      setMessage(res.data.message);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Đã xảy ra lỗi khi kết nối server.");
      }
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(to right, #fceabb, #f8b500)" }}
    >
      <div className="p-4 shadow rounded bg-white" style={{ width: "100%", maxWidth: "450px" }}>
        <h4 className="text-center mb-4">Đổi Mật Khẩu</h4>

        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu hiện tại</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu mới</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {message && <div className="alert alert-info">{message}</div>}

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Xác nhận thay đổi
          </button>

          <p className="text-center mt-3">
            <Link to="/home" className="btn btn-outline-secondary btn-sm">
              Quay lại trang chủ
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;



