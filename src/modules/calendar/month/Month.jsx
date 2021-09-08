import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {makeAppStyles, useDayUtils, useEnhancedEffect} from '@smart-link/context';
import clsx from 'clsx';
import MonthHeader from './Header';
import MonthDays from './Days';
import {animationDirection, WeekDayMapping} from '../constants';

const MonthView = memo(props => {
    const {className, indexDate} = props;
    const classes = useStyles();
    const {dayUtils} = useDayUtils();

    const [animationEntry, setAnimationEntry] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(indexDate);

    useEnhancedEffect(() => {
        if (dayUtils.isSameDay(indexDate, currentMonth)) {
            return;
        }
        if (!dayUtils.isSameMonth(indexDate, currentMonth)) {
            if (dayUtils.isAfter(indexDate, currentMonth)) {
                setAnimationEntry(animationDirection.right);
            } else {
                setAnimationEntry(animationDirection.left);
            }
        } else {
            setAnimationEntry(null);
        }
        setCurrentMonth(indexDate);
    }, [indexDate]);

    const currentMonthWeeks = dayUtils.getWeekArray(currentMonth);

    const onClickLeft = () => {
        setCurrentMonth(dayUtils.addMonths(currentMonth, -1));
        setAnimationEntry(animationDirection.left);
    };

    const onClickRight = () => {
        setCurrentMonth(dayUtils.addMonths(currentMonth, 1));
        setAnimationEntry(animationDirection.right);
    };

    return (
        <div role="grid" aria-label="Month View" className={clsx(classes.root, className)}>
            <MonthHeader currentMonth={currentMonth} />
            <MonthDays weeks={currentMonthWeeks} currentMonth={currentMonth} />
        </div>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            '&>div:last-child': {
                marginLeft: 1,
            },
        },
    }),
    {name: 'MouthView'},
);

export default MonthView;
