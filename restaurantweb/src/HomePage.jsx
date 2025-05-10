import { useCart } from "./CartContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HomePage() {
  const { addToCart } = useCart();
  const [username, setUsername] = useState("");
  const [menuItems, setMenuItems] = useState([]); 

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    
    const initialMenuItems = [
      { FoodID: 1, name: "Pepsi", price: 10000, img: 'pepsi.jpg' }, 
      { FoodID: 2, name: "Coca-cola", price: 11000, img: 'coca.jpg' },
      { FoodID: 3, name: "Cơm rang", price: 55000, img: 'rice.jpg' },
      { FoodID: 4, name: "Rau muống xào tỏi", price: 40000, img: 'rau.jpg' },
      { FoodID: 5, name: "Thịt bò kho", price: 88000, img: 'beef.jpg' },
      
    ];
    setMenuItems(initialMenuItems);
  }, []);

  const handleAddToCart = (item) => {
    
    addToCart(item);
    toast.success(`Đã thêm ${item.name} vào giỏ hàng!`);
  };

  return (
    <div>
      <div className="bg-light py-2 px-4 d-flex justify-content-between align-items-center border-bottom fixed-top" style={{zIndex: 1030}}>
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

      
      <div style={{ paddingTop: "70px" }}> 
        {/* Carousel quảng cáo */}
        <div className="container mb-4">
          <div
            id="carouselExample"
            className="carousel slide shadow rounded"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                  className="d-block w-100 rounded"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                  alt="banner 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
                  className="d-block w-100 rounded"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                  alt="banner 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                  className="d-block w-100 rounded"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                  alt="banner 3"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>

        {/* Menu món ăn */}
        <div className="container mt-4">
          <div className="row">
            {menuItems.map((item) => ( 
              <div className="col-md-4 col-lg-3 mb-4" key={item.FoodID}> 
                <div className="card h-100">
                  <img
                    src={item.img} 
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }} 
                  />
                  <div className="card-body d-flex flex-column"> 
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.price.toLocaleString()}đ</p>
                    <div className="mt-auto"> 
                      <button
                        className="btn btn-success w-100" 
                        onClick={() => handleAddToCart(item)}
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;



