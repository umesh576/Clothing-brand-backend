import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/ConnectDatabase";
import userRoutes from "./routes/user.routes";
import clothCategoryRoutes from "./routes/ClothCategory.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "";
connectDatabase(DB_URI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/cloth-category", clothCategoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
