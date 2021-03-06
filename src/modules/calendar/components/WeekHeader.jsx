import React from 'react';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import PropsType from 'prop-types';
import {Paper, Divider} from '@smart-link/core/material-ui';
import clsx from 'clsx';
import {getWeekDayList} from '../utils';

const WeekHeader = React.memo(props => {
    const {isWeek, weeks} = props;
    const classes = useStyles();

    const {dayUtils} = useDayUtils();

    const now = dayUtils.date();

    return (
        <div className={classes.root}>
            <div className={classes.timeZone}>
                <div className="timezone">GMT+8</div>
            </div>
            <Divider orientation="vertical" />
            <div className={classes.header}>
                <div className="title-row">
                    <div className="cell-block">
                        {isWeek ? (
                            weeks.map((day, i) => {
                                const today = dayUtils.isSameDay(day, now);
                                const todayIndex = weeks.findIndex(d => dayUtils.isSameDay(d, now));
                                return (
                                    <React.Fragment key={day.toString()}>
                                        <div
                                            className={clsx(classes.headerCell, {
                                                [classes.weekly]: isWeek,
                                                [classes.today]: today,
                                                [classes.past]: todayIndex && i < todayIndex,
                                            })}
                                        >
                                            <div className="weekLabel">{dayUtils.format(day, 'weekdayShort')}</div>
                                            <div className="dayLabel">{dayUtils.format(day, 'dayOfMonth')}</div>
                                        </div>
                                        <Divider orientation="vertical" flexItem />
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <div className={classes.headerCell}>
                                <div>????????????</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="all-day-events-container">
                    <div className="cell-block" />
                </div>
            </div>
        </div>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        root: {
            position: 'relative',
            boxShadow: theme.shadows[1],
            display: 'flex',
            width: '100%',
            flex: 'none',
            overflow: 'hidden',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        timeZone: {
            width: 60,
            flexShrink: 0,
            alignSelf: 'stretch',
            position: 'relative',
            '&>.timezone': {
                textAlign: 'center',
                fontSize: theme.typography.subtitle1.fontSize,
                top: 40,
                left: 0,
                width: 59,
                position: 'absolute',
                zIndex: 1,
            },
        },
        header: {
            position: 'relative',
            boxSizing: 'border-box',
            width: '100%',
            flex: 'auto',
            '& >.title-row': {
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                flex: 'auto',
                '&> .cell-block': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flex: 'auto',
                    height: '100%',
                },
            },
            '& .all-day-events-container': {
                position: 'relative',
                display: 'flex',
                visibility: 'hidden',
                boxSizing: 'border-box',
                width: '100%',
                margin: '60px 0 0',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 'none',
            },
        },
        headerCell: {
            position: 'relative',
            zIndex: 0,
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            padding: '0px 0px 0px 9px',
            cursor: 'pointer',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flex: 1,
            '&>div': {
                height: 42,
                width: 'calc(100% - 60px)',
                fontSize: 12,
                lineHeight: '42px',
                fontWeight: '600',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
            '&$weekly>.weekLabel': {
                fontSize: 13,
                margin: '6px 0 0',
                flex: 'none',
                height: 16,
                lineHeight: '16px',
                pointerEvents: 'none',
            },
            '&$weekly>.dayLabel': {
                fontSize: '26px',
                fontFamily:
                    "DINAlternate-Bold,PingFangSC-Semibold,'Microsoft Yahei','Myriad Pro','Hiragino Sans GB',sans-serif",
                margin: '3px 0 0',
                fontWeight: '600',
                height: '30px',
                lineHeight: '30px',
                flex: 'none',
                pointerEvents: 'none',
            },
            '&$today': {
                color: theme.palette.primary.main,
            },
            '&$past': {
                color: theme.palette.grey[400],
            },
        },
        weekly: {},
        today: {},
        past: {},
    }),
    {name: 'WeekHeader'},
);

WeekHeader.propsType = {
    /* ?????????????????? */
    isWeek: PropsType.bool,
};

export default WeekHeader;
