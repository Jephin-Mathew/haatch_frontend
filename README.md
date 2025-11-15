# Haatch Learning -- Frontend (React)

This is the **React frontend** for the **Online Course Purchase Portal** task for

**Haatch Interactive Pvt. Ltd.**

The frontend provides:

- User Registration & Login (JWT-based)

- View all available courses

- Add to Cart and purchase using **Razorpay Checkout**

- View & access purchased courses ("My Courses")

- Full admin panel:

  - Dashboard

  - User Management

  - Orders & Order Details

  - Course Management (Create, Edit, Delete)

This project consumes the Laravel API from the backend repo.

---

## 🧰 Tech Stack

- **React 19**

- **React Router v7**

- **Axios**

- **Bootstrap 5**

- **JWT Authentication**

- **Razorpay Checkout (client-side)**

---

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash

git clone https://github.com/Jephin-Mathew/haatch_frontend.git

cd haatch_frontend

2️⃣ Install dependencies

bash

Copy code

npm install

This project uses:

Node v18+

NPM v10+

3️⃣ Create .env

Create .env in the root:

ini

Copy code

REACT_APP_API_URL=http://127.0.0.1:8000/api

REACT_APP_RAZORPAY_KEY=rzp_test_1234567890

The Razorpay key must match the backend .env key

RAZORPAY_KEY_ID=...

Your frontend uses this to open the payment gateway.

4️⃣ Start the development server

bash

Copy code

npm start

The app will be available at:

arduino

Copy code

http://localhost:3000

🔗 Backend API Dependency

This frontend requires the Laravel backend running:

bash

Copy code

https://github.com/Jephin-Mathew/haatch_backend

Backend must be running on:

cpp

Copy code

http://127.0.0.1:8000

🔐 Authentication Flow

After login, JWT token is stored in localStorage

Axios automatically attaches:

makefile

Copy code

Authorization: Bearer <token>

Protected pages include:

/courses

/cart

/my-courses

All admin routes (via ProtectedAdminRoute)

💳 Payment Flow (Razorpay)

User adds items to the cart

User clicks Pay Now

Frontend calls backend /create-order

Backend returns:

razorpay_order_id

amount

key

Frontend opens Razorpay popup

Razorpay calls backend webhook

Backend:

Marks order as paid

Creates purchase entries

Clears the cart

User sees purchased course under /my-courses

✔️ Test Card Numbers

Network  Card Number  CVV  Expiry

Mastercard  2305 3242 5784 8228  Any  Any future date

Visa  4386 2894 0766 0153  Any  Any future date

🧪 Scripts

Start development:

bash

Copy code

npm start

Build for production:

bash

Copy code

npm run build

Run tests:

bash

Copy code

npm test

🌐 Available Pages

Student Features

Page  Path  Description

Login  / or /login  JWT authentication

Register  /register  Create account

Courses  /courses  Browse & buy courses

Cart  /cart  Checkout using Razorpay

My Courses  /my-courses  View purchased courses

Course Viewer  /course/:slug  View course content

Admin Features

Page  Description

Dashboard  Overview navigation

Manage Courses  Create/edit/delete courses

Manage Users  View/delete users & edit roles

View Orders  See all orders

Order Details  Full order breakdown

💡 Notes

Navbar is hidden on /, /login, /register

Role-based redirection:

Students → /courses

Admins → /admin/dashboard

Clean UI using Bootstrap + custom layout enhancements

📝 Submission Summary

Frontend Framework: React 19

Routing: React Router 7

UI: Bootstrap 5

State / API: Axios

Payments: Razorpay Checkout

JWT Auth: Integrated with Laravel backend