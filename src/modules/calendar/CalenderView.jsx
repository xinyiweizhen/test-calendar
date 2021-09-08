import React from 'react';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import CalenderToolBar from './CalenderToolBar';
import OneDayView from './OneDayView';
import MonthView from './MonthView';
import Month from './month';

const CalenderView = () => {
    const classes = useStyles();
    const {dayUtils} = useDayUtils();
    return (
        <div className={classes.root}>
            <CalenderToolBar />
            <OneDayView indexDate={dayUtils.date()} />
        </div>
    );
};

const useStyles = makeAppStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 'auto',
        overflow: 'hidden',
    },
}));

export default CalenderView;
