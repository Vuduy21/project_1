import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dat-lai-mat-khau");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light" style={{ background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
      <div className="card shadow-sm border-0" style={{ maxWidth: "400px", width: "100%", borderRadius: '12px' }}>
        <div className="card-body p-4">
          <h5 className="text-center mb-4" style={{ color: '#495057' }}>Quên mật khẩu</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Tiếp tục</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;


