import React, {memo, useEffect, useState} from 'react';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import {SmartLinkScrollbars} from '@smart-link/core';
import {Divider, Paper} from '@smart-link/core/material-ui';
import clsx from 'clsx';
import useTopByNowTime from '../hooks/useTopByNowTime';
import WeekHeader from '../components/WeekHeader';
import TimeLine from '../components/TimeLine';
import {getWeekDayList} from '../utils';

const WeekView = memo(props => {
    const classes = useStyles();

    const {indexDate} = props;

    const [currentWeek, setCurrentWeek] = useState(indexDate);

    const {dayUtils} = useDayUtils();
    const now = dayUtils.date();

    const [top, text] = useTopByNowTime();

    const weekList = getWeekDayList({dayUtils, selectedDate: indexDate});

    const inWeeks = dayUtils.w;
    return (
        <div className={classes.root}>
            <WeekHeader isWeek date={currentWeek} weeks={weekList} />
            <SmartLinkScrollbars style={{width: '100%'}}>
                <Paper square className={classes.content}>
                    <TimeLine top={top} text={text} date={currentWeek} />
                    <Divider orientation="vertical" flexItem />
                    <div className={classes.columns}>
                        <div className="row-line-container">
                            {Array.from({length: 24}, (_v, i) => (
                                <div key={`line-key-${i}`}>
                                    <div className="row-line-item" />
                                    <Divider />
                                </div>
                            ))}
                        </div>
                        {weekList.map(day => (
                            <React.Fragment key={day.toString()}>
                                <div
                                    className={clsx({[classes.today]: dayUtils.isSameDay(day, now)}, 'day-column')}
                                    style={{height: 1104}}
                                >
                                    <div
                                        className="now-pointer"
                                        style={{top, display: dayUtils.isSameDay(day, now) ? 'block' : 'none'}}
                                    >
                                        <div className="indicator" />
                                    </div>
                                </div>
                                <Divider orientation="vertical" />
                            </React.Fragment>
                        ))}
                    </div>
                </Paper>
            </SmartLinkScrollbars>
        </div>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 'auto',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            minHeight: 0,
            position: 'relative',
            '&>div:last-child': {
                marginLeft: 1,
            },
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
        columns: {
            position: 'relative',
            display: 'flex',
            boxSizing: 'border-box',
            flex: 'auto',
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            '&>.row-line-container': {
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                pointerEvents: 'none',
                '&>div>div': {
                    height: 45,
                    position: 'relative',
                },
            },
            '& .day-column': {
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                position: 'relative',
                flex: 'auto',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&>.now-pointer': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 0,
                    pointerEvents: 'none',
                    zIndex: theme.zIndex.drawer + 1,
                    borderTop: '1px solid',
                    borderColor: theme.palette.error.dark,
                    '&>.indicator': {
                        display: 'none',
                        position: 'absolute',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.error.dark,
                        left: -5,
                        top: -5,
                    },
                },
                '&$today >.now-pointer>.indicator ': {
                    display: 'block',
                },
            },
        },
        today: {},
    }),
    {name: 'WeekView'},
);

export default WeekView;
