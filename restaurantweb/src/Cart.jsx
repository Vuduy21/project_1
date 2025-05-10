import React, { useState, useEffect } from "react"; // Thêm useEffect, useState
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); 

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div>
      <div className="bg-light py-2 px-4 d-flex justify-content-between align-items-center border-bottom fixed-top">
        <div className="d-flex align-items-center">
          <span className="me-2">🛒</span> 
          <strong>
            Xin chào, <span className="text-dark">{username || "Khách"}</span>
          </strong>
        </div>
        <div className="d-flex gap-2">
          
          <Link to="/doi-mat-khau" className="btn btn-outline-secondary btn-sm">
            Đổi mật khẩu
          </Link>
          <Link to="/phan-hoi" className="btn btn-outline-info btn-sm">
            Gửi phản hồi
          </Link>
          <Link to="/home2" className="btn btn-outline-danger btn-sm"> 
            Đăng xuất
          </Link>
        </div>
      </div>
      <div style={{ paddingTop: "80px" }}>
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/home")}
            >
              ← Tiếp tục mua sắm
            </button>
            {cartItems.length > 0 && (
               <h5 className="mb-0">Giỏ hàng của bạn ({totalItems} sản phẩm)</h5>
            )}
          </div>
          

          {cartItems.length === 0 ? (
            <div className="text-center py-5">
                <img src='empty-cart.jpg' alt="Giỏ hàng trống" style={{width: "400px", marginBottom: "200px"}} /> 
                <h4>Giỏ hàng của bạn đang trống</h4>
                <p className="text-muted">Hãy chọn thêm sản phẩm để mua nhé!</p>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/home")}
                >
                    Khám phá sản phẩm
                </button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle"> 
                  <thead className="table-light">
                    <tr>
                      <th style={{width: "10%"}}>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th style={{width: "15%"}}>Đơn giá</th>
                      <th style={{width: "15%"}} className="text-center">Số lượng</th>
                      <th style={{width: "15%"}}>Thành tiền</th>
                      <th style={{width: "10%"}} className="text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => ( 
                      <tr key={item.FoodID}> 
                        <td>
                          <img
                            src={item.img} 
                            alt={item.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "4px"
                            }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price.toLocaleString()} đ</td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <button
                              className="btn btn-outline-secondary btn-sm px-2" 
                              onClick={() => removeFromCart(item)}
                              disabled={item.quantity <= 1} 
                            >
                              -
                            </button>
                            <span className="mx-1">{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary btn-sm px-2"
                              onClick={() => addToCart(item)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          {(item.price * item.quantity).toLocaleString()} đ
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteFromCart(item)}
                          >
                            🗑️ Xóa {/* Icon thùng rác */}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-light rounded">
                <div className="d-flex justify-content-between">
                    <h5>Tổng số lượng:</h5>
                    <h5>{totalItems}</h5>
                </div>
                <hr/>
                <div className="d-flex justify-content-between">
                    <h4>Tổng tiền:</h4>
                    <h4 className="text-danger">
                    {totalPrice.toLocaleString()} đ
                    </h4>
                </div>
              </div>
            </>
          )}

          {cartItems.length > 0 && (
            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn btn-success btn-lg" 
                onClick={() => navigate("/dat-hang")}
              >
                Tiến hành đặt hàng →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;


