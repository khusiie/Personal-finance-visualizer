import { connectDB } from '@/lib/db';
import Budget from '@/lib/models/Budget';

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month');

  if (!month) {
    return new Response(JSON.stringify({ error: 'Month query parameter is required' }), {
      status: 400,
    });
  }

  try {
    const budgets = await Budget.find({ month });
    return new Response(JSON.stringify(budgets), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch budgets' }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  if (!body.category || !body.amount || !body.month) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), {
      status: 400,
    });
  }

  try {
    const budget = new Budget(body);
    await budget.save();

    return new Response(JSON.stringify(budget), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
