import Formatter from "./impl/formatter.js";
import * as Formats from "./impl/formats.js";

/**
 * This class provides static methods for formatting Interval objects.
 */
export default class IntervalFormatter {
  /**
   * Formats an Interval object as a string.
   *
   * @param {Interval} interval - The Interval object to be formatted.
   * @param {string} formatOpts - The format options for formatting the Interval object. Default is Formats.DATE_SHORT.
   * @param {object} opts - Additional options for formatting. Default is an empty object.
   * @returns {string} - A string representation of the formatted Interval object.
   */
  static formatLocaleString(interval, formatOpts = Formats.DATE_SHORT, opts = {}) {
    return interval.isValid
      ? Formatter.create(interval.s.loc.clone(opts), formatOpts).formatInterval(interval)
      : INVALID_INTERVAL;
  }

  /**
   * Formats an Interval object to the ISO 8601 format.
   *
   * @param {Interval} interval - The Interval object to be formatted.
   * @param {object} opts - Additional options for formatting. Default is an empty object.
   * @returns {string} - The Interval object formatted as a string in ISO 8601 format.
   */
  static formatToISO(interval, opts) {
    return interval.isValid ? `${interval.s.toISO(opts)}/${interval.e.toISO(opts)}` : INVALID_INTERVAL;
  }

  /**
   * Formats an Interval object to the ISO 8601 date format.
   *
   * @param {Interval} interval - The Interval object to be formatted.
   * @returns {string} - The Interval object formatted as a string in ISO 8601 date format.
   */
  static formatToISODate(interval) {
    return interval.isValid ? `${interval.s.toISODate()}/${interval.e.toISODate()}` : INVALID_INTERVAL;
  }

  /**
   * Formats an Interval object to the ISO 8601 time format.
   *
   * @param {Interval} interval - The Interval object to be formatted.
   * @param {object} opts - Additional options for formatting. Default is an empty object.
   * @returns {string} - The Interval object formatted as a string in ISO 8601 time format.
   */
  static formatToISOTime(interval, opts) {
    return interval.isValid ? `${interval.s.toISOTime(opts)}/${interval.e.toISOTime(opts)}` : INVALID_INTERVAL;
  }

  /**
   * Formats an Interval object as a string with inclusive start and exclusive end brackets.
   *
   * @param {Interval} interval - The Interval object to be formatted.
   * @returns {string} - The Interval object formatted as a string with inclusive start and exclusive end brackets.
   */
  static formatToString(interval) {
    return interval.isValid ? `[${interval.s.toISO()} – ${interval.e.toISO()})` : INVALID_INTERVAL;
  }
}
