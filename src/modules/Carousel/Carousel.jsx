import React from 'react';
import {makeStyles} from '@smart-link/context';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Carousel = React.forwardRef((props, ref) => {
    const {dotPlacement, className, showArrow, initIndex} = props;
    const timerId = React.useRef();

    const wrapperRef = React.useRef();

    const slidesRef = React.useRef();

    const inTransition = React.useRef(false);

    // makes sure that children is an array, even when there is only 1 child
    let children = React.Children.toArray(props.children);

    // Children may contain false or null, so we should filter them
    // children may also contain string filled with spaces (in certain cases where we use jsx strings)
    children = children.filter(child => {
        if (typeof child === 'string') {
            return !!child.trim();
        }
        return !!child;
    });

    const [current, setCurrent] = React.useState(initIndex + 1);

    const vertical = dotPlacement === 'left' || dotPlacement === 'right';

    const leftOverflowVNode = children.length ? React.cloneElement(children[children.length - 1]) : null;

    const rightOverflowVNode = children.length ? React.cloneElement(children[0]) : null;

    const total = children.length + 2;

    const newProps = {...props, vertical, total, current};

    const classes = useStyles(newProps);

    const prev = () => {
        if (children.length <= 1) return null;
        if (inTransition.current) return;
        inTransition.current = true;
        // no need for reset since transitionend handler will handle it
        setCurrent(c => c - 1);
        if (slidesRef.current) slidesRef.current.style.transition = '';
    };

    const next = () => {
        if (children.length <= 1) return null;
        if (inTransition.current) return;
        inTransition.current = true;
        // no need for reset since transitionend handler will handle it
        setCurrent(c => c + 1);
        if (slidesRef.current) slidesRef.current.style.transition = '';
    };

    const changeCurrent = value => {
        if (children.length <= 1) return null;
        if (inTransition.current) return;
        if (value === current) return null;
        inTransition.current = true;
        if (current === 1 && value === children.length && value - current > 1) {
            setCurrent(current - 1);
        } else if (value === 1 && current === children.length && current - value > 1) {
            setCurrent(current + 1);
        } else {
            setCurrent(value);
        }
        if (slidesRef.current) slidesRef.current.style.transition = '';
        if (props.autoPlay) {
            resetInterval();
        }
    };

    const resetInterval = () => {
        // one children
        if (children.length <= 1) {
            return;
        }
        if (timerId.current !== null) {
            window.clearInterval(timerId.current);
        }
        timerId.current = window.setInterval(next, Number(props.interval));

        if (wrapperRef.current && props.stopOnHover) {
            wrapperRef.current.addEventListener('mouseenter', pauseInterval);
            wrapperRef.current.addEventListener('mouseleave', resetInterval);
        }
    };

    const pauseInterval = () => {
        if (timerId.current !== null) {
            window.clearInterval(timerId.current);
        }
    };

    React.useEffect(() => {
        if (props.autoPlay) {
            resetInterval();
        } else if (timerId.current !== null) {
            window.clearInterval(timerId.current);
        }
        return () => {
            if (timerId.current !== null) {
                window.clearInterval(timerId.current);
            }
            if (wrapperRef.current) {
                wrapperRef.current.removeEventListener('mouseenter', pauseInterval);
                wrapperRef.current.removeEventListener('mouseleave', resetInterval);
            }
        };
    }, [props.autoPlay]);

    const handleTransitionEnd = e => {
        const nextCurrent = current === 0 ? children.length : current === children.length + 1 ? 1 : null;
        if (nextCurrent !== null) {
            e.target.style.transition = 'none';
            setCurrent(nextCurrent);
            inTransition.current = false;
        } else {
            inTransition.current = false;
        }
    };

    const handleDotMouseEnter = value => {
        if (props.trigger === 'hover') {
            changeCurrent(value);
        }
    };

    return (
        <div className={clsx(classes.root, className)} ref={wrapperRef}>
            <div className={classes.slides} ref={slidesRef} onTransitionEnd={handleTransitionEnd}>
                {[leftOverflowVNode, ...children, rightOverflowVNode].map((child, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} data-index={index}>
                        {child}
                    </div>
                ))}
            </div>
            <div className={clsx(classes.dots, classes[dotPlacement])}>
                {children.map((_child, index) => {
                    const selected = index + 1 === current;
                    return (
                        <div
                            className={clsx(classes.dot, {active: selected})}
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            onClick={() => changeCurrent(index + 1)}
                            onMouseEnter={() => handleDotMouseEnter(index + 1)}
                        />
                    );
                })}
            </div>
            {!!showArrow && (
                <div onClick={() => next()} className={clsx(classes.arrow, vertical ? 'bottom' : 'right')}>
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            )}
            {!!showArrow && (
                <div onClick={() => prev()} className={clsx(classes.arrow, vertical ? 'top' : 'left')}>
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
});

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'hidden',
        position: 'relative',
    },
    slides: props => ({
        display: 'flex',
        [props.vertical && 'flexDirection']: 'column',
        [props.vertical ? 'height' : 'width']: `${props.total}00%`,
        [props.vertical ? 'width' : 'height']: '100%',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
        }),
        transform: props.vertical
            ? `translate3d(0, -${(100 / props.total) * (props.current % props.total)}%, 0)`
            : `translate3d(-${(100 / props.total) * (props.current % props.total)}%, 0, 0)`,
        '& > div': {
            overflow: 'hidden',
            [props.vertical ? 'height' : 'width']: `${100 / props.total}%`,
            '& > img': {
                display: 'block',
            },
        },
    }),
    arrow: props => ({
        position: 'absolute',
        transition: 'transform .3s cubic-bezier(.4, 0, .2, 1)',
        transform: 'scale(1)',
        cursor: 'pointer',
        height: 48,
        width: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, .6)',
        '&> svg': {
            height: '100%',
            width: '100%',
        },
        '&.left': {
            transform: 'translateY(-50%)',
            top: '50%',
            left: 0,
            '&:hover': {
                transform: 'translateY(-50%) scale(1.1)',
            },
            '&:active': {
                transform: 'translateY(-50%) scale(1.1)',
            },
        },
        '&.right': {
            transform: 'translateY(-50%)',
            top: '50%',
            right: 0,
            '&:hover': {
                transform: 'translateY(-50%) scale(1.1)',
            },
            '&:active': {
                transform: 'translateY(-50%) scale(1.1)',
            },
        },
        '&.top': {
            transform: 'translateX(-50%) rotate(90deg)',
            top: 0,
            left: '50%',
            '&:hover': {
                transform: 'translateX(-50%) scale(1.1) rotate(90deg)',
            },
            '&:active': {
                transform: 'translateX(-50%) scale(1.1) rotate(90deg)',
            },
        },
        '&.bottom': {
            transform: 'translateX(-50%) rotate(90deg)',
            bottom: 0,
            left: '50%',
            '&:hover': {
                transform: 'translateX(-50%) scale(1.1) rotate(90deg)',
            },
            '&:active': {
                transform: 'translateX(-50%) scale(1.1) rotate(90deg)',
            },
        },
    }),
    dots: {
        position: 'absolute',
        display: 'flex',
        flexWrap: 'nowrap',
        '&$bottom': {
            transform: 'translateX(-50%)',
            bottom: '16px',
            left: '50%',
            '& > div': {
                marginRight: 12,
            },
            '& > div:last-child': {
                marginRight: 0,
            },
        },
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, .3)',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: `all .5s`,
        outline: 'none',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        '&.active': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
    },
    bottom: {},
    top: {
        transform: 'translateX(-50%)',
        top: '16px',
        left: '50%',
        '& > div': {
            marginRight: 12,
        },
        '& > div:last-child': {
            marginRight: 0,
        },
    },
    left: {
        flexDirection: 'column',
        transform: 'translateY(-50%)',
        left: '16px',
        top: '50%',
        '& > div': {
            marginBottom: 12,
        },
        '& > div:last-child': {
            marginBottom: 0,
        },
    },
    right: {
        flexDirection: 'column',
        transform: 'translateY(-50%)',
        right: '16px',
        top: '50%',
        '& > div': {
            marginBottom: 12,
        },
        '& > div:last-child': {
            marginBottom: 0,
        },
    },
}));

Carousel.propTypes = {
    initIndex: PropTypes.number,
    interval: PropTypes.number,
    dotPlacement: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
    trigger: PropTypes.oneOf(['click', 'hover']),
    showArrow: PropTypes.bool,
    autoPlay: PropTypes.bool,
    stopOnHover: PropTypes.bool,
};

Carousel.defaultProps = {
    interval: 3000,
    dotPlacement: 'bottom',
    trigger: 'click',
    showArrow: false,
    autoPlay: false,
    stopOnHover: true,
    initIndex: 0,
};

export default Carousel;
