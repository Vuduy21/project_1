import React, { useState, useEffect } from "react"; 
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

function Order() {
  const { cartItems, clearCart } = useCart(); 
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ 
    name: "",
  });
  const [username, setUsername] = useState(""); 

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!customerInfo.name) {
      toast.error("Vui lòng nhập họ và tên!");
      setIsSubmitting(false);
      return;
    }

    const CustomerID = localStorage.getItem("CustomerID");
    if (!CustomerID) {
      toast.error("Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại.");
      setIsSubmitting(false);
      navigate("/login"); 
      return;
    }

    const TotalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const itemsWithoutFoodID = cartItems.filter(item => typeof item.FoodID === 'undefined' || item.FoodID === null);
    if (itemsWithoutFoodID.length > 0) {
        toast.error("Một số sản phẩm trong giỏ hàng bị thiếu thông tin (FoodID). Vui lòng thử thêm lại.");
        console.error("Items missing FoodID:", itemsWithoutFoodID);
        setIsSubmitting(false);
        return;
    }

    try {
      const orderPayload = {
        CustomerID: parseInt(CustomerID, 10), 
        TotalAmount,
        CartItems: cartItems.map((item) => ({
          FoodID: item.FoodID, 
          Quantity: item.quantity,
          Price: item.price, 
        })),

      };

      console.log("Sending order payload:", orderPayload); 

      const response = await axios.post(
        "http://localhost:3001/api/order",
        orderPayload
      );

      if (response.status === 201) {
        toast.success("✅ Đặt hàng thành công!");
        clearCart();
        navigate("/home"); 
      } else {
        
        toast.error(response.data.message || "Đặt hàng không thành công.");
      }
    } catch (error) {
      console.error(
        "Lỗi đặt hàng:",
        error.response?.data || error.message
      );
      const errorMessage = error.response?.data?.error || error.response?.data?.details || "❌ Lỗi khi đặt hàng!";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <div className="bg-light py-2 px-4 d-flex justify-content-between align-items-center border-bottom fixed-top">
        <div className="d-flex align-items-center">
          <span className="me-2">📰</span>
          <strong>
            Xin chào, <span className="text-dark">{username || "Khách"}</span>
          </strong>
        </div>
        <div className="d-flex gap-2">
          <Link to="/gio-hang" className="btn btn-outline-secondary btn-sm">
            Xem giỏ hàng
          </Link>
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
        <div className="container my-5">
          <h2 className="text-center mb-4">Xác nhận đơn hàng</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header bg-light">
                  <h4 className="mb-0">Giỏ hàng của bạn</h4>
                </div>
                <div className="card-body">
                  {cartItems.length === 0 ? (
                    <p className="text-muted">Giỏ hàng trống</p>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {cartItems.map((item, index) => (
                        <li
                          key={`${item.FoodID}-${index}`} 
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <strong>{item.name}</strong>
                            <span className="text-muted ms-2">
                              (x{item.quantity})
                            </span>
                          </div>
                          <span>
                            {(item.price * item.quantity).toLocaleString()}đ
                          </span>
                        </li>
                      ))}
                      <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                        <span>Tổng cộng:</span>
                        <span>{totalAmount.toLocaleString()}đ</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-light">
                  <h4 className="mb-0">Thông tin giao hàng</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Họ và tên người nhận
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {/* // Thêm các trường này nếu bạn muốn gửi lên BE
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Số điện thoại</label>
                      <input type="tel" className="form-control" id="phone" name="phone" value={customerInfo.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Địa chỉ nhận hàng</label>
                      <textarea className="form-control" id="address" name="address" rows="3" value={customerInfo.address} onChange={handleInputChange} required></textarea>
                    </div>
                    */}
                    <button
                      type="submit"
                      className="btn btn-success w-100 py-2"
                      disabled={cartItems.length === 0 || isSubmitting}
                    >
                      {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
