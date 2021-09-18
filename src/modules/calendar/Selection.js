function closest(node, selector, stopAt) {
    if (node.closest && !stopAt) node.closest(selector);

    let nextNode = node;
    do {
        if (nextNode.matches(selector)) return nextNode;
        nextNode = nextNode.parentElement;
    } while (nextNode && nextNode !== stopAt && nextNode.nodeType === document.ELEMENT_NODE);

    return null;
}
function contains(context, node) {
    // HTML DOM and SVG DOM may have different support levels,
    // so we need to check on context instead of a document root element.
    if (context.contains) return context.contains(node);
    // eslint-disable-next-line no-bitwise
    if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}
function listen(node, eventName, handler, options) {
    node.addEventListener(eventName, handler, options);
    return () => {
        node.removeEventListener(eventName, handler, options);
    };
}
function addEventListener(type, handler, target = document) {
    return listen(target, type, handler, false);
}

function isOverContainer(container, x, y) {
    return !container || contains(container, document.elementFromPoint(x, y));
}

export function getEventNodeFromPoint(node, {clientX, clientY}) {
    const target = document.elementFromPoint(clientX, clientY);
    return closest(target, '.rbc-event', node);
}

export function isEvent(node, bounds) {
    return !!getEventNodeFromPoint(node, bounds);
}

function getEventCoordinates(e) {
    let target = e;

    if (e.touches && e.touches.length) {
        // eslint-disable-next-line prefer-destructuring
        target = e.touches[0];
    }

    return {
        clientX: target.clientX,
        clientY: target.clientY,
        pageX: target.pageX,
        pageY: target.pageY,
    };
}

const clickTolerance = 5;
const clickInterval = 250;

class Selection {
    constructor(node, {global = false, longPressThreshold = 250} = {}) {
        this.isDetached = false;
        this.container = node;
        this.globalMouse = !node || global;
        this.longPressThreshold = longPressThreshold;

        this.listeners = Object.create(null);

        this.handleInitialEvent = this.handleInitialEvent.bind(this);
        this.handleMoveEvent = this.handleMoveEvent.bind(this);
        this.handleTerminatingEvent = this.handleTerminatingEvent.bind(this);
        this.keyListener = this.keyListener.bind(this);
        this.dropFromOutsideListener = this.dropFromOutsideListener.bind(this);
        this.dragOverFromOutsideListener = this.dragOverFromOutsideListener.bind(this);

        // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
        // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
        this.removeTouchMoveWindowListener = addEventListener('touchmove', () => {}, window);
        this.removeKeyDownListener = addEventListener('keydown', this.keyListener);
        this.removeKeyUpListener = addEventListener('keyup', this.keyListener);
        this.removeDropFromOutsideListener = addEventListener('drop', this.dropFromOutsideListener);
        this.removeDragOverFromOutsideListener = addEventListener('dragover', this.dragOverFromOutsideListener);
        console.log(node);
        this.addInitialEventListener();
    }

    on(type, handler) {
        const handlers = this.listeners[type] || (this.listeners[type] = []);

        handlers.push(handler);

        return {
            remove() {
                const idx = handlers.indexOf(handler);
                if (idx !== -1) handlers.splice(idx, 1);
            },
        };
    }

    emit(type, ...args) {
        let result;
        const handlers = this.listeners[type] || [];
        handlers.forEach(fn => {
            if (result === undefined) result = fn(...args);
        });
        return result;
    }

    teardown() {
        this.isDetached = true;
        this.listeners = Object.create(null);
        this.removeTouchMoveWindowListener && this.removeTouchMoveWindowListener();
        this.removeInitialEventListener && this.removeInitialEventListener();
        this.removeEndListener && this.removeEndListener();
        this.onEscListener && this.onEscListener();
        this.removeMoveListener && this.removeMoveListener();
        this.removeKeyUpListener && this.removeKeyUpListener();
        this.removeKeyDownListener && this.removeKeyDownListener();
        this.removeDropFromOutsideListener && this.removeDropFromOutsideListener();
        this.removeDragOverFromOutsideListener && this.removeDragOverFromOutsideListener();
    }

    isSelected(node) {
        const box = this.selectRect;

        if (!box || !this.selecting) return false;

        return objectsCollide(box, getBoundsForNode(node));
    }

    // Adds a listener that will call the handler only after the user has pressed on the screen
    // without moving their finger for 250ms.
    addLongPressListener(handler, initialEvent) {
        let timer = null;
        let removeTouchMoveListener = null;
        let removeTouchEndListener = null;
        // eslint-disable-next-line no-shadow
        const handleTouchStart = initialEvent => {
            timer = setTimeout(() => {
                cleanup();
                handler(initialEvent);
            }, this.longPressThreshold);
            removeTouchMoveListener = addEventListener('touchmove', () => cleanup());
            removeTouchEndListener = addEventListener('touchend', () => cleanup());
        };
        const removeTouchStartListener = addEventListener('touchstart', handleTouchStart);
        const cleanup = () => {
            if (timer) {
                clearTimeout(timer);
            }
            if (removeTouchMoveListener) {
                removeTouchMoveListener();
            }
            if (removeTouchEndListener) {
                removeTouchEndListener();
            }

            timer = null;
            removeTouchMoveListener = null;
            removeTouchEndListener = null;
        };

        if (initialEvent) {
            handleTouchStart(initialEvent);
        }

        return () => {
            cleanup();
            removeTouchStartListener();
        };
    }

    // Listen for mousedown and touchstart events. When one is received, disable the other and setup
    // future event handling based on the type of event.
    addInitialEventListener() {
        const removeMouseDownListener = addEventListener('mousedown', e => {
            this.removeInitialEventListener();
            this.handleInitialEvent(e);
            this.removeInitialEventListener = addEventListener('mousedown', this.handleInitialEvent);
        });
        const removeTouchStartListener = addEventListener('touchstart', e => {
            this.removeInitialEventListener();
            this.removeInitialEventListener = this.addLongPressListener(this.handleInitialEvent, e);
        });

        this.removeInitialEventListener = () => {
            removeMouseDownListener();
            removeTouchStartListener();
        };
    }

    dropFromOutsideListener(e) {
        const {pageX, pageY, clientX, clientY} = getEventCoordinates(e);

        this.emit('dropFromOutside', {
            x: pageX,
            y: pageY,
            clientX,
            clientY,
        });

        e.preventDefault();
    }

    dragOverFromOutsideListener(e) {
        const {pageX, pageY, clientX, clientY} = getEventCoordinates(e);

        this.emit('dragOverFromOutside', {
            x: pageX,
            y: pageY,
            clientX,
            clientY,
        });
        e.stopPropagation();
        e.preventDefault();
    }

    handleInitialEvent(e) {
        e.stopPropagation();
        if (this.isDetached) {
            return;
        }

        const {clientX, clientY, pageX, pageY} = getEventCoordinates(e);
        const node = this.container();
        let collides;
        let offsetData;

        // Right clicks
        if (e.which === 3 || e.button === 2 || !isOverContainer(node, clientX, clientY)) return;
        if (!this.globalMouse && node && !contains(node, e.target)) {
            const {top, left, bottom, right} = normalizeDistance(0);

            offsetData = getBoundsForNode(node);

            collides = objectsCollide(
                {
                    top: offsetData.top - top,
                    left: offsetData.left - left,
                    bottom: offsetData.bottom + bottom,
                    right: offsetData.right + right,
                },
                {top: pageY, left: pageX},
            );

            if (!collides) return;
        }

        const result = this.emit(
            'beforeSelect',
            (this.initialEventData = {
                isTouch: /^touch/.test(e.type),
                x: pageX,
                y: pageY,
                clientX,
                clientY,
            }),
        );

        if (result === false) return;

        switch (e.type) {
            case 'mousedown':
                this.removeEndListener = addEventListener('mouseup', this.handleTerminatingEvent);
                this.onEscListener = addEventListener('keydown', this.handleTerminatingEvent);
                this.removeMoveListener = addEventListener('mousemove', this.handleMoveEvent);
                break;
            case 'touchstart':
                this.handleMoveEvent(e);
                this.removeEndListener = addEventListener('touchend', this.handleTerminatingEvent);
                this.removeMoveListener = addEventListener('touchmove', this.handleMoveEvent);
                break;
            default:
                break;
        }
    }

    handleTerminatingEvent(e) {
        const {pageX, pageY} = getEventCoordinates(e);

        this.selecting = false;

        this.removeEndListener && this.removeEndListener();
        this.removeMoveListener && this.removeMoveListener();

        if (!this.initialEventData) return;

        const inRoot = !this.container || contains(this.container(), e.target);
        const bounds = this.selectRect;
        const click = this.isClick(pageX, pageY);

        this.initialEventData = null;

        if (e.key === 'Escape') {
            return this.emit('reset');
        }

        if (!inRoot) {
            return this.emit('reset');
        }

        if (click && inRoot) {
            return this.handleClickEvent(e);
        }

        // User drag-clicked in the Selectable area
        if (!click) return this.emit('select', bounds);
    }

    handleClickEvent(e) {
        const {pageX, pageY, clientX, clientY} = getEventCoordinates(e);
        const now = new Date().getTime();
        // Avoid repeated clicks quickly
        if (this.lastClickData && now - this.lastClickData.timestamp < clickInterval) {
            // Double click event
            this.lastClickData = null;
            return this.emit('doubleClick', {
                x: pageX,
                y: pageY,
                clientX,
                clientY,
            });
        }

        // Click event
        this.lastClickData = {
            timestamp: now,
        };
        return this.emit('click', {
            x: pageX,
            y: pageY,
            clientX,
            clientY,
        });
    }

    handleMoveEvent(e) {
        if (this.initialEventData === null || this.isDetached) {
            return;
        }

        const {x, y} = this.initialEventData;
        const {pageX, pageY} = getEventCoordinates(e);
        const w = Math.abs(x - pageX);
        const h = Math.abs(y - pageY);

        const left = Math.min(pageX, x);
        const top = Math.min(pageY, y);
        const old = this.selecting;

        // Prevent emitting selectStart event until mouse is moved.
        // in Chrome on Windows, mouseMove event may be fired just after mouseDown event.
        if (this.isClick(pageX, pageY) && !old && !(w || h)) {
            return;
        }

        this.selecting = true;
        this.selectRect = {
            top,
            left,
            x: pageX,
            y: pageY,
            right: left + w,
            bottom: top + h,
        };

        if (!old) {
            this.emit('selectStart', this.initialEventData);
        }

        if (!this.isClick(pageX, pageY)) this.emit('selecting', this.selectRect);
        e.stopPropagation();
        e.preventDefault();
    }

    keyListener(e) {
        this.ctrl = e.metaKey || e.ctrlKey;
    }

    isClick(pageX, pageY) {
        // eslint-disable-next-line no-underscore-dangle
        const {x, y, isTouch} = this.initialEventData;
        return !isTouch && Math.abs(pageX - x) <= clickTolerance && Math.abs(pageY - y) <= clickTolerance;
    }
}

/**
 * Resolve the disance prop from either an Int or an Object
 * @return {Object}
 */
function normalizeDistance(distance = 0) {
    if (typeof distance !== 'object')
        // eslint-disable-next-line no-param-reassign
        distance = {
            top: distance,
            left: distance,
            right: distance,
            bottom: distance,
        };

    return distance;
}

/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @return {bool}
 */
export function objectsCollide(nodeA, nodeB, tolerance = 0) {
    const {top: aTop, left: aLeft, right: aRight = aLeft, bottom: aBottom = aTop} = getBoundsForNode(nodeA);
    const {top: bTop, left: bLeft, right: bRight = bLeft, bottom: bBottom = bTop} = getBoundsForNode(nodeB);

    return !(
        // 'a' bottom doesn't touch 'b' top
        (
            aBottom - tolerance < bTop ||
            // 'a' top doesn't touch 'b' bottom
            aTop + tolerance > bBottom ||
            // 'a' right doesn't touch 'b' left
            aRight - tolerance < bLeft ||
            // 'a' left doesn't touch 'b' right
            aLeft + tolerance > bRight
        )
    );
}

/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export function getBoundsForNode(node) {
    if (!node.getBoundingClientRect) return node;

    const rect = node.getBoundingClientRect();
    const left = rect.left + pageOffset('left');
    const top = rect.top + pageOffset('top');

    return {
        top,
        left,
        right: (node.offsetWidth || 0) + left,
        bottom: (node.offsetHeight || 0) + top,
    };
}

function pageOffset(dir) {
    if (dir === 'left') return window.pageXOffset || document.body.scrollLeft || 0;
    if (dir === 'top') return window.pageYOffset || document.body.scrollTop || 0;
}
export default Selection;
