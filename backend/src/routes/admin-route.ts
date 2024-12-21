import { Router } from "express";

export const adminRouter = Router();

import { getRoomDetails, updateRoomData } from "../controller/admin-controller";

adminRouter.get("/rooms", getRoomDetails);
adminRouter.put("/rooms/:id", updateRoomData);