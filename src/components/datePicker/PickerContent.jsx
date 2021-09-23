import React from 'react';
import {makeStyles} from '@smart-link/context';
import DayPanel from './DayPanel';

const PickerContent = React.memo(props => {
    const {expanded, indexDate, selectedDate, onChange: onChangeProp} = props;
    const classes = useStyles();

    return (
        <div
            className={classes.root}
            style={{
                height: expanded ? '0px' : 'auto',
                overflow: 'visible',
            }}
        >
            {!expanded && (
                <div className={classes.content}>
                    <DayPanel indexDate={indexDate} selectedDate={selectedDate} onChange={onChangeProp} />
                </div>
            )}
        </div>
    );
});

export default PickerContent;

const useStyles = makeStyles(
    theme => ({
        root: {
            transition: 'height .3s ease-out',
        },
        content: {
            paddingBottom: theme.spacing(2),
        },
    }),
    {name: 'PickerContent'},
);
