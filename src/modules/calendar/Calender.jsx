import React, {useState} from 'react';
import {SmartLinkCalendar} from '@smart-link/core';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import clsx from 'clsx';
import {useParams} from 'react-router-dom';
import VIEWS from './Views';
import CalenderToolBar from './components/CalenderToolBar';
import {isValidView} from './utils';
import {views} from './constants';

const TestCalender = props => {
    const {className, style} = props;

    const {view} = useParams();

    const classes = useStyles();

    const View = getView(view);

    const {dayUtils} = useDayUtils();

    return (
        <div className={clsx(classes.root, className)} style={style}>
            <div>
                <SmartLinkCalendar calendarType="date" elevation={0} />
            </div>
            <div className={classes.content}>
                <CalenderToolBar view={view} />
                <View indexDate={dayUtils.date()} />
            </div>
        </div>
    );
};

const getView = view => {
    if (!isValidView(view)) {
        return VIEWS[views.DAY];
    }
    return VIEWS[view];
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
