💰 Personal Finance Visualizer
A simple and intuitive web application to help users track their personal finances — built with Next.js, React, shadcn/ui, Recharts, and MongoDB.

🚀 Live Demo
🔗 View Deployed App
📂 GitHub Repository

🧩 Features
✅ Stage 1 – Basic Transaction Tracking
Add, edit, and delete transactions

View all transactions in a list

Monthly expenses bar chart

Basic form validation and error handling

✅ Stage 2 – Categories
Predefined categories for transactions (e.g., Food, Transport, Rent)

Category-wise expense pie chart

Dashboard with:

💸 Total expenses

📊 Category breakdown

🕒 Most recent transactions

✅ Stage 3 – Budgeting
Set monthly budgets per category

Budget vs actual comparison bar chart

Simple spending insights based on monthly limits

🛠️ Tech Stack
Frontend: Next.js (App Router), React, Tailwind CSS, shadcn/ui

Charts: Recharts

Backend: API Routes in Next.js

Database: MongoDB (via Mongoose)

📁 Project Structure
bash
Copy
Edit
app/
├── page.js               # Homepage - Dashboard and Charts
├── budget/               # Budgeting features
├── api/transactions/     # API routes for transaction CRUD
├── api/budgets/          # API routes for budgets
components/
├── TransactionForm.js
├── TransactionList.js
├── CategoryPieChart.js
├── MonthlyBarChart.js
├── SummaryCards.js
├── BudgetForm.js
├── BudgetList.js
├── BudgetComparisonChart.js
lib/
├── dbConnect.js          # MongoDB connection utility
📦 Setup Instructions
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Install dependencies
bash
Copy
Edit
pnpm install
3. Add .env.local
env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
4. Run the app locally
bash
Copy
Edit
pnpm dev
✅ Submission Checklist
 All 3 stages implemented

 Fully responsive design

 Code with modular components and clean architecture

 GitHub Repo with proper structure

 Deployed via Vercel

 No login/authentication implemented as per guidelines

📊 Evaluation Criteria
Feature Implementation: ✅ 100% complete

Code Quality: Modular, reusable, and well-structured

UI/UX Design: Clean, responsive, and intuitive
