/**
 * This class provides static methods for validating date objects.
 */  
export default class DateValidator {
     /**
     * Checks if a start DateTime is valid and comes before an end DateTime.
     * 
     * @param {DateTime} start - the start DateTime object.
     * @param {DateTime} end - the end DateTime object.
     * @returns {Interval|null} - Returns an invalid Interval if the start or end dates are invalid or if the end comes before the start.
     * Otherwise, it returns null.
     */
    static validateStartEnd(start, end) {
      if (!start || !start.isValid) {
        return Interval.invalid("missing or invalid start");
      } else if (!end || !end.isValid) {
        return Interval.invalid("missing or invalid end");
      } else if (end < start) {
        return Interval.invalid(
          "end before start",
          `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
        );
      } else {
        return null;
      }
    }
  }