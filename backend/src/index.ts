import express from "express";
import { connectToDatabase } from "./db-connection";
import { authRouter } from "./routes/home-route";
import { invoiceRouter } from "./routes/invoice-route";
import { paymentRouter } from "./routes/payment-route";
import { laporanRouter } from "./routes/laporan-route";
import { adminRouter } from "./routes/admin-route";
import { occupancyRouter } from "./routes/occupancy-route";
import { Verification } from "./middleware/auth";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});

app.use("/", authRouter);
app.use("/invoice", invoiceRouter);
app.use("/payment", paymentRouter);
app.use("/laporan", laporanRouter);
app.use("/admin", adminRouter);
app.use("/occupancy", occupancyRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

connectToDatabase();