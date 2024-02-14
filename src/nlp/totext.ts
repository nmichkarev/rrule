import ENGLISH, { Language, LanguageTemplates, ENGLISH_TEMPLATES } from './i18n'
import { RRule } from '../rrule'
import { Options, ByWeekday } from '../types'
import { Weekday } from '../weekday'
import { isArray, isNumber, isPresent } from '../helpers'

// =============================================================================
// Helper functions
// =============================================================================

/**
 * Return true if a value is in an array
 */
const contains = function (arr: string[], val: string) {
  return arr.indexOf(val) !== -1
}

// =============================================================================
// ToText
// =============================================================================

export type DateFormatter = (date: Date, locale?: string, options?: Intl.DateTimeFormatOptions) => string

const defaultDateFormatter: DateFormatter = (date: Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions) => {
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
}

/**
 *
 * @param {RRule} rrule
 * Optional:
 * @param {Function} dateFormatter function
 * @param {Object} language definition
 * @constructor
 */
export default class ToText {
  static IMPLEMENTED: string[][]
  private rrule: RRule
  private text: string[]
  private dateFormatter: DateFormatter
  private language: Language
  private languageTemplates: LanguageTemplates
  private options: Partial<Options>
  private origOptions: Partial<Options>
  private bymonthday: Options['bymonthday'] | null
  private byweekday: {
    allWeeks: ByWeekday[] | null
    someWeeks: ByWeekday[] | null
    isWeekdays: boolean
    isEveryDay: boolean
  } | null
  private addedCount: number

  constructor(
    rrule: RRule,
    dateFormatter?: DateFormatter,
    languageTemplates: LanguageTemplates = ENGLISH_TEMPLATES,
  ) {
    this.text = []
    this.rrule = rrule
    this.languageTemplates = languageTemplates
    this.options = rrule.options
    this.origOptions = rrule.origOptions
    this.addedCount = 0
    this.dateFormatter = dateFormatter
      ?? ((date, locale, options) =>
        defaultDateFormatter(
          date,
          locale ?? languageTemplates.dateFormatLocale,
          options ?? languageTemplates.dateFormatOptions
        )
      );

    if (this.origOptions.bymonthday) {
      const bymonthday = ([] as number[]).concat(this.options.bymonthday)
      const bynmonthday = ([] as number[]).concat(this.options.bynmonthday)

      bymonthday.sort((a, b) => a - b)
      bynmonthday.sort((a, b) => b - a)
      // 1, 2, 3, .., -5, -4, -3, ..
      this.bymonthday = bymonthday.concat(bynmonthday)
      if (!this.bymonthday.length) this.bymonthday = null
    }

    if (isPresent(this.origOptions.byweekday)) {
      const byweekday = !isArray(this.origOptions.byweekday)
        ? [this.origOptions.byweekday]
        : this.origOptions.byweekday
      const days = String(byweekday)

      this.byweekday = {
        allWeeks: byweekday.filter(function (weekday: Weekday) {
          return !weekday.n
        }),
        someWeeks: byweekday.filter(function (weekday: Weekday) {
          return Boolean(weekday.n)
        }),
        isWeekdays:
          days.indexOf('MO') !== -1 &&
          days.indexOf('TU') !== -1 &&
          days.indexOf('WE') !== -1 &&
          days.indexOf('TH') !== -1 &&
          days.indexOf('FR') !== -1 &&
          days.indexOf('SA') === -1 &&
          days.indexOf('SU') === -1,
        isEveryDay:
          days.indexOf('MO') !== -1 &&
          days.indexOf('TU') !== -1 &&
          days.indexOf('WE') !== -1 &&
          days.indexOf('TH') !== -1 &&
          days.indexOf('FR') !== -1 &&
          days.indexOf('SA') !== -1 &&
          days.indexOf('SU') !== -1,
      }

      const sortWeekDays = function (a: Weekday, b: Weekday) {
        return a.weekday - b.weekday
      }

      this.byweekday.allWeeks.sort(sortWeekDays)
      this.byweekday.someWeeks.sort(sortWeekDays)

      if (!this.byweekday.allWeeks.length) this.byweekday.allWeeks = null
      if (!this.byweekday.someWeeks.length) this.byweekday.someWeeks = null
    } else {
      this.byweekday = null
    }
  }

  /**
   * Test whether the rrule can be fully converted to text.
   *
   * @param {RRule} rrule
   * @return {Boolean}
   */
  static isFullyConvertible(rrule: RRule) {
    const canConvert = true

    if (!(rrule.options.freq in ToText.IMPLEMENTED)) return false
    if (rrule.origOptions.until && rrule.origOptions.count) return false

    for (const key in rrule.origOptions) {
      if (contains(['dtstart', 'tzid', 'wkst', 'freq'], key)) return true
      if (!contains(ToText.IMPLEMENTED[rrule.options.freq], key)) return false
    }

    return canConvert
  }

  isFullyConvertible() {
    return ToText.isFullyConvertible(this.rrule)
  }

  /**
   * Perform the conversion. Only some of the frequencies are supported.
   * If some of the rrule's options aren't supported, they'll
   * be omitted from the output an "(~ approximate)" will be appended.
   *
   * @return {*}
   */
  toString() {

    if (!(this.options.freq in ToText.IMPLEMENTED)) {
      return 'RRule error: Unable to fully convert this rrule to text'
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this[RRule.FREQUENCIES[this.options.freq]]()

    if (this.options.until) {
      const until = this.options.until
      const untilTpl = this._i18nSelect('until');
      this.add(untilTpl.replace('%{date}', this.dateFormatter(until)));
    } else if (this.options.count) {
      const countTpl = this._i18nSelect('count', this.options.count.toString());
      this.add(countTpl.replace('%{count}', this.options.count.toString()));
    }

    if (!this.isFullyConvertible()) {
      const approximate = this._i18nSelect('approximate');
      this.add(`(~ ${approximate})`)
    }

    return this.text.join('')
  }

  private _i18nList(value: number[] | string[]): string {
    const and = this.languageTemplates.and;
    if (!isArray(value)) value = [value];
    if (value.length > 1) {
      const last = value.at(-1);
      return `${value.slice(0, -1).join(', ')} ${and}${last}`;
    } else {
      return value[0].toString();
    }
  }

  private _i18nSelect(field: keyof LanguageTemplates, key?: string): string {
    const binding = this.languageTemplates[field];
    if (typeof binding === 'string') return binding;
    if (key && key in binding) {
      return binding[key as keyof typeof binding];
    } else if ('else' in binding) {
      return binding.else;
    } else {
      return '';
    }
  }

  private _i18n(field: keyof LanguageTemplates, key?: string, holder = ''): string {
    const template = this._i18nSelect(field, key);
    return holder ? template.replace(`%{${holder}}`, key ?? '') : template;
  }

  HOURLY() {
    const hourly = this._i18n('hourly', this.options.interval.toString(), 'interval');
    this.add(hourly);
  }

  MINUTELY() {
    const minutely = this._i18n('minutely', this.options.interval.toString(), 'interval');
    this.add(minutely);
  }

  DAILY() {

    if (this.byweekday && this.byweekday.isWeekdays) {
      const isWeekdays = this._i18n('byweekday_is_weekdays', this.options.interval.toString(), 'interval');
      this.add(isWeekdays);
    } else {
      const daily = this._i18n('daily', this.options.interval.toString(), 'interval');
      this.add(daily);
    }

    if (this.origOptions.bymonth) {
      this._bymonth()
    }

    if (this.bymonthday) {
      this._bymonthday()
    } else if (this.byweekday) {
      this._byweekday()
    } else if (this.origOptions.byhour) {
      this._byhour()
    }
  }

  WEEKLY() {

    // if (this.options.interval !== 1) {
      // this.add(this.options.interval.toString()).add(
      //   this.plural(this.options.interval) ? gettext('weeks') : gettext('week')
      // )
    // }

    if (this.byweekday && this.byweekday.isWeekdays) {
      if (this.options.interval === 1) {
        const isWeekdays = this._i18n('byweekday_is_weekdays', this.options.interval.toString(), 'interval');
        this.add(isWeekdays);
      //   this.add(
      //     this.plural(this.options.interval)
      //       ? gettext('weekdays')
      //       : gettext('weekday')
      //   )
      // } else {
      //   this.add(gettext('on')).add(gettext('weekdays'))
      }
    } else if (this.byweekday && this.byweekday.isEveryDay) {
      const daily = this._i18n('daily', '1', 'interval');
      this.add(daily);
      // this.add(
      //   this.plural(this.options.interval) ? gettext('days') : gettext('day')
      // )
    } else {
      // if (this.options.interval === 1) this.add(gettext('week'))
      const weekly = this._i18n('weekly', this.options.interval.toString(), 'interval');
      this.add(weekly);

      if (this.origOptions.bymonth) {
        // this.add(gettext('in'))
        this._bymonth()
      }

      if (this.bymonthday) {
        this._bymonthday()
      } else if (this.byweekday) {
        this._byweekday()
      }

      if (this.origOptions.byhour) {
        this._byhour()
      }
    }
  }

  MONTHLY() {

    if (this.origOptions.bymonth) {
      // if (this.options.interval !== 1) {
      //   this.add(this.options.interval.toString()).add(gettext('months'))
      //   if (this.plural(this.options.interval)) this.add(gettext('in'))
      // } else {
      //   // this.add(gettext('MONTH'))
      // }
      this._bymonth()
    } else {
      // if (this.options.interval !== 1) {
      //   this.add(this.options.interval.toString())
      // }
      // this.add(
      //   this.plural(this.options.interval)
      //     ? gettext('months')
      //     : gettext('month')
      // )
      const monthly = this._i18n('monthly', this.options.interval.toString(), 'interval');
      this.add(monthly);
    }
    if (this.bymonthday) {
      this._bymonthday()
    } else if (this.byweekday && this.byweekday.isWeekdays) {
      // this.add(gettext('on')).add(gettext('weekdays'))
    } else if (this.byweekday) {
      this._byweekday()
    }
  }

  YEARLY() {

    if (this.origOptions.bymonth) {
      // if (this.options.interval !== 1) {
      //   this.add(this.options.interval.toString())
      //   this.add(gettext('years'))
      // } else {
      //   // this.add(gettext('YEAR'))
      // }
      this._bymonth()
    } else {
      // if (this.options.interval !== 1) {
      //   this.add(this.options.interval.toString())
      // }
      // this.add(
      //   this.plural(this.options.interval) ? gettext('years') : gettext('year')
      // )
      const yearly = this._i18n('yearly', this.options.interval.toString(), 'interval');
      this.add(yearly);
    }

    if (this.bymonthday) {
      this._bymonthday()
    } else if (this.byweekday) {
      this._byweekday()
    }

    if (this.options.byyearday) {
      // this.add(gettext('on the'))
      //   .add(this.list(this.options.byyearday, this.nth, gettext('and')))
      //   .add(gettext('day'))
    }

    if (this.options.byweekno) {
      console.log('byweekno')
      // this.add(gettext('in'))
      //   .add(
      //     this.plural((this.options.byweekno as number[]).length)
      //       ? gettext('weeks')
      //       : gettext('week')
      //   )
      //   .add(this.list(this.options.byweekno, undefined, gettext('and')))
    }
  }

  private _bymonthday() {
    if (this.byweekday && this.byweekday.allWeeks) {
      // this.add(gettext('on'))
      //   .add(
      //     this.list(this.byweekday.allWeeks, this.weekdaytext, gettext('or'))
      //   )
      //   .add(gettext('the'))
      //   .add(this.list(this.bymonthday, this.nth, gettext('or')))
    } else {
      // this.add(gettext('on the')).add(
      //   this.list(this.bymonthday, this.nth, gettext('and'))
      // )
      const nths = (isArray(this.bymonthday) ? this.bymonthday : [this.bymonthday])
        .map(n => this._i18n(n > 0 ? 'nth_monthday' : '-nth_monthday', Math.abs(n).toString(), 'n'));
      const monthdayList = this._i18nList(nths);
      const bymonthday = this._i18n('bymonthday');
      this.add(bymonthday.replace('%{monthdays}', monthdayList));
    }
    // this.add(gettext('DAY'))
  }

  private _byweekday() {
    const byweekday = this._i18nSelect('byweekday');
    if (this.byweekday.allWeeks && !this.byweekday.isWeekdays) {
      const weekdayNumbers = this.byweekday.allWeeks.map(this.weekdaynumber);
      const byweekList = this._i18nList(weekdayNumbers.map((wday) => this._i18n('weekdays_byweekday', wday.toString())));
      this.add(byweekday.replace('%{weekdays}', byweekList));
    }
    if (this.byweekday.someWeeks) {
      const byweekList = this._i18nList(this.byweekday.someWeeks.map((week) => this.weekdayfull(week)));
      this.add(byweekday.replace('%{weekdays}', byweekList));
    }
  }

  private _byhour() {

    // this.add(gettext('at')).add(
    //   this.list(this.origOptions.byhour, undefined, gettext('and'))
    // )
    const byhourList = this._i18nList(isArray(this.options.byhour) ? this.options.byhour : [this.options.byhour]);
    const byhour = this._i18nSelect('byhour');
    this.add(byhour.replace('%{hours}', byhourList));
  }

  private _bymonth() {
    const bymonthList = this._i18nList(isArray(this.options.bymonth) ? this.options.bymonth : [this.options.bymonth]);
    const bymonth = this._i18nSelect('bymonth');
    this.add(bymonth.replace('%{months}', bymonthList));
  }

  weekdayfull(wday: ByWeekday) {
    if (typeof wday === 'string') wday = Weekday.fromStr(wday);
    const weekday = this.weekdaynumber(wday)
    const { n } = (wday as Weekday);
    const weekdayName = this._i18n('weekdays_byweekday', weekday.toString());
    let out;
    if (n) {
      const weekdayTemp = this._i18n(n > 0 ? 'nth_weekday' : '-nth_weekday', Math.abs(n).toString(), 'n');
      out = weekdayTemp.replace('%{weekday}', weekdayName);
    } else {
      out = weekdayName;
    }
    return out;
  }

  weekdaynumber(wday: Weekday | number) {
    return isNumber(wday) ? (wday + 1) % 7 : wday.getJsWeekday()
  }

  plural(n: number) {
    return n % 100 !== 1
  }

  add(s: string) {
    if (this.addedCount++) this.text.push(' ')
    this.text.push(s)
    return this
  }
}
