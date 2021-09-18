import React from 'react';
import {Redirect} from 'react-router-dom';
import {SmartLinkPage404} from '@smart-link/core';
import Welcome from '../modules/Welcome';
import SunflowerForum from '../modules/SunflowerForum';
import TestTree from '../modules/TestTree';
import TestCalender from '../modules/calendar';

const routes = [
    {
        path: ['/'],
        exact: true,
        component: () => <Redirect to="/sun" />,
    },
    {
        path: ['/sun'],
        exact: true,
        component: () => <SunflowerForum />,
    },
    {
        path: '/pages/errors/error-404',
        component: () => <SmartLinkPage404 />,
    },
    {
        path: '/tree',
        component: () => <TestTree />,
    },
    {
        path: '/calender',
        exact: true,
        render: () => <Redirect to="/calender/day" />,
    },
    {
        path: ['/calender/:view'],
        exact: true,
        component: props => <TestCalender {...props} />,
    },
    {
        component: () => <Redirect to="/pages/errors/error-404" />,
    },
];

export default routes;
