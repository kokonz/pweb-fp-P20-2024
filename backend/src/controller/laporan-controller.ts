import { Request, Response } from "express";
import { DamageReporting } from "../models/laporan-fasilitas-model";
import { UserReport } from "../models/laporan-penghuni-model";
import { User } from "../models/home-model";

export const createDamageReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, message } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                status: 404,
                message: "User not found",
            });
            return;
        }
        
        const newDamageReport = {
            user: user._id,
            message,
        };
        
        const damageReport = await DamageReporting.create(newDamageReport);
        
        res.status(201).json({
            status: 201,
            success: true,
            message: "Damage report created successfully",
            data: damageReport,
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

export const createUserReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body;
        
        const newUserReport = {
            message,
        };
        
        const userReport = await UserReport.create(newUserReport);
        
        res.status(201).json({
            status: 201,
            success: true,
            message: "User report created successfully",
            data: userReport,
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

export const getDamageReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const damageReports = await DamageReporting.find()
        .populate("user", "username role")
        .select("-__v");
        
        res.status(200).json({
            status: 200,
            success: true,
            message: "Damage reports retrieved successfully",
            data: damageReports,
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

export const getUserReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const userReports = await UserReport.find().select("-__v");
        
        res.status(200).json({
            status: 200,
            success: true,
            message: "User reports retrieved successfully",
            data: userReports,
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
