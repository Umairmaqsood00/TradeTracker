import { NextRequest, NextResponse } from 'next/server';
import Trade from '@/models/Trade';
import { connectDB } from '@/lib/mongodb';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const trade = await Trade.findById(params.id);
  if (!trade) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(trade);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const trade = await Trade.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(trade);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Trade.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
} 
