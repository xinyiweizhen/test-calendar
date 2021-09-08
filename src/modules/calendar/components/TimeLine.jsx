import React from 'react';
import {makeAppStyles} from '@smart-link/context';
import clsx from 'clsx';
import {timeLineArray} from '../constants';
// eslint-disable-next-line import/named
import {calcHiddenOffset} from '../utils';

const TimeLine = React.memo(props => {
    const classes = useStyles();

    const {text, top} = props;

    return (
        <div className={classes.wrapper}>
            <div className={classes.timeline}>
                <div className="wrapper">
                    <div className={classes.content}>
                        {timeLineArray.map((hours, i) => (
                            <span key={hours} className={clsx({[classes.hidden]: calcHiddenOffset(i + 1, top)})}>
                                {hours}
                            </span>
                        ))}
                    </div>
                    <span className="timeline-now" style={{top, display: 'block'}}>
                        {text}
                    </span>
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
            '&:after': {
                content: ' ',
                display: 'block',
                width: 1,
                height: '100%',
                overflow: 'hidden',
                bottom: 0,
                left: 0,
                backgroundColor: theme.palette.divider,
                position: 'absolute',
                transformOrigin: 'left top',
                zIndex: 1,
            },
        },
        timeline: {
            position: 'relative',
            width: 60,
            '&>.wrapper': {
                display: 'flex',
                justifyContent: 'center',
                '&>.timeline-now': {
                    textAlign: 'center',
                    position: 'absolute',
                    width: '100%',
                    fontSize: theme.typography.body2.fontSize,
                    color: theme.palette.error.dark,
                    transform: 'translateY(-50%)',
                },
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
        hidden: {
            visibility: 'hidden',
        },
    }),
    {name: 'TimeLine'},
);

export default TimeLine;
