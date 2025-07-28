import { NextRequest, NextResponse } from 'next/server';
import Trade from '@/models/Trade';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('Connected successfully, fetching trades...');
    const trades = await Trade.find().sort({ createdAt: -1 });
    console.log(`Found ${trades.length} trades`);
    return NextResponse.json(trades);
  } catch (err: any) {
    console.error('GET /api/trades error:', err.message);
    console.error('Full error:', err);
    return NextResponse.json(
      { error: 'Database connection failed', details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  try {
    const trade = await Trade.create(data);
    return NextResponse.json(trade, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
} 