import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import clsx from 'clsx';

const BackgroundCells = memo(props => {
    const classes = useStyles();

    const {week} = props;

    // TODO 处理交互
    return (
        <div className={classes.root}>
            {week.map((day, index) => (
                <div key={day.toString()} />
            ))}
        </div>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        root: {
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
        },
    }),
    {name: 'BackgroundCells'},
);

export default BackgroundCells;
