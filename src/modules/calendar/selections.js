export function isSelected(event, selected) {
    if (!event || selected == null) return false;
    return [].concat(selected).indexOf(event) !== -1;
}

export function slotWidth(rowBox, slots) {
    const rowWidth = rowBox.right - rowBox.left;
    const cellWidth = rowWidth / slots;

    return cellWidth;
}

export function getSlotAtX(rowBox, x, rtl, slots) {
    if (x < rowBox.left) return 0;
    const cellWidth = slotWidth(rowBox, slots);
    return rtl ? slots - 1 - Math.floor((x - rowBox.left) / cellWidth) : Math.floor((x - rowBox.left) / cellWidth);
}

export function pointInBox(box, {x, y}) {
    return y >= box.top && y <= box.bottom && x >= box.left && x <= box.right;
}

export function dateCellSelection(start, rowBox, box, slots, rtl) {
    let startIdx = -1;
    let endIdx = -1;
    const lastSlotIdx = slots - 1;

    let hidden = false;

    const cellWidth = slotWidth(rowBox, slots);

    // cell under the mouse
    const currentSlot = getSlotAtX(rowBox, box.x, rtl, slots);

    // Identify row as either the initial row
    // or the row under the current mouse point
    const isCurrentRow = rowBox.top < box.y && rowBox.bottom > box.y;
    const isStartRow = rowBox.top < start.y && rowBox.bottom > start.y;

    // this row's position relative to the start point
    const isAboveStart = start.y > rowBox.bottom;
    const isBelowStart = rowBox.top > start.y;
    const isBetween = box.top < rowBox.top && box.bottom > rowBox.bottom;

    // this row is between the current and start rows, so entirely selected
    if (isBetween) {
        startIdx = 0;
        endIdx = lastSlotIdx;
    }

    if (isBelowStart) {
        hidden = true;
    }

    if (isAboveStart) {
        hidden = !isCurrentRow;
    }

    if (isCurrentRow) {
        if (isBelowStart) {
            startIdx = 0;
            endIdx = currentSlot;
            hidden = true;
        } else if (isAboveStart) {
            startIdx = currentSlot;
            endIdx = lastSlotIdx;
        }
    }

    if (isStartRow) {
        // select the cell under the initial point
        endIdx = rtl
            ? lastSlotIdx - Math.floor((start.x - rowBox.left) / cellWidth)
            : Math.floor((start.x - rowBox.left) / cellWidth);
        startIdx = endIdx;

        if (isCurrentRow) {
            if (currentSlot < startIdx) startIdx = currentSlot;
            else endIdx = currentSlot; // select current range
        } else if (start.y < box.y) {
            // the current row is below start row
            // select cells to the right of the start cell
            endIdx = lastSlotIdx;
        } else {
            // select cells to the left of the start cell
            startIdx = 0;
            hidden = true;
        }
    }
    return {startIdx, endIdx, hidden};
}
