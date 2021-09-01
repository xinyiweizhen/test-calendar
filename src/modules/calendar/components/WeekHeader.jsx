import React from 'react';
import {makeAppStyles} from '@smart-link/context';
import {Paper, Divider} from '@smart-link/core/material-ui';

const WeekHeader = React.memo(props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.timeZone}>
                <div className="timezone">GMT+8</div>
            </div>
            <Divider orientation="vertical" />
            <div className={classes.header}>
                <div className="title-row">
                    <div className="cell-block">
                        <div className={classes.headerCell}>
                            <div>日程管理</div>
                        </div>
                    </div>
                </div>
                <div />
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
            height: 60,
            flex: '0 0 auto',
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
            '& > .title-row,& > .title-row > .cell-block': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            '& > .title-row': {
                position: 'absolute',
                top: 0,
                left: 0,
                boxSizing: 'border-box',
                width: '100%',
                flex: '0 0 auto',
                '&> .cell-block': {
                    flex: 1,
                },
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
        },
    }),
    {name: 'WeekHeader'},
);

export default WeekHeader;
