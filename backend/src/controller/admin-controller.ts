import { Request, Response } from "express";
import { Room } from "../models/room-model";

export const getRoomDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const roomDetails = await Room.find().select("-__v");
    
    res.status(200).json({
      status: 200,
      success: true,
      message: "Room details retrieved successfully",
      data: roomDetails,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateRoomData = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { occupied, username, rent_periods } = req.body;
  
  try {
    const room = await Room.findOneAndUpdate(
      { id: id },
      { 
        occupied: occupied,
        username: username,
        rent_periods: rent_periods 
      },
      { new: true }
    ).select("-__v");
    
    if (!room) {
      res.status(404).json({
        message: "Room not found",
      });
      return;
    }
    
    res.status(200).json({
      message: "Room data updated successfully",
      data: room,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};