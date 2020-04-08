function calculateAverage(totalValue, reviewCount) {
  if (reviewCount === 0) return 0
  return Number((totalValue / reviewCount).toFixed(1)) || 0
}

export default calculateAverage