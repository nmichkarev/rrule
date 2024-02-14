import { Language, LanguageTemplates } from 'src/nlp/i18n';

export const rus: Language = {
  dayNames: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
 ],
  tokens: {
    SKIP: /^[ \r\n\t]+|^\.$/,
    number: /^[1-9][0-9]*/,
    numberAsText: /^(one|two|three)/i,
    every: /^каждый/i,
    'day(s)': /^день?/i,
    'weekday(s)': /^день недели?/i,
    'week(s)': /^неделю?/i,
    'hour(s)': /^час?/i,
    'minute(s)': /^минуту?/i,
    'month(s)': /^месяц?/i,
    'year(s)': /^год?/i,
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
  }
};

export const bindings: LanguageTemplates = {
  yearly: {
    1: 'Каждый год',
    2: 'Каждый 2 год',
    3: 'Каждый 3 год',
    4: 'Каждый 4 год',
    else: 'Каждые %{interval} лет'
  },
  monthly: {
    1: 'Каждый месяц',
    2: 'Каждые 2 месяца',
    3: 'Каждые 3 месяца',
    4: 'Каждые 4 месяца',
    else: 'Каждые %{interval} месяцев'
  },
  weekly: {
    1: 'Каждую неделю',
    else: 'Каждую %{interval} неделю'
  },
  daily: {
    1: 'Каждый день',
    else: 'Каждый %{interval} день'
  },
  hourly: {
    1: 'Каждый час',
    2: 'Каждые 2 часа',
    3: 'Каждые 3 часа',
    4: 'Каждые 4 часа',
    21: 'Каждый 21 час',
    22: 'Каждые 22 часа',
    23: 'Каждые 23 часа',
    24: 'Каждые 24 часа',
    else: 'Каждые %{interval} часов'
  },
  minutely: {
    1: 'Каждую минуту',
    2: 'Каждые 2 минуты',
    3: 'Каждые 3 минуты',
    4: 'Каждые 4 минуты',
    21: 'Каждыю 21 минуту',
    22: 'Каждые 22 минуты',
    23: 'Каждые 23 минуты',
    24: 'Каждые 24 минуты',
    31: 'Каждыю 31 минуту',
    32: 'Каждые 32 минуты',
    33: 'Каждые 33 минуты',
    34: 'Каждые 34 минуты',
    41: 'Каждыю 41 минуту',
    42: 'Каждые 42 минуты',
    43: 'Каждые 43 минуты',
    44: 'Каждые 44 минуты',
    51: 'Каждыю 51 минуту',
    52: 'Каждые 52 минуты',
    53: 'Каждые 53 минуты',
    54: 'Каждые 54 минуты',
    else: 'Каждые %{interval} минут'
  },
  secondly: {
    1: 'Каждую секунду',
    else: 'Каждую %{interval} секунду'
  },
  dtstart: 'начиная с %{date}',
  timeofday: 'в %{date}',
  startingtimeofday: 'начиная в %{date}',
  infinite: 'всегда',
  until: 'до %{date}',
  count: {
    1: 'один раз',
    2: '%{count} раза',
    3: '%{count} раза',
    4: '%{count} раза',
    'else': '%{count} раз'
  },
  and: 'и ',
  x_of_the_y: {
    yearly: '%{x} в году',
    monthly: '%{x} в месяце'
  },
  bymonth: ' %{months}',
  months: {
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Ноябрь',
    12: 'Декабрь'
  },
  byweekday: 'в %{weekdays}',
  byweekday_is_weekdays: {
    1: 'по будням',
    'else': 'каждый %{interval} будний день'
  },
  weekdays: {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    0: 'Воскресенье'
  },
  weekdays_byweekday: {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среду',
    4: 'Четверг',
    5: 'Пятницу',
    6: 'Суббота',
    0: 'Воскресенье'
  },
  nth_weekday: {
    else: '%{n} %{weekday}'
  },
  '-nth_weekday': {
    1: 'последний %{weekday}',
    2: 'предпоследний %{weekday}',
    else: '%{n} с конца %{weekday}'
  },
  byweekno: {
    else: 'в неделю №%{weeks}',
  },
  nth_weekno: '%{n}',
  bymonthday: '%{monthdays} числа',
  nth_monthday: {
    else: '%{n}-го',
  },
  '-nth_monthday': {
    1: 'последнего',
    2: 'предпоследнего',
    else: '%{n}-го с конца',
  },
  byyearday: {
    else: 'в %{yeardays}-й день',
  },
  nth_yearday: {
    else: '%{n}-й',
  },
  '-nth_yearday': {
    1: 'последний',
    2: 'предпоследний',
    else: '%{n}-й с конца',
  },
  byhour: {
    else: 'в %{hours}',
  },
  nth_hour: '%{n}',
  byminute: {
    2: 'во %{hours}-ю',
    else: 'в %{hours}-ю',
  },
  nth_minute: '%{n}',
  bysecond: {
    2: 'во %{seconds}-ю',
    else: 'в %{seconds}-ю',
  },
  nth_second: '%{n}',
  bysetpos: '',
  nth_setpos: {
    else: '',
  },
  '-nth_setpos': {
    else: '',
  },
  dateFormatLocale: 'ru',
  dateFormatOptions: {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  approximate: 'Примерно'
}
