import { Router } from "express";

export const authRouter = Router();

import { Login } from "../controller/home-controller";
import { AdminDashboard, GetPenghuniDetail, GetLaporanFasilitas, GetLaporanPenghuni } from "../controller/admin-controller";

// Auth Routes
authRouter.post("/", Login);

// Admin Routes
authRouter.get("/admin/dash", AdminDashboard);
authRouter.get("/admin/detail/:id", GetPenghuniDetail);
authRouter.get("/admin/laporan/fasilitas", GetLaporanFasilitas);
authRouter.get("/admin/laporan/penghuni", GetLaporanPenghuni);
