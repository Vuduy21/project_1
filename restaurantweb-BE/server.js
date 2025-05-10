const express = require('express');
const app = express();
const cors = require('cors');

const customerRoutes = require('../restaurantweb-BE/routes/customerRoutes');

app.use(cors());
app.use(express.json());

// Đăng ký các route
app.use('/api', customerRoutes); // 
console.log("Đã đăng ký route /api/*");

// Khởi động server
app.listen(3001, () => {
  console.log('Server đang chạy tại http://localhost:3001');
});