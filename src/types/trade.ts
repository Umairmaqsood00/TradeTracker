export interface Trade {
  _id?: string;
  screenshotUrl?: string;
  videoUrl?: string;
  tradeDate: string | Date;
  result: 'Win' | 'Loss';
  marginUsed: number;
  initialBalance: number;
  finalBalance: number;
  strategy: string;
  notes?: string;
} 