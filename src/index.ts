import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/ConnectDatabase";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "";
connectDatabase(DB_URI);
app.get("/", (req, res) => {
  res.send("Hello, World! joshi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
