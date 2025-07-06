
import { connectDB } from '@/lib/db';
import Budget from '@/lib/models/Budget';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // ✅ manually extract ID from the URL
  console.log('🗑️ DELETE request for budget ID:', id);

  await connectDB();

  try {
    const budget = await Budget.findById(id);
    console.log('🔍 Budget found:', budget);

    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    await Budget.findByIdAndDelete(id);
    console.log('✅ Budget deleted:', id);
    return NextResponse.json({ message: 'Budget deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('❌ DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // ✅ manually extract ID from the URL
  const body = await req.json();

  console.log('✏️ PUT request for budget ID:', id, 'with data:', body);

  await connectDB();

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBudget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    console.error('❌ PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
