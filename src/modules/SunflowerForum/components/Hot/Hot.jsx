import React from 'react';
import {makeAppStyles} from '@smart-link/context';
import {Paper, Typography} from '@smart-link/core/material-ui';

const Hot = React.memo(props => {
    return (
        <Paper className="w-320 ">
            <div>
                <Typography>太阳花热点</Typography>
            </div>
        </Paper>
    );
});

export default Hot;

const useStyles = makeAppStyles(theme => ({
    titleBg: {
        backgroundColor: theme.palette.main,
    },
}));
