import TradeTable from './components/TradeTable';
import { Trade } from '@/types/trade';
import Link from 'next/link';
import { headers } from 'next/headers';

async function getTrades(): Promise<Trade[]> {
  // Get the host from headers during server-side rendering
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  try {
    const res = await fetch(`${protocol}://${host}/api/trades`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch trades');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching trades:', error);
    return []; // Return empty array on error for graceful degradation
  }
}

export default async function Home() {
  const trades = await getTrades();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="dashboard-header">
        <div className="grid-pattern" />
        <div className="relative">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Trade Dashboard</h1>
              <p className="text-slate-400">Track and analyze your trading performance</p>
            </div>
            <Link href="/add-trade" className="btn btn-blue hover-lift">
              Add New Trade
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-300 mb-1">Total Trades</h3>
              <p className="text-2xl font-bold text-white">{trades.length}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-300 mb-1">Win Rate</h3>
              <p className="text-2xl font-bold text-white">
                {trades.length ? 
                  Math.round((trades.filter(t => t.result === 'Win').length / trades.length) * 100)
                  : 0}%
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-300 mb-1">Total Profit</h3>
              <p className="text-2xl font-bold text-white">
                ${trades.reduce((sum, t) => sum + (t.finalBalance - t.initialBalance), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {trades.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state-icon">📊</div>
          <h3 className="text-xl font-semibold text-white">No trades yet</h3>
          <p className="text-slate-400 max-w-sm">
            Start tracking your trades by adding your first entry. Click the button above to get started.
          </p>
        </div>
      ) : (
        <TradeTable trades={trades} />
      )}
    </main>
  );
}
