import mongoose, { Schema, Document, models } from 'mongoose';

export interface ITrade extends Document {
  screenshotUrl?: string;
  videoUrl?: string;
  tradeDate: Date;
  result: 'Win' | 'Loss';
  marginUsed: number;
  initialBalance: number;
  finalBalance: number;
  strategy: string;
  notes?: string;
}

const TradeSchema = new Schema<ITrade>(
  {
    screenshotUrl: { type: String },
    videoUrl: { type: String },
    tradeDate: { type: Date, default: Date.now },
    result: {
      type: String,
      enum: ['Win', 'Loss'],
      required: true,
    },
    marginUsed: { type: Number, required: true },
    initialBalance: { type: Number, required: true },
    finalBalance: { type: Number, required: true },
    strategy: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default models.Trade || mongoose.model<ITrade>('Trade', TradeSchema); 