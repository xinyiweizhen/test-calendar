import React from 'react';
import PropTypes from 'prop-types';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import clsx from 'clsx';
import {Divider, Paper} from '@smart-link/core/material-ui';
import SmartLinkAnimateGroup from '@smart-link/core/components/SmartLinkAnimateGroup';
import MonthDay from './Day';
import BackgroundCells from './BackgroundCells';

const MonthDays = React.memo(props => {
    const {weeks, currentMonth, animationEntry, animationLeave} = props;

    const classes = useStyles();

    const {dayUtils} = useDayUtils();

    const renderHeadingCell = (day, _index) => {
        const inCurrentMonth = dayUtils.isSameMonth(day, currentMonth);
        const dayProps = {
            day,
            key: day.toString(),
            inCurrentMonth,
            today: inCurrentMonth && dayUtils.isSameDay(day, currentMonth),
        };
        return <MonthDay {...dayProps} />;
    };

    return (
        <SmartLinkAnimateGroup
            enter={{
                animation: animationEntry,
                duration: 250,
            }}
            leave={{
                animation: animationLeave,
                duration: 250,
            }}
            className={clsx(classes.root)}
        >
            <Paper elevation={0} square className={classes.weekRows}>
                {weeks.map((week, row) => (
                    <div role="row" key={`week-${week[0]}`} className="week-row">
                        <div className="week-content">
                            <BackgroundCells week={week} />
                            <div className="weekday-header">{week.map(renderHeadingCell)}</div>
                            {/* TODO show event */}
                        </div>
                        <Divider />
                    </div>
                ))}
            </Paper>
        </SmartLinkAnimateGroup>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        root: {
            flex: '0 0 auto',
            width: '100%',
            height: 'calc(100% - 44px)',
            overflow: 'hidden',
        },
        weekRows: {
            flex: '0 0 auto',
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
            height: '100%',
            flexDirection: 'column',
            position: 'relative',
            '& > .week-row': {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                position: 'relative',
                '& > .week-content': {
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1 1 0%',
                    position: 'relative',
                    '&> .weekday-header': {
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 2,
                        pointerEvents: 'none',
                    },
                },
            },
        },
        typography: {
            width: 492,
            height: 416,
        },
        monthTransformer: {
            display: 'flex',
            position: 'absolute',
            top: 33,
            height: 20,
            width: '100%',
            '& .month-transformer': {
                position: 'absolute',
                borderTopRightRadius: 2,
                borderBottomRightRadius: 2,
                zIndex: 2,
                top: 0,
                left: 0,
                height: '100%',
                boxSizing: 'border-box',
                cursor: 'pointer',
                pointerEvents: 'auto',
                '& .month-event-instance': {
                    color: theme.palette.primary.main,
                    border: '0.5px solid',
                    opacity: 0.9,
                    borderRadius: 1,
                    height: 22,
                    fontSize: '10px',
                    padding: '0 0 0 5px',
                    width: '100%',
                },
            },
        },
    }),
    {name: 'MouthDays'},
);

MonthDays.propTypes = {
    weeks: PropTypes.array,
};

export default MonthDays;
