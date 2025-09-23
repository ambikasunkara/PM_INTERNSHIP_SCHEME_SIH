import express from "express";
import cors from "cors";
import internshipRoutes from "./routes/internshipRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/internships", internshipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
