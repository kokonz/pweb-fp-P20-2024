import express from "express";
import { connectToDatabase } from "./db-connection";
import { authRouter } from "./routes/home-route";
import { Verification } from "./middleware/auth";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});

app.use("/", authRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

connectToDatabase();