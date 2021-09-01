import React, {memo} from 'react';
import {makeAppStyles} from '@smart-link/context';
import {SmartLinkAnimate, SmartLinkPage} from '@smart-link/core';
import {Typography} from '@smart-link/core/material-ui';
import logo from '@smart-link/core/assets/images/logo@2x.png';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import Hot from './components/Hot/Hot';
import Posted from './Posted';

const SunflowerForum = memo(() => {
    const classes = useStyles();
    return (
        <SmartLinkPage>
            <Posted />
        </SmartLinkPage>
    );
});

const useStyles = makeAppStyles({
    welcomeText: {
        color: '#F22D3A',
        textShadow: '0 0 .1em, 0 0 .3em',
        fontStyle: 'oblique',
    },
});

export default SunflowerForum;
