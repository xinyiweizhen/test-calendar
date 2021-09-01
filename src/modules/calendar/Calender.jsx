import React from 'react';
import {SmartLinkCalendar} from '@smart-link/core';
import CalenderView from './CalenderView';

const TestCalender = () => {
    return (
        <div className="flex flex-row h-full">
            <div>
                <SmartLinkCalendar calendarType="date" elevation={0} />
            </div>
            <CalenderView />
        </div>
    );
};

export default TestCalender;
