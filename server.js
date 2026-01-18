import express from "express";
import cors from "cors";
import onboardRoutes from "./app/onboard/onboard.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/onboard", onboardRoutes);

app.listen(8000, () => {
  console.log("API running at http://localhost:8000");
});
