import {views} from './constants';

/**
 *  Get current week list
 * @param dayUtils
 * @param selectedDate
 * @returns {[]}
 */
export function getWeekDayList({dayUtils, selectedDate = dayUtils.date()}) {
    const clone = dayUtils.date(selectedDate);
    const weekList = [];
    const weekDay = clone.day();
    for (let i = 1; i < weekDay; i++) {
        weekList.unshift(dayUtils.addDays(clone, -i));
    }
    for (let i = 0; i < 7 - weekDay + 1; i++) {
        weekList.push(dayUtils.addDays(clone, i));
    }
    return weekList;
}

/**
 *  hour distance
 * @type {number}
 */
const HOURS_OFFSET = 46;
/**
 *  Gets the top height from the parent element through the current time
 * @param now
 */
export function getTopOffsetByTime({dayUtils, now}) {
    const nowMinutes = dayUtils.getHours(now) * 60 + dayUtils.getMinutes(now);
    return Math.round((nowMinutes * HOURS_OFFSET) / 60);
}
/**
 * calculate hide offset
 * @param hours
 * @param top
 * @returns {boolean}
 */
export function calcHiddenOffset(hours, top) {
    const cache = {};
    if (!cache[hours]) {
        cache[hours] = hours * HOURS_OFFSET;
    }
    const max = Math.max(cache[hours], top);
    const min = Math.min(cache[hours], top);
    /** 12: hidden offset */
    return max - min < 12;
}

function viewNames(_views) {
    return !Array.isArray(_views) ? Object.values(_views) : _views;
}

export function isValidView(view) {
    const names = viewNames(views);
    return names.indexOf(view) !== -1;
}
