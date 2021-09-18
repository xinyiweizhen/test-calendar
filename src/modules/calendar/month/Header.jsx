import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import clsx from 'clsx';
import {WeekDayMapping} from '../constants';

const MonthHeader = memo(props => {
    const classes = useStyles();
    const {currentMonth: selectedDate} = props;
    const {dayUtils} = useDayUtils();
    const now = dayUtils.date();

    const weekDayIndex = now.day();

    const isSameMonth = dayUtils.isSameMonth(now, selectedDate);

    return (
        <div className={classes.root}>
            {dayUtils.getWeekdays().map((weekDayLabel, i) => {
                const past = isSameMonth && i < WeekDayMapping[weekDayIndex];
                const today = isSameMonth && WeekDayMapping[weekDayIndex] === i;
                return (
                    <div
                        key={weekDayLabel}
                        className={clsx(
                            {
                                [classes.past]: past,
                                [classes.today]: today,
                            },
                            'week-day-label',
                        )}
                    >
                        <div>周{weekDayLabel}</div>
                    </div>
                );
            })}
        </div>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        root: {
            display: 'flex',
            height: 44,
            width: '100%',
            flex: '0 0 auto',
            alignItems: 'center',
            justifyContent: 'flex-start',
            boxShadow: theme.shadows[1],
            '&> .week-day-label': {
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 10,
                justifyContent: 'flex-start',
                fontSize: theme.typography.fontSize,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 'normal',
                letterSpacing: 'normal',
                flex: 1,
            },
            '& > $past': {
                color: theme.palette.grey[400],
            },
            '& > $today': {
                color: theme.palette.primary.main,
            },
        },
        past: {},
        today: {},
    }),
    {name: 'MouthHeader'},
);

export default MonthHeader;
