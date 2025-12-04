import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cron from "node-cron";

// DB
import connectDB from "./src/config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import policyRoutes from "./routes/policy.routes.js";
import claimRoutes from "./routes/claim.routes.js";

// Jobs
import { renewalReminderJob } from "./jobs/renewal.job.js";

// Middlewares
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();
connectDB();

const app = express();

// ----------- MIDDLEWARES -----------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// ----------- BASE ROUTE -----------
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "✅ Policy Management System API is running"
  });
});

// ----------- API ROUTES -----------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/claims", claimRoutes);

// ----------- CRON JOB (DAILY @ 9AM) -----------
// Runs everyday at 09:00 AM for Renewal reminder
cron.schedule("0 9 * * *", async () => {
  console.log("⏰ Running renewal reminder job...");
  await renewalReminderJob();
});

// ----------- ERROR HANDLER -----------
app.use(errorHandler);

// ----------- SERVER START -----------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
