import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useDayUtils} from '@smart-link/context';
import clsx from 'clsx';

const MonthDay = memo(props => {
    const {className, day, inCurrentMonth, today = false, ...restProp} = props;

    const classes = useStyles();

    const {dayUtils} = useDayUtils();

    const dayClassName = clsx(classes.dayLabel, className, {
        [classes.dayOutsideMonth]: !inCurrentMonth,
        [classes.today]: today,
    });

    return (
        <div className={dayClassName} {...restProp}>
            {!today && dayUtils.isSameDay(day, dayUtils.startOfMonth(day)) ? (
                <span>{`${dayUtils.format(day, 'monthShort')}${dayUtils.format(day, 'dayOfMonth')}日`}</span>
            ) : (
                <span>{dayUtils.format(day, 'dayOfMonth')}</span>
            )}
        </div>
    );
});

const useStyles = makeStyles(theme => ({
    dayLabel: {
        position: 'relative',
        flex: '1 1 0%',
        display: 'flex',
        padding: '8px 10px 0px 10px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '&>span': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: theme.typography.htmlFontSize,
            lineHeight: '24px',
            height: 24,
        },
        '&$today > span': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderRadius: '50%',
            width: 24,
        },
    },
    today: {},
    dayOutsideMonth: {
        color: theme.palette.grey[500],
    },
}));

MonthDay.propsType = {
    today: PropTypes.bool,
    inCurrentMonth: PropTypes.bool,
};

export default MonthDay;
