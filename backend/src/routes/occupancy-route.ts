import { Router } from "express";

export const occupancyRouter = Router();

import { updateRoomOccupancy } from "../controller/occupancy-controller";

occupancyRouter.put("/", updateRoomOccupancy);