import React from 'react';
import {useDayUtils} from '@smart-link/context';
import {getTopOffsetByTime} from '../utils';

export default function useTopByNowTime() {
    const {dayUtils} = useDayUtils();
    const now = dayUtils.date();

    const initialTop = getTopOffsetByTime({dayUtils, now});

    const [top, setTop] = React.useState(initialTop);
    const [text, setText] = React.useState(dayUtils.format(now, 'fullTime24h'));

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTop(getTopOffsetByTime({dayUtils, now: dayUtils.date()}));
            setText(dayUtils.format(dayUtils.date(), 'fullTime24h'));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return [top, text];
}
