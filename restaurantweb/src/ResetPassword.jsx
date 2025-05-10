import React from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(to right, #e3f2fd, #ffffff)",
      }}
    >
      <div className="p-4 shadow rounded bg-white" style={{ width: "100%", maxWidth: "450px" }}>
        <h4 className="text-center mb-4">Đặt lại mật khẩu</h4>

        <form>
          <div className="mb-3">
            <label className="form-label">Mật khẩu mới</label>
            <input type="password" className="form-control" placeholder="Nhập mật khẩu mới" />
          </div>
          <div className="mb-3">
            <label className="form-label">Xác nhận mật khẩu</label>
            <input type="password" className="form-control" placeholder="Nhập lại mật khẩu" />
          </div>

          {/* Mã xác nhận */}
          <div className="mb-3">
            <label className="form-label">Xác nhận là con người</label>
            <div className="d-flex align-items-center">
              <img
                src="/captcha.png" // Đặt ảnh captcha vào thư mục "public" và đổi tên cho dễ gọi
                style={{ height: "120px", MozContextProperties: "10px" }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Xác nhận
          </button>
          <p className="text-center mt-3">
            Quay lại <Link to="/dang-nhap">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
