import mongoose from "mongoose";
import { User } from "./home-model";

type InvoiceHistory = {
  bill: number;
  created_at: Date;
};

type UserDetail = {
  user: mongoose.Schema.Types.ObjectId;
  invoice_history: InvoiceHistory[];
};

const InvoiceHistorySchema = new mongoose.Schema(
  {
    bill: {
      type: Number,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const UserDetailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    invoice_history: {
      type: [InvoiceHistorySchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model("Invoices", UserDetailSchema);
