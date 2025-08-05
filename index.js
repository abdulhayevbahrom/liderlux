require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConfig");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const notfound = require("./middleware/notfound.middleware");
const router = require("./routes/router");
const authMiddleware = require("./middleware/AuthMiddleware");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS sozlamalari
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};
app.use(cors(corsOptions));

(async () => {
  await connectDB();
})();

app.use("/api", authMiddleware, router); // Routerlarni ulash
app.get("/", (req, res) => res.send("Salom dunyo")); // Bosh sahifa
app.use(notfound); // 404 middleware

// Serverni ishga tushirish
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
