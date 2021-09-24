import React from 'react';
import {makeStyles, useDayUtils} from '@smart-link/context';
import clsx from 'clsx';

const DayPanel = React.memo(props => {
    const {indexDate, selectedDate, onChange, onClick} = props;
    const classes = useStyles();

    const {dayUtils} = useDayUtils();
    const now = dayUtils.date();

    const weeks = dayUtils.getWeekArray(indexDate);

    const handleClick = (event, day) => {
        const mergeDay = dayUtils.mergeDateAndTime(day, selectedDate || now);
        onChange(mergeDay, 'finish');
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                {dayUtils.getWeekdays().map(label => (
                    <div className="label" key={label}>
                        {label}
                    </div>
                ))}
            </div>
            <div className={classes.body} role="grid">
                {weeks.map(week => (
                    <div role="row" key={`week-${week[0]}`} className="week">
                        {week.map((day, index) => {
                            const no = index !== week.length - 1;
                            const inCurrentMonth = dayUtils.isSameMonth(day, indexDate);
                            return (
                                <React.Fragment key={day.toString()}>
                                    <div
                                        className={clsx('date', {
                                            [classes.otherMonth]: !inCurrentMonth,
                                            [classes.today]: dayUtils.isSameDay(day, now),
                                            [classes.selected]: selectedDate && dayUtils.isSameDay(day, selectedDate),
                                        })}
                                        onClick={e => handleClick(e, day)}
                                    >
                                        {dayUtils.format(day, 'dayOfMonth')}
                                    </div>
                                    {no && <div className="fill-date" />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default DayPanel;

const useStyles = makeStyles(
    theme => ({
        root: {
            fontSize: '12px',
            padding: '0 12px',
            boxSizing: 'border-box',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            height: 24,
            paddingBottom: theme.spacing(1),
            color: theme.palette.grey[500],
            '& .label': {
                cursor: 'default',
                textAlign: 'center',
                flex: 'none',
                width: 28,
            },
        },
        body: {
            '& .week, & .date': {
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
            },
            '&. week': {
                justifyContent: 'space-between',
                padding: '2px 0',
            },
            '& .date': {
                width: 28,
                height: 28,
                lineHeight: '28px',
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                justifyContent: 'center',
                flex: 'none',
            },
            '& .date$otherMonth': {
                color: theme.palette.grey[500],
            },
            '& .date$selected': {
                backgroundColor: theme.palette.primary.main,
            },
            '& .date$today': {
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
            },
            '& .fill-date': {
                flex: 1,
                minWidth: 6,
                height: 28,
            },
        },
        otherMonth: {},
        today: {},
        selected: {},
    }),
    {name: 'DayPanel'},
);
