const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


// Tạo schema cho model User
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
});

// Tạo model User dựa trên schema đã định nghĩa
const User = mongoose.model('User', userSchema);

// Middleware để xử lý yêu cầu gửi dữ liệu JSON
app.use(express.json());

// Xử lý các yêu cầu POST tới endpoint "/signup"
app.post('/signup', async (req, res) => {
  try {
    // Lấy thông tin từ yêu cầu
    const { name, email, password, phoneNumber } = req.body;

    // Kiểm tra xem người dùng đã tồn tại hay chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Người dùng đã tồn tại' });
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo một user mới
    const newUser = new User({ name, email, password: hashedPassword, phoneNumber });

    // Lưu user vào cơ sở dữ liệu
    await newUser.save();

    // Trả về phản hồi thành công
    return res.status(200).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
});

// Xử lý các yêu cầu POST tới endpoint "/login"
app.post('/login', async (req, res) => {
  try {
    // Lấy thông tin từ yêu cầu
    const { email, password } = req.body;

    // Tìm người dùng trong cơ sở dữ liệu dựa trên email
    const user = await User.findOne({ email });

    // Kiểm tra xem người dùng có tồn tại hay không
    if (!user) {
      return res.status(400).json({ error: 'Người dùng không tồn tại' });
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Mật khẩu không hợp lệ' });
    }

    // Trả về phản hồi thành công và dữ liệu người dùng
    return res.status(200).json({ message: 'Đăng nhập thành công', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
});

// Xử lý các yêu cầu POST tới endpoint "/resetpassword"
app.post('/resetpassword', async (req, res) => {
  try {
    // Lấy thông tin từ yêu cầu
    const { email, newPassword } = req.body;

    // Tìm người dùng trong cơ sở dữ liệu dựa trên email
    const user = await User.findOne({ email });

    // Kiểm tra xem người dùng có tồn tại hay không
    if (!user) {
      return res.status(400).json({ error: 'Người dùng không tồn tại' });
    }

    // Băm mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới cho người dùng
    user.password = hashedPassword;
    await user.save();

        // Trả về phản hồi thành công
        return res.status(200).json({ message: 'Lấy lại mật khẩu thành công' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Lỗi máy chủ' });
      }
    });
    
    // Khởi chạy server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    
