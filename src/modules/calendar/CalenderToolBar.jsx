import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Divider,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
} from '@smart-link/core/material-ui';
import {makeAppStyles, withStyles} from '@smart-link/context';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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

const CalenderToolBar = React.memo(props => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <div className={classes.navLabel}>
                    <Button size="medium" variant="outlined">
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
                    <StyledToggleButtonGroup value="month" exclusive aria-label="view">
                        <ToggleButton value="day" aria-label="day view">
                            日视图
                        </ToggleButton>
                        <ToggleButton value="week" aria-label="week view">
                            周视图
                        </ToggleButton>
                        <ToggleButton value="month" aria-label="mouth view">
                            月视图
                        </ToggleButton>
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
