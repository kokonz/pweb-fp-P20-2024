import { Request, Response } from "express";
import { User } from "../models/home-model";
import { Invoice } from "../models/invoice-model";

export const createInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, bill } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }

    const newInvoice = {
      user: user._id,
      invoice_history: [
        {
          bill,
          created_at: new Date(),
        },
      ],
    };

    const invoice = await Invoice.create(newInvoice);

    res.status(201).json({
      status: 201,
      success: true,
      message: "Invoice created successfully",
      data: invoice,
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

export const getInvoices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }

    const invoices = await Invoice.find({ user: user._id }).select("invoice_history -_id");

    const invoiceDetails = invoices.map((invoice) =>
      invoice.invoice_history.map((history) => ({
        bill: history.bill,
        date: history.created_at,
      }))
    ).flat();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Invoices retrieved successfully",
      data: invoiceDetails,
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