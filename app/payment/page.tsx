import StripePaymentWrapper from '../components/StripePaymentWrapper';

export default function PaymentPage() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Complete Your Payment</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <StripePaymentWrapper />
        </div>
      </main>
    </div>
  );
} 