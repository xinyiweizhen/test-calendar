import React from 'react';
import {makeStyles} from '@smart-link/context';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const PickerToolBar = React.memo(props => {
    const {text, expanded, toggle, onClickLeft, onClickRight} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className="label">{text}</span>

            {!expanded && (
                <>
                    <span className="icon" onClick={onClickLeft}>
                        <KeyboardArrowLeftIcon className="w-20 h-20" />
                    </span>
                    <span className="icon" onClick={onClickRight}>
                        <KeyboardArrowRightIcon className="w-20 h-20" />
                    </span>
                </>
            )}

            <span className="icon" onClick={toggle}>
                {expanded ? (
                    <KeyboardArrowUpIcon className="w-20 h-20" />
                ) : (
                    <KeyboardArrowDownIcon className="w-20 h-20" />
                )}
            </span>
        </div>
    );
});

export default PickerToolBar;

const useStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            width: '100%',
            height: 60,
            padding: '0 20px',
            '& .label': {
                flex: 1,
                cursor: 'default',
                fontSize: '13px',
                lineHeight: '13px',
            },
            '& .icon': {
                flex: 'none',
                marginLeft: theme.spacing(2),
                cursor: 'pointer',
                padding: 4,
                borderRadius: '50%',
            },
            '& .icon:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
        },
        hidden: {
            visibility: 'hidden',
        },
    }),
    {name: 'PickerToolBar'},
);
