"use client";

import Link from 'next/link';
import { Trade } from '@/types/trade';

interface Props {
  trades: Trade[];
  onDelete?: (id: string) => void;
}

export default function TradeTable({ trades, onDelete }: Props) {
  return (
    <div className="table-container">
      <table className="min-w-full divide-y divide-zinc-800">
        <thead>
          <tr>
            <th className="table-header px-6 py-3">Screenshot</th>
            <th className="table-header px-6 py-3">Video</th>
            <th className="table-header px-6 py-3">Date</th>
            <th className="table-header px-6 py-3">Result</th>
            <th className="table-header px-6 py-3">Margin</th>
            <th className="table-header px-6 py-3">Init Bal</th>
            <th className="table-header px-6 py-3">Final Bal</th>
            <th className="table-header px-6 py-3">Strategy</th>
            <th className="table-header px-6 py-3">Notes</th>
            <th className="table-header px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 bg-zinc-900">
          {trades.map((trade) => (
            <tr key={(trade._id ?? Math.random().toString()).toString()}>
              <td className="table-cell">
                {trade.screenshotUrl ? (
                  <img
                    src={trade.screenshotUrl}
                    alt="Screenshot"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </td>
              <td className="table-cell">
                {trade.videoUrl ? (
                  <video
                    src={trade.videoUrl}
                    className="w-32 h-20 rounded-md"
                    controls
                  />
                ) : (
                  <span className="text-gray-500">No Video</span>
                )}
              </td>
              <td className="table-cell">
                {new Date(trade.tradeDate).toLocaleString()}
              </td>
              <td className="table-cell">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  trade.result === 'Win' 
                    ? 'bg-green-900 text-green-200' 
                    : 'bg-red-900 text-red-200'
                }`}>
                  {trade.result}
                </span>
              </td>
              <td className="table-cell">${trade.marginUsed.toLocaleString()}</td>
              <td className="table-cell">${trade.initialBalance.toLocaleString()}</td>
              <td className="table-cell">${trade.finalBalance.toLocaleString()}</td>
              <td className="table-cell">{trade.strategy}</td>
              <td className="table-cell max-w-xs truncate">{trade.notes}</td>
              <td className="table-cell space-x-2">
                <Link
                  href={`/trade/${trade._id}/edit`}
                  className="btn-blue btn-sm inline-block"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete?.(trade._id?.toString() ?? '')}
                  className="btn-red btn-sm inline-block ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {trades.length === 0 && (
            <tr>
              <td colSpan={10} className="table-cell text-center text-gray-500">
                No trades yet. Add your first trade to get started!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 