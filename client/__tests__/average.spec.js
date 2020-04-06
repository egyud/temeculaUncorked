import calculateAverage from '../utils/average'

describe('calculate average', () => {
  it('returns zero if review count is zero', () => {
    const result = calculateAverage(15, 0)
    const expected = 0

    expect(result).toEqual(expected)
  })

  it('correctly calculates the average', () => {
    const result = calculateAverage(16, 4)
    const expected = 4

    expect(result).toEqual(expected)
  })

  it('correctly rounds to one decimal place', () => {
    const result = calculateAverage(8, 3)
    const expected = 2.7

    expect(result).toEqual(expected)
  })
})