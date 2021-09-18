import React from 'react';
import clsx from 'clsx';
import {withStyles} from '@smart-link/context/material-styles';
import {Portal, ClickAwayListener} from '@smart-link/core/material-ui';
import Selection, {getBoundsForNode, isEvent} from '../Selection';
import {dateCellSelection, getSlotAtX, pointInBox} from '../selections';

class BlockCells extends React.Component {
    constructor(props, context) {
        super();
        this.state = {
            selecting: props.open,
            hidden: false,
        };
        this.cellRef = React.createRef();
    }

    componentDidMount() {
        this.selectable();
    }

    componentWillUnmount() {
        this.teardownSelectable();
    }

    selectable = () => {
        const node = this.cellRef.current;

        const {
            week: {length},
            container,
        } = this.props;

        const selector = new Selection(container, {});

        this.selector = selector;

        const selectorClicksHandler = (point, actionType) => {
            if (!isEvent(node, point)) {
                const rowBox = getBoundsForNode(node);
                if (pointInBox(rowBox, point)) {
                    const currentCell = getSlotAtX(rowBox, point.x, null, length);
                    this.setState({
                        selecting: true,
                        startIdx: currentCell,
                        endIdx: currentCell,
                    });
                    this.selectSlot({
                        startIdx: currentCell,
                        endIdx: currentCell,
                        action: actionType,
                        box: point,
                    });
                }
            }
            this.initial = {};
            this.setState({
                hidden: false,
            });
        };

        selector.on('click', point => selectorClicksHandler(point, 'click'));

        selector.on('doubleClick', point => selectorClicksHandler(point, 'doubleClick'));

        selector.on('selecting', box => {
            let startIdx = -1;
            let endIdx = -1;
            let hidden = false;

            const {selecting} = this.state;

            if (!selecting) {
                // notify(this.props.onSelectStart, [box])

                this.initial = {x: box.x, y: box.y};
            }
            if (selector.isSelected(node)) {
                const nodeBox = getBoundsForNode(node);
                ({startIdx, endIdx, hidden} = dateCellSelection(this.initial, nodeBox, box, length, null));
            }
            console.log(startIdx, endIdx);
            this.setState({
                selecting: true,
                startIdx,
                endIdx,
                hidden,
            });
        });

        selector.on('select', bounds => {
            this.selectSlot({...this.state, action: 'select', bounds});
            this.initial = {};
            // this.setState({
            //     selecting: false,
            // });
        });
    };

    selectSlot = ({endIdx, startIdx, action, bounds, box}) => {
        const {onSelectSlot, week} = this.props;
        if (endIdx !== -1 && startIdx !== -1)
            onSelectSlot &&
                onSelectSlot({
                    start: startIdx,
                    end: endIdx,
                    action,
                    bounds,
                    box,
                    range: week.slice(startIdx, endIdx + 1),
                });
    };

    teardownSelectable = () => {
        if (!this.selector) return;
        this.selector.teardown();
        this.selector = null;
    };

    render() {
        const {week, classes} = this.props;
        const {selecting, startIdx, endIdx, hidden} = this.state;
        const {length} = week;
        const transformerStyle = {
            top: 1,
            left: `calc(${(startIdx / length) * 100}% + 5px)`,
            width: `calc( ${
                startIdx === endIdx ? (1 / length) * 100 : ((endIdx + 1 - startIdx) / length) * 100
            }% - 10px)`,
        };

        return (
            <div className={classes.root} ref={this.cellRef}>
                {week.map((day, index) => {
                    return <div key={day.toString()} />;
                })}
                {selecting ? (
                    <Portal container={this.cellRef.current.parentNode.parentNode}>
                        <div className={classes.monthTransformer}>
                            <div className="_trigger resizer fast-create-event-wrapper">
                                <div
                                    className="month-transformer month-event-instance-wrapper"
                                    style={transformerStyle}
                                >
                                    <div className="month-event-instance">
                                        <div className="summary property">{hidden ? '' : '添加主题'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Portal>
                ) : null}
            </div>
        );
    }
}

const style = theme => ({
    root: {
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
        '& > $selected': {
            backgroundColor: '#fff',
        },
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
            zIndex: 1401,
            top: 0,
            left: 0,
            height: '100%',
            boxSizing: 'border-box',
            cursor: 'pointer',
            pointerEvents: 'auto',
            '& .month-event-instance': {
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
    },
    selected: {},
});

export default withStyles(style)(BlockCells);
