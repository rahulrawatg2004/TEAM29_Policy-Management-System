// Simple premium engine — extendable
function calculatePremium({ product, age, vehicleYear, coverageAmount }) {
  let premium = product && product.basePremium ? product.basePremium : 500;

  if (age) {
    if (age < 25) premium *= 1.1;
    else if (age <= 40) premium *= 1.0;
    else if (age <= 60) premium *= 1.3;
    else premium *= 1.6;
  }

  if (vehicleYear) {
    const vehicleAge = new Date().getFullYear() - vehicleYear;
    if (vehicleAge > 5) premium *= 1.2;
  }

  premium += (coverageAmount || 0) * 0.005; // 0.5% of coverage

  return Math.round(premium);
}

module.exports = { calculatePremium };
