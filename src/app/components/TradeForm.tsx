"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TradeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [tradeDate, setTradeDate] = useState<string>('');
  const [result, setResult] = useState<'Win' | 'Loss'>('Win');
  const [marginUsed, setMarginUsed] = useState<number>(0);
  const [initialBalance, setInitialBalance] = useState<number>(0);
  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [strategy, setStrategy] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const uploadFile = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: fd,
    });
    const data = await res.json();
    return data.url as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let screenshotUrl = '';
      let videoUrl = '';
      if (screenshotFile) {
        screenshotUrl = await uploadFile(screenshotFile);
      }
      if (videoFile) {
        videoUrl = await uploadFile(videoFile);
      }

      const payload = {
        screenshotUrl,
        videoUrl,
        tradeDate: tradeDate ? new Date(tradeDate) : new Date(),
        result,
        marginUsed: Number(marginUsed),
        initialBalance: Number(initialBalance),
        finalBalance: Number(finalBalance),
        strategy,
        notes,
      };

      const res = await fetch('/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to add trade');

      router.push('/');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="form-group">
          <label className="form-label">Screenshot</label>
          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
              className="file-input"
            />
            <div className="file-input-label">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{screenshotFile ? screenshotFile.name : 'Drop screenshot or click to upload'}</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Video</label>
          <div className="file-input-container">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              className="file-input"
            />
            <div className="file-input-label">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{videoFile ? videoFile.name : 'Drop video or click to upload'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Date & Time</label>
        <input
          type="datetime-local"
          value={tradeDate}
          onChange={(e) => setTradeDate(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Result</label>
        <select
          value={result}
          onChange={(e) => setResult(e.target.value as 'Win' | 'Loss')}
          className="form-input"
        >
          <option value="Win">Win</option>
          <option value="Loss">Loss</option>
        </select>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Margin Used</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">$</span>
            <input
              type="number"
              value={marginUsed}
              onChange={(e) => setMarginUsed(parseFloat(e.target.value))}
              className="form-input"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Initial Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">$</span>
            <input
              type="number"
              value={initialBalance}
              onChange={(e) => setInitialBalance(parseFloat(e.target.value))}
              className="form-input"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Final Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">$</span>
            <input
              type="number"
              value={finalBalance}
              onChange={(e) => setFinalBalance(parseFloat(e.target.value))}
              className="form-input"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Strategy Name</label>
        <input
          type="text"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="form-input"
          placeholder="e.g., Breakout, Trend Following..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">Notes/Comments</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="form-input min-h-[100px]"
          placeholder="Add your trade analysis, observations, or lessons learned..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-blue w-full"
      >
        {loading ? 'Saving Trade...' : 'Save Trade'}
      </button>
    </form>
  );
} 