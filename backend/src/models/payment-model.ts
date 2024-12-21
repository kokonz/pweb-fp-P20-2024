import mongoose from "mongoose";

enum PaymentMethod {
    QRIS = "QRIS",
    BANK_TRANSFER = "BANK_TRANSFER",
}

const PaymentSchema = new mongoose.Schema(
    {
        total_bill: {
            type: Number,
            required: true,
        },
        payment_method: {
            type: String,
            enum: Object.values(PaymentMethod),
            required: true,
        },
        rent_periods: {
            type: Number,
            enum: [3, 6],
            required: true,
        },
    },
    { timestamps: true }
);

export const Payment = mongoose.model("Payments", PaymentSchema);