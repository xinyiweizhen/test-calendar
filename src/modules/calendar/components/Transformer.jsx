import React from 'react';
import PropsType from 'prop-types';
import {Portal} from '@smart-link/core/material-ui';
import {makeStyles} from '@smart-link/context';
import clsx from 'clsx';

const Transformer = React.memo(props => {
    const classes = useStyles();

    const {show, container, startIndex, endIndex, summary, displaySummary, length, className} = props;

    const transformerStyle = {
        top: 1,
        left: `calc(${(startIndex / length) * 100}% + 5px)`,
        width: `calc( ${
            startIndex === endIndex ? (1 / length) * 100 : ((endIndex + 1 - startIndex) / length) * 100
        }% - 10px)`,
    };

    if (!show) {
        return null;
    }
    return (
        <Portal container={container}>
            <div className={clsx(classes.root, className)}>
                <div>
                    <div className={clsx(classes.transformer, 'event-instance-wrapper')} style={transformerStyle}>
                        <div className="event-instance">
                            <div className="summary property">{displaySummary ? '' : summary}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
});

const useStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            position: 'absolute',
            top: 33,
            height: 20,
            width: '100%',
        },
        transformer: {
            position: 'absolute',
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
            zIndex: theme.zIndex.modal + 1,
            top: 0,
            left: 0,
            height: '100%',
            boxSizing: 'border-box',
            cursor: 'pointer',
            pointerEvents: 'auto',
            '& .event-instance': {
                color: theme.palette.common.white,
                border: '0.5px solid',
                borderColor: theme.palette.primary.main,
                opacity: 0.9,
                borderRadius: 1,
                height: 22,
                fontSize: '10px',
                padding: '0 0 0 5px',
                width: '100%',
                '& > div': {
                    fontSize: '12px',
                    boxSizing: 'border-box',
                    lineHeight: '20px',
                    height: '20px',
                    whiteSpace: 'nowrap',
                    wordBreak: 'break-all',
                    fontWeight: 600,
                },
            },
        },
    }),
    {name: 'Transformer'},
);

Transformer.propTypes = {
    show: PropsType.bool.isRequired,
    container: PropsType.any,
    startIndex: PropsType.number,
    endIndex: PropsType.number,
    length: PropsType.number,
    summary: PropsType.string,
    displaySummary: PropsType.bool,
};

Transformer.defaultProps = {
    length: 7,
    summary: '添加主题',
};

export default Transformer;
