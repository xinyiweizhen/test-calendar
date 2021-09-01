import React from 'react';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import {SmartLinkScrollbars} from '@smart-link/core';
import {Divider, Paper} from '@smart-link/core/material-ui';
import WeekHeader from './components/WeekHeader';
import TimeLine from './components/TimeLine';

const OneDayView = () => {
    const classes = useStyles();

    const {dayUtils} = useDayUtils();
    const now = dayUtils.date();
    const currentMonthNumber = dayUtils.getMonth(now);
    const currentMonthWeeks = dayUtils.getWeekArray(now);
    console.log(now, currentMonthNumber, currentMonthWeeks);

    console.log(dayUtils.format(dayUtils.startOfWeek(now), 'weekdayShort'));
    console.log(dayUtils.endOfWeek(now));

    return (
        <div className={classes.root}>
            <WeekHeader />
            <Paper className={classes.content}>
                <TimeLine />
                <Divider orientation="vertical" />
                <div>
                    <div />
                    <div />
                </div>
            </Paper>
        </div>
    );
};

const useStyles = makeAppStyles(
    theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            boxShadow: theme.shadows[1],
            display: 'flex',
            width: '100%',
            flex: 'none',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            '& > .padding': {
                width: 60,
                flexShrink: 0,
                alignSelf: 'stretch',
                position: 'relative',
                '& > .timezone': {
                    fontSize: '11px',
                    top: 40,
                    left: 0,
                    width: 59,
                    position: 'absolute',
                    zIndex: 1,
                },
            },
            '& > .one-day': {
                width: '100%',
                flex: 1,
                overflow: 'hidden',
                position: 'relative',
            },
        },
        content: {
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
        },
        timeline: {
            overflow: 'hidden',
            flex: '0 0 auto',
            '&>.timeline': {
                position: 'relative',
                width: 60,
            },
        },
    }),
    {name: 'OneDayView'},
);

export default OneDayView;
