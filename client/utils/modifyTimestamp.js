function modifyTimestamp(timestamp) {
  let newTime = timestamp
    .slice(0, 10)
    .split('-')
    .map(num => Number(num))
  // need to remove one from the month to get right date, as moment starts from index 0
  newTime[1]--
  return newTime
}

export default modifyTimestamp