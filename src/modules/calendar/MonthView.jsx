import React from 'react';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import {Paper, Divider, colors} from '@smart-link/core/material-ui';
import clsx from 'clsx';
import MonthDay from './components/MonthDay';
import {WeekDayMapping} from './constants';

const MonthView = () => {
    const classes = useStyles();
    const {dayUtils} = useDayUtils();
    const now = dayUtils.date();
    const weekDayIndex = now.day();
    const currentMonthNumber = dayUtils.getMonth(now);
    const currentMonthWeeks = dayUtils.getWeekArray(now);
    console.log(currentMonthWeeks);
    return (
        <div className={classes.root}>
            <div className={classes.MouthHeader}>
                {dayUtils.getWeekdays().map((weekDayLabel, i) => {
                    const past = i < WeekDayMapping[weekDayIndex];
                    const isWeekDay = WeekDayMapping[weekDayIndex] === i;
                    return (
                        <div
                            key={weekDayLabel}
                            className={clsx(
                                {
                                    past,
                                    isWeekDay,
                                },
                                'week-day-label',
                            )}
                        >
                            <div>周{weekDayLabel}</div>
                        </div>
                    );
                })}
            </div>
            <Paper elevation={0} square className={classes.weekRows}>
                {currentMonthWeeks.map(week => (
                    <div role="row" key={`week-${week[0]}`} className="week-row">
                        <div className="week-content">
                            <div className="day-block-wrapper">
                                {week.map(day => (
                                    <div key={day.toString()} className={clsx({today: dayUtils.isSameDay(day, now)})} />
                                ))}
                            </div>
                            <div className="weekday-header">
                                {week.map(day => {
                                    const inCurrentMonth = dayUtils.getMonth(day) === currentMonthNumber;
                                    const dayProps = {
                                        day,
                                        key: day.toString(),
                                        inCurrentMonth,
                                        today: dayUtils.isSameDay(day, now),
                                    };
                                    return <MonthDay {...dayProps} />;
                                })}
                            </div>
                            <div />
                        </div>
                        <Divider />
                    </div>
                ))}
            </Paper>
        </div>
    );
};

const useStyles = makeAppStyles(
    theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            '&>div:last-child': {
                marginLeft: 1,
            },
        },
        MouthHeader: {
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
            '& > .past': {
                color: theme.palette.grey[400],
            },
            '& > .isWeekDay': {
                color: theme.palette.primary.main,
            },
        },
        weekRows: {
            flex: '0 0 auto',
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
            height: 'calc(100% - 44px)',
            flexDirection: 'column',
            position: 'relative',
            '& > .week-row': {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                position: 'relative',
                '& > .week-content': {
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1 1 0%',
                    position: 'relative',
                    '&> .day-block-wrapper': {
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        flex: 1,
                        display: 'flex',
                        '&>div': {
                            width: 1,
                            flex: 1,
                            height: '100%',
                        },
                        '&>.today': {
                            backgroundColor: colors.grey[700],
                        },
                    },
                    '&> .weekday-header': {
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 2,
                        pointerEvents: 'none',
                    },
                },
            },
        },
    }),
    {name: 'MouthView'},
);

export default MonthView;
