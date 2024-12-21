import { Router } from "express";

export const authRouter = Router();

import { Login, getUserId, getUserRole, getUserData, getUserById } from "../controller/home-controller";

authRouter.post("/", Login);
authRouter.post("/getId", getUserId);
authRouter.post("/getRole", getUserRole);
authRouter.get("/getUser", getUserData);
authRouter.post("/getUser", getUserById);