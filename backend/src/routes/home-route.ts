import { Router } from "express";

export const authRouter = Router();

import { Login, getUserId } from "../controller/home-controller";

authRouter.post("/", Login);
authRouter.post("/getId", getUserId);