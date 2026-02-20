# Student Management & Authentication API
### Backend System – Node.js | Express | MongoDB

A secure REST API for managing students with authentication, authorization, OTP verification, and media upload support. This project demonstrates backend architecture, JWT security, validation, and structured API handling.

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (Access + Refresh Tokens)
- **Password Security**: bcrypt
- **Validation**: Joi
- **File Upload**: Multer + Cloudinary
- **Email Service**: Nodemailer

---

## 🚀 Features

- Student CRUD APIs
- Secure Signup & Login
- JWT Authentication (Access & Refresh Tokens)
- OTP Email Verification Flow
- Middleware-Based Route Protection
- Centralized Response Handler
- Joi Request Validation
- Profile Image Upload via Cloudinary

---

## 📂 Project Structure

```
src/
├── utils/
├── controllers/
├── middleware/
├── models/
├── routes/
├── validations/
├── app.js
├── db.js
└── server.js
```

---

## ⚙️ Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/student-management-auth-api.git
cd student-management-auth-api
```
### 2️⃣ Install Dependencies
```
npm install
```
### 3️⃣ Environment Variables
```
Create a .env file:

PORT=4000
MONGO_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
```
### 4️⃣ Run Server
```
npm run dev

Server runs on:
http://localhost:4000
```
### 🔐 Security Highlights

- Password hashing with bcrypt

- Access + Refresh token flow

- Protected routes via middleware

- Input validation with Joi

- Structured error handling

### 📜 License

- For educational and internship purposes.