import { connectDB } from '@/lib/db';
import { Transaction } from '@/lib/models/Transactions';
import { NextResponse } from 'next/server';

// ✅ DO NOT use `contextPromise`, or destructure `params` in the signature

export async function PUT(req) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // ✅ get id from URL manually

  const body = await req.json();
  await connectDB();

  try {
    const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // ✅ get id from URL manually

  await connectDB();

  try {
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Transaction deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

