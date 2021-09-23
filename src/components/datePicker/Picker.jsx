import React from 'react';
import {makeStyles, useDayUtils, useControlled} from '@smart-link/context';
import {Accordion, AccordionSummary, AccordionDetails} from '@smart-link/core/material-ui';
import PickerToolBar from './PickerToolBar';
import PickerContent from './PickerContent';

const Picker = React.memo(props => {
    const {defaultSelectedDate, selectedDate: selectedDateProp, onChange: onChangeProp} = props;
    const classes = useStyles();

    const {dayUtils} = useDayUtils();
    const now = dayUtils.date();
    const [expanded, setExpanded] = React.useState(false);

    const [indexDate, setIndexDate] = React.useState(now);

    const [selectedDate, setSelectedDate] = useControlled({
        controlled: selectedDateProp,
        default: defaultSelectedDate,
    });

    const onClickLeft = () => {
        setIndexDate(dayUtils.addMonths(indexDate, -1));
    };

    const onClickRight = () => {
        setIndexDate(dayUtils.addMonths(indexDate, 1));
    };

    const toggleExpanded = React.useCallback(
        event => {
            setExpanded(!expanded);
        },
        [expanded],
    );

    const toolBarText = dayUtils.formatByString(indexDate, 'YYYY年MM月');

    const onChange = (value, isFinish) => {
        setSelectedDate(value);
        setIndexDate(value);
        onChangeProp && onChangeProp(value, isFinish);
    };

    return (
        <div className={classes.root}>
            <PickerToolBar
                text={toolBarText}
                onClickLeft={onClickLeft}
                onClickRight={onClickRight}
                expanded={expanded}
                toggle={toggleExpanded}
            />
            <PickerContent expanded={expanded} indexDate={indexDate} selectedDate={selectedDate} onChange={onChange} />
        </div>
    );
});

export default Picker;

const useStyles = makeStyles(
    theme => ({
        root: {},
    }),
    {name: 'Picker'},
);
