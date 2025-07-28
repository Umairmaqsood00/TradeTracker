import TradeForm from '../components/TradeForm';

export const metadata = {
  title: 'Add Trade | TradeVault',
};

export default function AddTradePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Trade</h1>
      <TradeForm />
    </main>
  );
} 