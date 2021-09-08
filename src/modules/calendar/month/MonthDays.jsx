import React from 'react';
import PropTypes from 'prop-types';
import {makeAppStyles, useDayUtils} from '@smart-link/context';
import clsx from 'clsx';
import {
    Divider,
    Paper,
    Popper,
    Portal,
    Fade,
    Typography,
    ClickAwayListener,
    Button,
} from '@smart-link/core/material-ui';
import MonthDay from './MonthDay';

const MonthDays = React.memo(props => {
    /**
     *  open of Popper
     */
    const [open, setOpen] = React.useState(false);
    /**
     *  anchorEl of Popper
     */
    const [anchorEl, setAnchorEl] = React.useState(null);

    const portalContainerRef = React.useRef([]);

    const [show, setShow] = React.useState(false);

    const classes = useStyles();
    const {dayUtils} = useDayUtils();
    const now = dayUtils.date();
    const weekDayIndex = now.day();
    const currentMonthNumber = dayUtils.getMonth(now);
    const currentMonthWeeks = dayUtils.getWeekArray(now);

    const [activeRow, setActiveRow] = React.useState(0);
    const [activeCol, setActiveCol] = React.useState(0);

    const handleDayClick = (event, day, row, col) => {
        event && event.stopPropagation();
        event && event.preventDefault();
        const getBoundingClientRect = () => event.target.getBoundingClientRect();
        setOpen(true);
        setAnchorEl({
            clientWidth: getBoundingClientRect().width,
            clientHeight: getBoundingClientRect().height,
            getBoundingClientRect,
        });
        setShow(true);
        setActiveRow(row);
        setActiveCol(col);
    };

    const handleClose = () => {
        setOpen(false);
        setShow(false);
    };

    return (
        <Paper elevation={0} square className={classes.weekRows}>
            {currentMonthWeeks.map((week, row) => (
                <div
                    role="row"
                    key={`week-${week[0]}`}
                    className="week-row"
                    ref={ref => {
                        portalContainerRef.current[row] = ref;
                    }}
                >
                    <div className="week-content">
                        <div className="day-block-wrapper">
                            {week.map((day, col) => (
                                <div key={day.toString()} onClick={e => handleDayClick(e, day, row, col)} />
                            ))}
                        </div>
                        <div className="weekday-header">
                            {week.map(day => {
                                const inCurrentMonth = dayUtils.getMonth(day) === currentMonthNumber;
                                const dayProps = {
                                    day,
                                    key: day.toString(),
                                    inCurrentMonth,
                                    today: dayUtils.isSameDay(day, now),
                                };
                                return <MonthDay {...dayProps} />;
                            })}
                        </div>
                        <div />
                    </div>
                    {show ? (
                        <Portal container={portalContainerRef.current[row]}>
                            <div className={classes.monthTransformer}>
                                <div className="_trigger resizer fast-create-event-wrapper">
                                    <div
                                        className="month-transformer month-event-instance-wrapper"
                                        style={{
                                            top: 1,
                                            left: `calc(${
                                                activeRow === row
                                                    ? (activeCol / week.length) * 100
                                                    : (activeRow - row) * 100
                                            }% + 5px)`,
                                            width: `calc( ${(1 / week.length) * 100}% - 10px)`,
                                        }}
                                    >
                                        <div
                                            className="month-event-instance"
                                            data-original-time="0"
                                            data-start-time="1632585600"
                                        >
                                            <div className="summary property">添加主题</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Portal>
                    ) : null}
                    <Divider />
                </div>
            ))}
            <Popper
                open={open}
                anchorEl={anchorEl}
                modifiers={{
                    flip: {
                        enabled: true,
                    },
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: 'viewport',
                    },
                }}
                transition
                placement="right"
            >
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Typography className={classes.typography}>The content of the Popper.</Typography>
                            <Button color="primary" variant="contained" onClick={handleClose}>
                                close
                            </Button>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Paper>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        weekRows: {
            flex: '0 0 auto',
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
            height: 'calc(100% - 44px)',
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
                    '&> .day-block-wrapper': {
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
                    '&> .weekday-header': {
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 2,
                        pointerEvents: 'none',
                        '&>div': {},
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

export default MonthDays;
