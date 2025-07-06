import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: ['Food', 'Rent', 'Transport', 'Entertainment', 'Utilities', 'Others'],
      default: 'Others',
    },
  },
  { timestamps: true }
);

export const Transaction =
  mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
