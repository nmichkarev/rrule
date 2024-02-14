import { RRule } from '../src'
import { bindings } from './languages/rus'

const texts = [
  ['По будням', 'RRULE:FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR'],
  ['Каждый 2 будний день', 'RRULE:INTERVAL=2;FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR'],
  ['Каждый день', 'RRULE:FREQ=DAILY'],
  ['Каждый день в 10, 12 и 17', 'RRULE:FREQ=DAILY;BYHOUR=10,12,17'],
  [
    'Каждую неделю в Воскресенье в 10, 12 и 17',
    'RRULE:FREQ=WEEKLY;BYDAY=SU;BYHOUR=10,12,17',
  ],
  ['Каждую неделю', 'RRULE:FREQ=WEEKLY'],
  ['Каждый час', 'RRULE:FREQ=HOURLY'],
  ['Каждые 4 часа', 'RRULE:INTERVAL=4;FREQ=HOURLY'],
  // Fix
  ['Каждую неделю в Вторник', 'RRULE:FREQ=WEEKLY;BYDAY=TU'],
  ['Каждую неделю в Понедельник и Среду', 'RRULE:FREQ=WEEKLY;BYDAY=MO,WE'],
  ['По будням', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'],
  ['Каждую 2 неделю', 'RRULE:INTERVAL=2;FREQ=WEEKLY'],
  ['Каждый месяц', 'RRULE:FREQ=MONTHLY'],
  ['Каждые 6 месяцев', 'RRULE:INTERVAL=6;FREQ=MONTHLY'],
  ['Каждый год', 'RRULE:FREQ=YEARLY'],
  ['Каждый год в 1 пятницу', 'RRULE:FREQ=YEARLY;BYDAY=+1FR'],
  ['Каждый год в 13 пятницу', 'RRULE:FREQ=YEARLY;BYDAY=+13FR'],
  ['Каждый месяц 4-го числа', 'RRULE:FREQ=MONTHLY;BYMONTHDAY=4'],
  ['Каждый месяц 4-го с конца числа', 'RRULE:FREQ=MONTHLY;BYMONTHDAY=-4'],
  ['Каждый месяц в 3 вторник', 'RRULE:FREQ=MONTHLY;BYDAY=+3TU'],
  ['Каждый месяц в 3 с конца вторник', 'RRULE:FREQ=MONTHLY;BYDAY=-3TU'],
  ['Каждый месяц в последний понедельник', 'RRULE:FREQ=MONTHLY;BYDAY=-1MO'],
  ['Каждый месяц в предпоследний пятницу', 'RRULE:FREQ=MONTHLY;BYDAY=-2FR'],
  ['Каждую неделю до 1 января 2007 г.', 'RRULE:FREQ=WEEKLY;UNTIL=20070101T080000Z'],
  ['Каждую неделю 20 раз', 'RRULE:FREQ=WEEKLY;COUNT=20'],
]

const toTexts = [
  ...texts,
  [
    'Каждую неделю в понедельник',
    'DTSTART;TZID=America/New_York:20220601T000000\nRRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO',
  ],
];

describe('I18N', () => {
  it('toText()', function () {
    toTexts.forEach(function (item) {
      const text = item[0]
      const str = item[1]
      expect(RRule.fromString(str).toText(undefined, bindings).toLowerCase()).toBe(
        text.toLowerCase()
      )
    })
  })
});
