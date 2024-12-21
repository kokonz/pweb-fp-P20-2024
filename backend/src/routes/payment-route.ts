import { Router } from "express";

export const paymentRouter = Router();

import { createPayment, getPayments } from "../controller/payment-controller";

paymentRouter.post("/", createPayment);
paymentRouter.get("/", getPayments);
