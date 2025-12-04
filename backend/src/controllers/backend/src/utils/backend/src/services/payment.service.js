// Payment stub — replace with Razorpay/Stripe integration
async function processPayment({ amount, paymentMethod, user }) {
  // Simulate a payment success
  return { success: true, transactionId: TXN-${Date.now()}, amount };
}

module.exports = { processPayment };