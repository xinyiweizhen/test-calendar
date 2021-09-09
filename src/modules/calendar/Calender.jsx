import React, {useState} from 'react';
import {SmartLinkCalendar} from '@smart-link/core';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import clsx from 'clsx';
import {views} from './constants';
import VIEWS from './Views';
import CalenderToolBar from './components/CalenderToolBar';

const TestCalender = props => {
    const {className, style} = props;

    const [view, setView] = useState(views.DAY);

    const classes = useStyles();

    const onView = v => {
        setView(v);
    };

    const View = VIEWS[view];

    const {dayUtils} = useDayUtils();

    return (
        <div className={clsx(classes.root, className)} style={style}>
            <div>
                <SmartLinkCalendar calendarType="date" elevation={0} />
            </div>
            <div className={classes.content}>
                <CalenderToolBar view={view} onView={onView} />
                <View indexDate={dayUtils.addWeeks(dayUtils.date(), 1)} />
            </div>
        </div>
    );
};

const useStyles = makeAppStyles(
    theme => ({
        root: {
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 'auto',
            overflow: 'hidden',
        },
    }),
    {name: 'Calender'},
);

export default TestCalender;
