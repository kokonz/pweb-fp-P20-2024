import { Router } from "express";

export const invoiceRouter = Router();

import { createInvoice, getInvoices } from "../controller/invoice-controller";

invoiceRouter.post("/", createInvoice);
invoiceRouter.post("/get", getInvoices);