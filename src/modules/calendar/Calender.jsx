import React from 'react';
import {makeStyles, useDayUtils} from '@smart-link/context';
import {Divider, Paper} from '@smart-link/core/material-ui';
import clsx from 'clsx';
import {useParams} from 'react-router-dom';
import VIEWS from './Views';
import CalenderToolBar from './components/CalenderToolBar';
import {isValidView} from './utils';
import {views} from './constants';
import Picker from '../../components/datePicker';

const TestCalender = props => {
    const {className, style} = props;

    const {view} = useParams();

    const classes = useStyles();

    const View = getView(view);

    const {dayUtils} = useDayUtils();

    return (
        <div className={clsx(classes.root, className)} style={style}>
            <Paper square className={classes.tool}>
                <Picker />
                <Divider />
                <div>aaaaaaaaa</div>
            </Paper>
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

const useStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        },
        tool: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: 256,
            height: '100%',
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
