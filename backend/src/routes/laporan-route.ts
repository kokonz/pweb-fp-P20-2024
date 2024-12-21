import { Router } from "express";

export const laporanRouter = Router();

import { createDamageReport, createUserReport, getDamageReports, getUserReports } from "../controller/laporan-controller";

laporanRouter.post("/fasilitas", createDamageReport);
laporanRouter.post("/penghuni", createUserReport);
laporanRouter.get("/fasilitas", getDamageReports);
laporanRouter.get("/penghuni", getUserReports);