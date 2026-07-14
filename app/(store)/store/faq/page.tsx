const FAQS = [
  {
    q: 'How do I pay?',
    a: 'All orders are Cash on Delivery (COD). You pay when the product is delivered.',
  },
  {
    q: 'Where do you deliver?',
    a: 'Nationwide across Nepal. We call to confirm every order before dispatch.',
  },
  {
    q: 'What does "Pre-order" mean?',
    a: 'The product is in development or built to order. We confirm lead time when we call you.',
  },
  {
    q: 'Do I need an account to buy?',
    a: 'No. Guest checkout is available. An account just saves your delivery details and order history.',
  },
];

export const metadata = { title: 'FAQ' };

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h1>
      <div className="divide-y divide-gray-100">
        {FAQS.map((f) => (
          <div key={f.q} className="py-5">
            <h2 className="font-semibold">{f.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
