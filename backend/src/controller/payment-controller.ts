import { Request, Response } from "express";
import { Payment } from "../models/payment-model";

export const createPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { total_bill, payment_method, rent_periods } = req.body;
        
        if (![3, 6].includes(rent_periods)) {
            res.status(400).json({
                status: 400,
                message: "Invalid rent periods. Allowed values are 3 or 6 months.",
            });
            return;
        }
        
        if (!Object.values(Payment.schema.path('payment_method').options.enum).includes(payment_method)) {
            res.status(400).json({
                status: 400,
                message: `Invalid payment method. Allowed values are ${Object.values(Payment.schema.path('payment_method').options.enum).join(", ")}.`,
            });
            return;
        }
        
        const newPayment = {
            total_bill,
            payment_method,
            rent_periods,
        };
        
        const payment = await Payment.create(newPayment);
        
        res.status(201).json({
            status: 201,
            success: true,
            message: "Payment created successfully",
            data: payment,
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

export const getPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const payments = await Payment.find().select("-__v");
        
        res.status(200).json({
            status: 200,
            success: true,
            message: "Payments retrieved successfully",
            data: payments,
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
