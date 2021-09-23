import React from 'react';
import {makeStyles} from '@smart-link/context';
import {SmartLinkIcon} from '@smart-link/core';
import {IconButton} from '@smart-link/core/material-ui';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import clsx from 'clsx';

const PickerToolBar = React.memo(props => {
    const {text, expanded, toggle, onClickLeft, onClickRight} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className="label">{text}</span>
            <span className={clsx('icon', expanded && 'invisible')}>
                <IconButton onClick={onClickLeft}>
                    <SmartLinkIcon name="KeyboardArrowLeft" className="w-20 h-20" />
                </IconButton>
            </span>
            <span className={clsx('icon', expanded && 'invisible')}>
                <IconButton onClick={onClickRight}>
                    <SmartLinkIcon name="KeyboardArrowRight" className="w-20 h-20" />
                </IconButton>
            </span>
            <span className="icon">
                <IconButton onClick={toggle}>
                    {expanded ? (
                        <KeyboardArrowUpIcon className="w-20 h-20" />
                    ) : (
                        <KeyboardArrowDownIcon className="w-20 h-20" />
                    )}
                </IconButton>
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
            },
        },
        hidden: {
            visibility: 'hidden',
        },
    }),
    {name: 'PickerToolBar'},
);
