import React from 'react';
import {Redirect} from 'react-router-dom';
import {SmartLinkPage404} from '@smart-link/core';
import Welcome from '../modules/Welcome';

const routes = [
    {
        path: ['/'],
        exact: true,
        component: () => <Welcome />,
    },
    {
        path: '/pages/errors/error-404',
        component: () => <SmartLinkPage404 />,
    },
    {
        component: () => <Redirect to="/pages/errors/error-404" />,
    },
];

export default routes;
