import { connectDB } from '@/lib/db';
import { Transaction } from '@/lib/models/Transactions';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find({});
  return NextResponse.json(transactions);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const transaction = await Transaction.create(body);
  return NextResponse.json(transaction, { status: 201 });
}
