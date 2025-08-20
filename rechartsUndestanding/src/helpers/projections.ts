/**
 * Calculate the year fraction between two dates using the Actual/Actual convention.
 * This is commonly used in financial models to account for leap years accurately.
 *
 * @param {Date} startDate - The starting date of the period.
 * @param {Date} endDate - The ending date of the period.
 * @returns {number} - The fractional number of years between startDate and endDate.
 */
export function yearDifferenceFraction(startDate: Date, endDate: Date): number {
  // Ensure we work with copies so original dates are not modified
  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);

  let yearFraction: number = 0; // accumulator for the total year fraction
  let current: Date = new Date(start);

  while (current < end) {
    // January 1 of the next year
    const yearEnd: Date = new Date(current.getFullYear() + 1, 0, 1);

    // The end of the current period we are calculating (either year-end or final date)
    const periodEnd: Date = end < yearEnd ? end : yearEnd;

    // Total number of days in the current year
    const daysInYear: number =
      (yearEnd.getTime() - new Date(current.getFullYear(), 0, 1).getTime()) /
      (1000 * 60 * 60 * 24);

    // Number of days in the period we are currently looking at
    const daysInPeriod: number =
      (periodEnd.getTime() - current.getTime()) / (1000 * 60 * 60 * 24);

    // Fractional year for this period
    yearFraction += daysInPeriod / daysInYear;

    // Move to the start of the next period
    current = periodEnd;
  }

  return yearFraction;
}

/**
 * Add a fractional or whole number of years to a given date.
 * Handles leap years correctly by adjusting the day if necessary.
 *
 * @param {Date} startDate - The original date.
 * @param {number} yearsToAdd - Number of years to add (can be fractional, e.g., 1.5 years).
 * @returns {Date} - The future date after adding the years.
 */
export function addYearsToDate(startDate: Date, yearsToAdd: number): Date {
  const start: Date = new Date(startDate); // copy to avoid mutating original
  const wholeYears: number = Math.floor(yearsToAdd);
  const fractionalYear: number = yearsToAdd - wholeYears;

  // Add whole years
  let futureYear: number = start.getFullYear() + wholeYears;

  // Handle leap year if original date is Feb 29
  if (start.getMonth() === 1 && start.getDate() === 29) {
    if (
      !(
        futureYear % 4 === 0 &&
        (futureYear % 100 !== 0 || futureYear % 400 === 0)
      )
    ) {
      // Not a leap year, adjust to Feb 28
      start.setDate(28);
    }
  }

  start.setFullYear(futureYear);

  // Add fractional year in days
  if (fractionalYear > 0) {
    const startOfYear: Date = new Date(start.getFullYear(), 0, 1);
    const endOfYear: Date = new Date(start.getFullYear() + 1, 0, 1);
    const daysInYear: number =
      (endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
    const extraDays: number = fractionalYear * daysInYear;
    start.setDate(start.getDate() + extraDays);
  }

  return start;
}
