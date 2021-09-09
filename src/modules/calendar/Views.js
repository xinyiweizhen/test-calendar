import {views} from './constants';
import Month from './month';
import Day from './day';
import Week from './week';

const VIEWS = {
    [views.MONTH]: Month,
    [views.WEEK]: Week,
    [views.DAY]: Day,
};

export default VIEWS;
