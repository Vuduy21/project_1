import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";

function Login() {
    const navigate = useNavigate(); 
    const [phone, setPhone] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); 
        setError('');

        try {
            const response = await axios.post("http://localhost:3001/api/login", {
                Phone_customer: phone,
                Password: password
            });

            if (response.status === 200) {
                const customer = response.data.customer;

                // Lưu customerID,username và phone vào localStorage
                localStorage.setItem("CustomerID", customer.CustomerID);
                localStorage.setItem("username", customer.CustomerName || "Người dùng");
                localStorage.setItem("phone", customer.Phone_customer);

                console.log("Đăng nhập thành công!", customer);
                navigate("/home");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("Lỗi kết nối server.");
            }
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1950&q=80")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="row shadow p-4 rounded"
                style={{
                    maxWidth: "800px",
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                }}>
                <div className="col-md-6 d-none d-md-block">
                    <img src="res2.jpg" alt="Restaurant"
                        className="img-fluid"
                        style={{ height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                </div>

                <div className="col-md-6">
                    <h3 className="mb-4 text-center">Đăng Nhập</h3>

                    <form onSubmit={handleLogin}>
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

                        <div className="mb-1">
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3 text-end">
                            <Link to="/quen-mat-khau" className="text-decoration-none small text-primary">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        {error && (
                            <div className="alert alert-danger small p-2 mb-3" role="alert">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary w-100">
                            Đăng nhập
                        </button>

                        <p className="text-center mt-3">
                            Chưa có tài khoản? <Link to="/dang-ky">Tạo tài khoản</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;


