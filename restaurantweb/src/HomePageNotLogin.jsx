import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

function HomePageNotLogin() {
  return (
    <div>
      {/* Thanh trên cùng */}
      <div className="bg-light py-2 px-4 d-flex justify-content-between align-items-center border-bottom">
        <div>
          <strong>Tài khoản:</strong> Chưa đăng nhập
        </div>
        <div>
          <Link to="/dang-nhap" className="btn btn-outline-primary btn-sm me-2">
            Đăng nhập
          </Link>
        </div>
      </div>

      {/* Carousel quảng cáo */}
      <div className="container mb-4">
  <div id="carouselExample" className="carousel slide shadow rounded" data-bs-ride="carousel">
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

    {/* Nút chuyển ảnh */}
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
</div>

      {/* Menu món ăn */}
      <div className="container mt-4">
        <div className="row">
          {[
            { name: "Pepsi", price: 10000, img: "pepsi.jpg" },
            { name: "Coca-cola", price: 11000, img: "coca.jpg" },
            { name: "Cơm rang", price: 55000, img: "rice.jpg" }, 
            { name: "Rau muống xào tỏi", price: 40000, img: "rau.jpg" },
            { name: "Thịt bò kho", price: 88000, img: "beef.jpg" }  
          ].map((item, idx) => (
            <div className="col-md-3 mb-4" key={idx}>
              <div className="card h-100">
                <img
                  src={item.img} 
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "150px", objectFit: "cover" }}
                   
                />
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h6>{item.name}</h6>
                    <p>{item.price.toLocaleString()}đ</p>
                  </div>
                  <div className="d-flex justify-content-around mt-2">
                    <button className="btn btn-outline-secondary btn-sm" disabled>Chọn</button>
                    <button className="btn btn-outline-secondary btn-sm" disabled>Xem</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePageNotLogin;