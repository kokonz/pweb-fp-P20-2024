import { Request, Response } from "express";
import { RoomOccupancy } from "../models/occupancy-model";

export const updateRoomOccupancy = async (req: Request, res: Response): Promise<void> => {
    try {
        const { empty, filled } = req.body;
        
        if (typeof empty !== "number" || typeof filled !== "number") {
            res.status(400).json({ error: "Invalid input. 'empty' and 'filled' must be numbers." });
            return;
        }
        
        const result = await RoomOccupancy.findByIdAndUpdate(
            "6766ee16e2d1556a0904f8fd",
            { empty, filled },
            { new: true }
        );
        
        if (!result) {
            res.status(404).json({ error: "RoomOccupancy document not found." });
            return;
        }
        
        res.status(200).json({ message: "RoomOccupancy updated successfully.", data: result });
    } catch (error) {
        console.error("Error updating RoomOccupancy:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};
