import express from "express";
import cors from "cors";
import db from "./config/database.js";
import dotenv from "dotenv";
import ontRoutes from "./routes/ontRoute.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const testDatabaseConnection = async () => {
  try {
    await db.authenticate();
    console.log("Koneksi database berhasil.");
  } catch (error) {
    console.error("Koneksi database gagal:", error);
    process.exit(1);
  }
};

testDatabaseConnection();

app.get("/", (req, res) => {
  res.send("Backend Dismantle API Berjalan!");
});

app.use(ontRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
