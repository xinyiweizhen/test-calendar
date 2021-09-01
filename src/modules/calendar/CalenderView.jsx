import React from 'react';
import {makeAppStyles} from '@smart-link/context';
import CalenderToolBar from './CalenderToolBar';
import OneDayView from './OneDayView';
import MonthView from './MonthView';

const CalenderView = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CalenderToolBar />
            <OneDayView />
        </div>
    );
};

const useStyles = makeAppStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
}));

export default CalenderView;
