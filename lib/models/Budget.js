import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // 'YYYY-MM' format
});

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
