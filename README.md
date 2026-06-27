# Food Waste Management System (FoodCare)

FoodCare is a production-ready MERN stack application designed to reduce food waste by connecting food donors (restaurants, households) with NGOs and charities.

## 🚀 Features

### Authentication System
- Role-based Login/Signup (Donor, NGO, Admin)
- Secure password hashing using bcrypt
- JWT-based authentication & protected routes

### User Roles & Functionalities
- **Donors**: 
  - Create food donation listings with title, quantity, location, and expiry time.
  - View donation history and track status.
- **NGOs**: 
  - View all available food donations.
  - Accept donation requests and update pickup status to 'completed'.
  - View assigned donations.
- **Admins**: 
  - Dashboard overview with system stats.
  - Manage users (block/unblock/delete).
  - Monitor all transactions.

### Modern UI/UX
- Responsive design using Tailwind CSS.
- Clean and premium aesthetics with Lucide icons.
- Real-time notifications using React-Toastify.
- Search and filter functionality for available donations.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, React Router, Axios, Lucide React, React-Toastify.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ORM).
- **Security**: JWT, bcryptjs.

---

## 📂 Folder Structure

```text
Final-year-mern-project/
├── backend/            # Express Server
│   ├── config/         # Database connection
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth & Error handling
│   ├── models/         # Mongoose schemas
│   └── routes/         # API endpoints
└── frontend/           # React App (Vite)
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # Auth context
    │   ├── pages/      # Application pages
    │   └── services/   # API communication (Axios)
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB (Local or Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd Final-year-mern-project
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
Run backend:
```bash
npm run dev # or node server.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Run frontend:
```bash
npm run dev
```

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token
- `GET /api/auth/me` - Get current user profile (Private)

### Donations
- `GET /api/donations` - Get all donations (with status filter)
- `POST /api/donations` - Create a new donation (Donor)
- `GET /api/donations/mydonations` - Get logged-in donor's donations
- `GET /api/donations/myaccepted` - Get NGO's accepted donations
- `PUT /api/donations/:id/status` - Update donation status (NGO/Admin)
- `DELETE /api/donations/:id` - Delete donation (Donor/Admin)

### Admin
- `GET /api/admin/stats` - Get system-wide statistics (Admin)
- `GET /api/admin/users` - Get list of all users (Admin)
- `PUT /api/admin/users/:id/status` - Block/Unblock user (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Admin)

---

## 🔮 Future Enhancements
- Map integration for pickup location visualization.
- Real-time chat between Donors and NGOs.
- Push notifications for new donations.
- Image uploads for food items.
