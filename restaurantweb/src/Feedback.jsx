import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invalidChars = /[^\p{L}\p{N}\s.,?!]/u;


    if (!content.trim()) {
      alert("❌ Nội dung phản hồi không được để trống!");
      return;
    }
    if (invalidChars.test(content)) {
      alert("❌ Nội dung phản hồi chứa ký tự không hợp lệ!");
      return;
    }

    try {
      const customerID = localStorage.getItem("CustomerID"); 
      console.log("CustomerID trong localStorage:", customerID);

      const response = await axios.post("http://localhost:3001/api/feedback", {
        CustomerID: customerID,
        Content: content,
      });

      if (response.status === 200) {
        alert("✅ Gửi phản hồi thành công!");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Lỗi khi gửi phản hồi!");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: "linear-gradient(to right, #e0eafc, #cfdef3)", padding: "20px" }}>
      <div className="card shadow p-4 d-flex flex-row" style={{ maxWidth: "800px", width: "100%", borderRadius: "15px" }}>
        <div className="me-4 d-none d-md-block">
          <img src="feedback.jpg" alt="Feedback Illustration" style={{ width: "255px", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
        </div>

        <div className="flex-grow-1">
          <h3 className="text-center mb-4">📝 Gửi phản hồi</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Nội dung phản hồi</label>
              <textarea className="form-control" rows="5" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Nhập phản hồi của bạn..." style={{ resize: "none" }}></textarea>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button type="submit" className="btn btn-primary px-4">Gửi</button>
              <button type="button" className="btn btn-secondary px-4" onClick={handleCancel}>Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;


