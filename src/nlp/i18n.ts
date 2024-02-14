// =============================================================================
// i18n
// =============================================================================

export interface Language {
  dayNames: string[]
  monthNames: string[]
  tokens: {
    [k: string]: RegExp
  }
}

const ENGLISH: Language = {
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  tokens: {
    SKIP: /^[ \r\n\t]+|^\.$/,
    number: /^[1-9][0-9]*/,
    numberAsText: /^(one|two|three)/i,
    every: /^every/i,
    'day(s)': /^days?/i,
    'weekday(s)': /^weekdays?/i,
    'week(s)': /^weeks?/i,
    'hour(s)': /^hours?/i,
    'minute(s)': /^minutes?/i,
    'month(s)': /^months?/i,
    'year(s)': /^years?/i,
    on: /^(on|in)/i,
    at: /^(at)/i,
    the: /^the/i,
    first: /^first/i,
    second: /^second/i,
    third: /^third/i,
    nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i,
    last: /^last/i,
    for: /^for/i,
    'time(s)': /^times?/i,
    until: /^(un)?til/i,
    monday: /^mo(n(day)?)?/i,
    tuesday: /^tu(e(s(day)?)?)?/i,
    wednesday: /^we(d(n(esday)?)?)?/i,
    thursday: /^th(u(r(sday)?)?)?/i,
    friday: /^fr(i(day)?)?/i,
    saturday: /^sa(t(urday)?)?/i,
    sunday: /^su(n(day)?)?/i,
    january: /^jan(uary)?/i,
    february: /^feb(ruary)?/i,
    march: /^mar(ch)?/i,
    april: /^apr(il)?/i,
    may: /^may/i,
    june: /^june?/i,
    july: /^july?/i,
    august: /^aug(ust)?/i,
    september: /^sep(t(ember)?)?/i,
    october: /^oct(ober)?/i,
    november: /^nov(ember)?/i,
    december: /^dec(ember)?/i,
    comma: /^(,\s*|(and|or)\s*)+/i,
  },
}

export default ENGLISH

type NumberKey = number | 'else';

export interface LanguageTemplates {
  'yearly': Record<NumberKey, string>
	'monthly': Record<NumberKey, string>
	'weekly': Record<NumberKey, string>
	'daily': Record<NumberKey, string>
	'hourly': Record<NumberKey, string>
	'minutely': Record<NumberKey, string>
	'secondly': Record<NumberKey, string>
	'dtstart': string
	'timeofday': string
	'startingtimeofday': string
	'infinite': string
	'until': string
	'count': Record<NumberKey, string>
	'and': string
	'x_of_the_y': {
    'yearly': string
    'monthly': string
  }
	'bymonth': string
	'months': {
		1: string
		2: string
		3: string
		4: string
		5: string
		6: string
		7: string
		8: string
		9: string
		10: string
		11: string
		12: string
  }
	'byweekday': string
	'byweekday_is_weekdays': Record<NumberKey, string>
	'weekdays': {
		0: string
		1: string
		2: string
		3: string
		4: string
		5: string
		6: string
  }
  weekdays_byweekday: {
		0: string
    1: string
		2: string
		3: string
		4: string
		5: string
		6: string
  }
	'nth_weekday': Record<NumberKey, string>
	'-nth_weekday': Record<NumberKey, string>
	'byweekno': Record<NumberKey, string>
	'nth_weekno': string
	'bymonthday': string
	'nth_monthday': Record<NumberKey, string>
	'-nth_monthday': Record<NumberKey, string>
	'byyearday': Record<NumberKey, string>
	'nth_yearday': Record<NumberKey, string>
	'-nth_yearday': Record<NumberKey, string>
	'byhour': Record<NumberKey, string>
	'nth_hour': string
	'byminute': Record<NumberKey, string>
	'nth_minute': string
	'bysecond': Record<NumberKey, string>
	'nth_second': string
	'bysetpos': string
	'nth_setpos': Record<NumberKey, string>
	'-nth_setpos': Record<NumberKey, string>
  approximate: string
  dateFormatLocale?: string
  dateFormatOptions?: Intl.DateTimeFormatOptions
}

export const ENGLISH_TEMPLATES: LanguageTemplates = {
  yearly: {
    '1': 'every year',
    'else': 'every %{interval} years'
  },
  monthly: {
    '1': 'every month',
    'else': 'every %{interval} months'
  },
  weekly: {
    '1': 'every week',
    'else': 'every %{interval} weeks'
  },
  daily: {
    '1': 'every day',
    '2': 'every other day',
    'else': 'every %{interval} days'
  },
  hourly: {
    '1': 'every hour',
    'else': 'every %{interval} hours'
  },
  minutely: {
    '1': 'every minute',
    'else': 'every %{interval} minutes'
  },
  secondly: {
    '1': 'every second',
    'else': 'every %{interval} seconds'
  },
  dtstart: 'starting from %{date}',
  timeofday: 'at %{date}',
  startingtimeofday: ' starting at %{date}',
  infinite: 'forever',
  until: 'until %{date}',
  count: {
    '1': 'one time',
    'else': 'for %{count} times'
  },
  and: 'and ',
  x_of_the_y: {
    'yearly': '%{x} of the year', // e.g. the first Monday of the year, or the first day of the year
    'monthly': '%{x} of the month',
  },
  bymonth: 'in %{months}',
  months: {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  },
  byweekday: 'on %{weekdays}',
  byweekday_is_weekdays: {
    1: 'every weekday',
    'else': 'every %{interval} weekday',
  },
  weekdays: {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  },
  weekdays_byweekday: {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  },
  nth_weekday: {
    '1': 'the 1st %{weekday}', // e.g. the first Monday
    '2': 'the 2nd %{weekday}',
    '3': 'the 3rd %{weekday}',
    'else': 'the %{n}th %{weekday}'
  },
  '-nth_weekday': {
    '-1': 'the last %{weekday}', // e.g. the last Monday
    '-2': 'the 2nd last %{weekday}',
    '-3': 'the 3rd last %{weekday}',
    'else': 'the %{n}th last %{weekday}'
  },
  byweekno: {
    '1': ' on week %{weeks}',
    'else': ' on weeks number %{weeks}'
  },
  nth_weekno: '%{n}',
  bymonthday: 'on the %{monthdays}',
  nth_monthday: {
    '1': '1st',
    '2': '2nd',
    '3': '3rd',
    '21': '21st',
    '22': '22nd',
    '23': '23rd',
    '31': '31st',
    'else': '%{n}th'
  },
  '-nth_monthday': {
    '-1': 'last',
    '-2': '2nd last day',
    '-3': '3rd last day',
    '-21': '21st last day',
    '-22': '22nd last day',
    '-23': '23rd last day',
    '-31': '31st last day',
    'else': '%{n}th last'
  },
  byyearday: {
    '1': 'on %{yeardays} day',
    'else': 'on %{yeardays} days'
  },
  nth_yearday: {
    '1': 'the first',
    '2': 'the second',
    '3': 'the third',
    'else': 'the %{n}th'
  },
  '-nth_yearday': {
    '-1': 'the last',
    '-2': 'the 2nd last',
    '-3': 'the 3rd last',
    'else': 'the %{n}th last'
  },
  byhour: {
    '1': 'at %{hours}',
    'else': 'at %{hours}'
  },
  nth_hour: '%{n}h',
  byminute: {
    '1': ' at minute %{minutes}',
    'else': ' at minutes %{minutes}'
  },
  nth_minute: '%{n}',
  bysecond: {
    '1': ' at second %{seconds}',
    'else': ' at seconds %{seconds}'
  },
  nth_second: '%{n}',
  bysetpos: ', but only %{setpos} instance of this set',
  nth_setpos: {
    '1': 'the first',
    '2': 'the second',
    '3': 'the third',
    'else': 'the %{n}th'
  },
  '-nth_setpos': {
    '-1': 'the last',
    '-2': 'the 2nd last',
    '-3': 'the 3rd last',
    'else': 'the %{n}th last'
  },
  dateFormatLocale: 'en-US',
  dateFormatOptions: {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  approximate: 'approximate'
}
