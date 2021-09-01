import React from 'react';
import {makeAppStyles} from '@smart-link/context';
import {Divider} from '@smart-link/core/material-ui';

const TimeLine = React.memo(props => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.timeline}>
                <div className="wrapper">
                    <div className={classes.content}>
                        <span className="calendar-timeline-slot">01:00</span>
                        <span className="calendar-timeline-slot">02:00</span>
                        <span className="calendar-timeline-slot">03:00</span>
                        <span className="calendar-timeline-slot">04:00</span>
                        <span className="calendar-timeline-slot">05:00</span>
                        <span className="calendar-timeline-slot">06:00</span>
                        <span className="calendar-timeline-slot">07:00</span>
                        <span className="calendar-timeline-slot">08:00</span>
                        <span className="calendar-timeline-slot">09:00</span>
                        <span className="calendar-timeline-slot">10:00</span>
                        <span className="calendar-timeline-slot">11:00</span>
                        <span className="calendar-timeline-slot">12:00</span>
                        <span className="calendar-timeline-slot">13:00</span>
                        <span className="calendar-timeline-slot">14:00</span>
                        <span className="calendar-timeline-slot">15:00</span>
                        <span className="calendar-timeline-slot">16:00</span>
                        <span className="calendar-timeline-slot">17:00</span>
                        <span className="calendar-timeline-slot">18:00</span>
                        <span className="calendar-timeline-slot">19:00</span>
                        <span className="calendar-timeline-slot">20:00</span>
                        <span className="calendar-timeline-slot">21:00</span>
                        <span className="calendar-timeline-slot">22:00</span>
                        <span className="calendar-timeline-slot">23:00</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        wrapper: {
            overflow: 'hidden',
            flex: '0 0 auto',
        },
        timeline: {
            position: 'relative',
            width: 60,
            '&>.wrapper': {
                display: 'flex',
                justifyContent: 'center',
            },
        },
        content: {
            height: 1104,
            paddingTop: 24,
            paddingBottom: 24,
            fontSize: theme.typography.body2.fontSize,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'relative',
        },
    }),
    {name: 'TimeLine'},
);

export default TimeLine;
