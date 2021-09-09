/**
 * 用于 day() 与 getWeekdays() 索引对应
 *
 *  day(): 0 1 2 3 4 5 6 => 0: 周日 ... 6: 周六
 *
 *  getWeekdays(): ["一", "二", "三", "四", "五", "六", "日"]
 * @type {{"0": 周日, "1": 周一, "2": 周二, "3": 周三, "4": 周四, "5": 周五, "6": 周六}}
 */
export const WeekDayMapping = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
};

export const views = {
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
};

export const timeLineArray = [
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];

export const animationDirection = {
    left: 'transition.slideLeftBigIn',
    right: 'transition.slideRightBigIn',
};

/**
 * The number of milliseconds one day.
 *  60 * 60 * 1000 * 24
 * @type {number}
 */
export const MILLISECONDS_PER_DAY = 86400000;
/**
 * The number of milliseconds one hour.
 * 60 * 60 * 1000
 * @type {number}
 */
export const MILLISECONDS_PER_HOUR = 3600000;

/**
 * The number of milliseconds one minutes.
 *  60 * 1000
 * @type {number}
 */
export const MILLISECONDS_PER_MINUTES = 60000;
