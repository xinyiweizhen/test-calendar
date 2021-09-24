import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {makeAppStyles, useDayUtils, useEnhancedEffect} from '@smart-link/context';
import clsx from 'clsx';
import {SmartLinkAnimateGroup} from '@smart-link/core';
import MonthHeader from './Header';
import MonthDays from './MonthDays';
import {animationDirection} from '../constants';

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

    const weeks = dayUtils.getWeekArray(currentMonth);

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
            <SmartLinkAnimateGroup
                enter={{
                    animation: animationEntry,
                    duration: 250,
                }}
                className={clsx(classes.animation)}
            >
                <MonthDays weeks={weeks} currentMonth={currentMonth} />
            </SmartLinkAnimateGroup>
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
        animation: {
            flex: '0 0 auto',
            width: '100%',
            height: 'calc(100% - 44px)',
            overflow: 'hidden',
        },
    }),
    {name: 'MouthView'},
);

export default MonthView;
