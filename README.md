# 🎬 CineBook

CineBook is a full-stack movie ticket booking application where users can browse movies, select showtimes, choose seats, and pay securely using **PhonePe**. Built using **React**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**.

---

## 🚀 Features

- 🎥 View available movies and their details
- 🕒 Showtimes with real-time seat selection
- 💳 PhonePe payment integration
- ✅ Booking confirmation and seat locking
- 🧾 API-based backend for movies & bookings

---

## 🧰 Tech Stack

| Layer      | Technology              |
|------------|--------------------------|
| Frontend   | React + Vite + Tailwind |
| Backend    | Node.js + Express       |
| Database   | MongoDB + Mongoose      |
| Payment    | PhonePe API             |
| Styling    | Tailwind CSS            |

---

## 📁 Project Structure

```
cinebook/
├── backend/               # Express server
│   ├── index.js           # Entry point
│   ├── models/            # Mongoose schemas (Booking, Movie)
│   ├── routes/            # API routes
│   └── services/          # PhonePe integration
│
└── frontend/              # React app
    ├── index.html         # Entry HTML
    ├── components/        # Reusable components (if any)
    ├── tailwind.config.js # Tailwind setup
    └── vite.config.mjs    # Vite config
```

---

## 🛠 Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=5000
MONGODB_URI=your_mongo_connection_string
PHONEPE_BASE_URL=https://api.phonepe.com
PHONEPE_API_KEY=your_phonepe_api_key
```

Start the server:

```bash
node index.js
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

| Method | Route                     | Description             |
|--------|---------------------------|-------------------------|
| GET    | `/api/movies`            | Fetch all movies        |
| GET    | `/api/movies/:id`        | Get movie by ID         |
| POST   | `/api/bookings`          | Book movie tickets      |
| POST   | `/api/bookings/callback` | PhonePe payment callback|

---

## 📌 Future Enhancements

- 🔐 User authentication (JWT)
- 🛠 Admin panel for managing movies & shows
- 📩 Booking confirmation emails
- ☁️ Deployment with Vercel/Railway
- 📱 Mobile responsive UI

---

## 🙌 Contributing

Feel free to fork this repo and submit a pull request. Suggestions and improvements are always welcome.

---

## 📬 Contact

Made with ❤️ by Ritik Raj —

