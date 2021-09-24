import React from 'react';
import {AppBar, Toolbar, Button, IconButton, ToggleButton, ToggleButtonGroup} from '@smart-link/core/material-ui';
import {makeAppStyles, withStyles} from '@smart-link/context';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useHistory, useLocation} from 'react-router';
import {views} from '../constants';
import {isValidView} from '../utils';

const StyledToggleButtonGroup = withStyles(theme => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles(theme => ({
    root: {
        padding: '5px 20px',
    },
}))(ToggleButton);

const CalenderToolBar = React.memo(props => {
    const classes = useStyles();
    const {view, onTodayClick} = props;
    const history = useHistory();
    const location = useLocation();

    const handleViewChange = (_event, v) => {
        if (v !== view && isValidView(v)) {
            history.push(location.pathname.replace(view, v));
            if (typeof props.onViewChange === 'function') {
                props.onViewChange(v);
            }
        }
    };

    const handleTodayClick = _event => {
        onTodayClick && onTodayClick(_event);
    };
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <div className={classes.navLabel}>
                    <Button size="medium" variant="outlined" onClick={handleTodayClick}>
                        今天
                    </Button>
                    <IconButton>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </div>
                <div className={classes.paper}>
                    <StyledToggleButtonGroup onChange={handleViewChange} value={view} exclusive aria-label="view">
                        <StyledToggleButton value={views.DAY} aria-label="day view">
                            日
                        </StyledToggleButton>
                        <StyledToggleButton value={views.WEEK} aria-label="week view">
                            周
                        </StyledToggleButton>
                        <StyledToggleButton value={views.MONTH} aria-label="mouth view">
                            月
                        </StyledToggleButton>
                    </StyledToggleButtonGroup>
                </div>
            </Toolbar>
        </AppBar>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        appBar: {
            minHeight: 72,
        },
        navLabel: {
            flex: 1,
            '& > button:first-child': {
                marginRight: theme.spacing(2),
            },
        },
        paper: {
            display: 'flex',
            border: `2px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
        },
    }),
    {name: 'CalenderToolBar'},
);

export default CalenderToolBar;
