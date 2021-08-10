import React, {memo} from 'react';
import {makeAppStyles} from '@smart-link/context';
import {SmartLinkAnimate, SmartLinkPage} from '@smart-link/core';
import {Typography} from '@smart-link/core/material-ui';
import logo from '@smart-link/core/assets/images/logo@2x.png';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';

const Welcome = memo(() => {
    const {t} = useTranslation('@smart-link/context');
    const classes = useStyles();
    return (
        <SmartLinkPage>
            <div className="flex flex-col flex-1 items-center justify-center text-center p-24 h-full">
                <SmartLinkAnimate duration={400} delay={100}>
                    <img src={logo} height={110} width={110} alt="smartLink" />
                </SmartLinkAnimate>
                <SmartLinkAnimate animation="transition.slideUpIn" duration={400} delay={600}>
                    <Typography color="inherit" className={clsx(classes.welcomeText, 'text-68 mt-32')}>
                        {t('WELCOME_SHARED_APP')}
                    </Typography>
                </SmartLinkAnimate>
            </div>
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

export default Welcome;
