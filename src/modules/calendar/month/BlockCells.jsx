import React from 'react';
import {withStyles} from '@smart-link/context/material-styles';
import Selection, {getBoundsForNode, isEvent} from '../Selection';
import {dateCellSelection, getSlotAtX, pointInBox} from '../selections';
import Transformer from '../components/Transformer';

class BlockCells extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selecting: false,
            hidden: false,
        };
        this.cellRef = React.createRef();
    }

    componentDidMount() {
        this.selectable();
    }

    componentDidUpdate(prevProps) {
        const {open} = this.props;
        // If the open of the parent component is false, the selection of the child component is updated to false
        if (open !== prevProps.open && !open) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                selecting: open,
            });
        }
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

    getContainer = () => {
        if (this.cellRef.current) {
            return this.cellRef.current.parentNode.parentNode;
        }
        return null;
    };

    render() {
        const {week, classes} = this.props;
        const {selecting, startIdx, endIdx, hidden} = this.state;
        const {length} = week;

        return (
            <div className={classes.root} ref={this.cellRef}>
                {week.map(day => {
                    return <div key={day.toString()} />;
                })}
                <Transformer
                    startIndex={startIdx}
                    endIndex={endIdx}
                    show={selecting}
                    length={length}
                    container={this.getContainer()}
                    displaySummary={hidden}
                />
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
    },
});

export default withStyles(style)(BlockCells);
