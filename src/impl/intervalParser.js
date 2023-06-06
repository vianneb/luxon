import DateTime from "../datetime.js";
import Duration from "../duration.js";
import Interval from "../interval.js";

/**
 * This class provides static methods for parsing Interval objects from strings.
 */
export default class IntervalParser {
   /**
   * Parses an Interval object from an ISO 8601 string.
   * 
   * @param {string} text - The ISO 8601 string to parse.
   * @param {Object} opts - Options to pass to DateTime#fromISO and Duration#fromISO.
   * @returns {Interval} - Returns an Interval object if the string can be parsed, 
   * otherwise returns an invalid Interval.
   * 
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   */
  static fromISO(text, opts) {
    const [s, e] = (text || "").split("/", 2);
    if (s && e) {
      let start, startIsValid;
      try {
        start = DateTime.fromISO(s, opts);
        startIsValid = start.isValid;
      } catch (e) {
        startIsValid = false;
      }

      let end, endIsValid;
      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e) {
        endIsValid = false;
      }

      if (startIsValid && endIsValid) {
        return Interval.fromDateTimes(start, end);
      }

      if (startIsValid) {
        const dur = Duration.fromISO(e, opts);
        if (dur.isValid) {
          return Interval.after(start, dur);
        }
      } else if (endIsValid) {
        const dur = Duration.fromISO(s, opts);
        if (dur.isValid) {
          return Interval.before(end, dur);
        }
      }
    }
    return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
  }
}
