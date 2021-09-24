import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useDayUtils} from '@smart-link/context';
import {Divider, Paper, Dialog, DialogTitle, DialogContent, Typography, IconButton} from '@smart-link/core/material-ui';
import CloseIcon from '@material-ui/icons/Close';
import MonthDay from './MonthDay';
import BlockCells from './BlockCells';

const MonthDays = React.memo(props => {
    const {weeks, currentMonth, onSelectSlot} = props;

    const container = React.useRef();

    const classes = useStyles();

    const {dayUtils} = useDayUtils();

    const now = dayUtils.date();

    const [open, setOpen] = React.useState(false);

    const renderHeadingCell = React.useCallback((day, _index) => {
        const inCurrentMonth = dayUtils.isSameMonth(day, currentMonth);
        const dayProps = {
            day,
            key: day.toString(),
            inCurrentMonth,
            today: inCurrentMonth && dayUtils.isSameDay(day, now),
        };
        return <MonthDay {...dayProps} />;
    }, []);

    const handleSelectSlot = slot => {
        console.log(slot);
        setOpen(true);
    };

    const handleClose = e => {
        e && e.stopPropagation();
        e && e.preventDefault();
        setOpen(false);
    };

    const getContainer = () => {
        return container.current;
    };

    return (
        <Paper elevation={0} square className={classes.rows} ref={container}>
            {weeks.map((week, rowIndex) => (
                <div key={`week-${week[0]}`} role="row" className={classes.row}>
                    <div className="week-content">
                        <BlockCells onSelectSlot={handleSelectSlot} open={open} week={week} container={getContainer} />
                        <div className="weekday-header">{week.map(renderHeadingCell)}</div>
                        {/* TODO show event */}
                    </div>
                    <Divider />
                </div>
            ))}
            <Dialog
                open={open}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                scroll="paper"
                onBackdropClick={handleClose}
            >
                <DialogTitle disableTypography className={classes.dialogTitle}>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
                        augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque
                        nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                    </Typography>
                </DialogContent>
            </Dialog>
        </Paper>
    );
});

const useStyles = makeStyles(
    theme => ({
        rows: {
            flex: '0 0 auto',
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
            height: '100%',
            flexDirection: 'column',
            position: 'relative',
        },
        row: {
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
        dialogTitle: {
            width: '100%',
            height: 52,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
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
