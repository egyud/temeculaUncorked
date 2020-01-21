module.exports = (totalValue, reviewCount) => {
  return Number((totalValue / reviewCount).toFixed(1)) || 0
}