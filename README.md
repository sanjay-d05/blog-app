
# 📰 MERN Blog Platform

A modern, full-featured **Blog Application** built using the **MERN stack**, with a blazing-fast frontend powered by **React + Vite** and styled using the elegant and accessible **shadcn/ui** component library.

This application supports user authentication, blog post management, image uploads, filtering, and a fully responsive UI.

---

## 📌 Table of Contents

- [Demo](#-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Screenshots](#-screenshots)
- [License](#-license)
- [Author](#-author)

---

## 🔗 Demo

> Live demo: [Check here](https://blog-app-client-z7qz.onrender.com)

---

## ✨ Features

- 🔐 Secure User Authentication with JWT
- 📝 Blog Post Creation, Editing, Deletion (CRUD)
- 🖼 Image Uploads via Cloudinary
- 🗂 Blog Categories and Tagging System
- 🔎 Search & Filter Functionality
- 👤 User Dashboard with Profile Management
- 🧩 Dynamic Routing with Slugs
- 💻 Fully Responsive UI using shadcn/ui + Tailwind CSS
- ⚙️ Modular and Scalable Codebase

---

## 🛠 Tech Stack

### Frontend

- **React + Vite**
- **shadcn/ui** (Radix UI + Tailwind CSS)
- **React Router DOM**
- **Axios**
- **Redux Toolkit** (optional for state management)

### Backend

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT for Auth**
- **Cloudinary for Media Storage**
- **bcrypt for Password Hashing**
- **dotenv for Config Management**

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sanjay-d05/blog-app.git
cd mern-blog-app
````

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

---

## 📦 Scripts

### Backend

| Command       | Description                |
| ------------- | -------------------------- |
| `npm run dev` | Start backend with nodemon |

### Frontend

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start Vite development server |
| `npm run build` | Build frontend for production |

---

## 🖼 Screenshots

### 🔐 Login Page Screenshot

<img src="https://raw.githubusercontent.com/sanjay-d05/blog-app/main/client/public/loginPageScreenshot.jpeg" alt="Login Page Screenshot" width="600"/>

### 🏠 Home Feed

<img src="https://raw.githubusercontent.com/sanjay-d05/blog-app/main/client/public/homePageScreenshot.jpeg" alt="Login Page Screenshot" width="600"/>

### ✏️ Blogs Page

<img src="https://raw.githubusercontent.com/sanjay-d05/blog-app/main/client/public/blogsPageScreenshot.jpeg" alt="Login Page Screenshot" width="600"/>

### 👤 Profile / Dashboard

<img src="https://raw.githubusercontent.com/sanjay-d05/blog-app/main/client/public/profilePageScreenshot.jpeg" alt="Login Page Screenshot" width="600"/>

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sanjay D**  
MERN Stack Developer  

---

> Contributions and feedback are welcome. Feel free to open an issue or pull request!



