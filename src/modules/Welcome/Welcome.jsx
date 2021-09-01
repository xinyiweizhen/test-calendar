import React, {memo} from 'react';
import {makeAppStyles} from '@smart-link/context';
import {SmartLinkAnimate, SmartLinkPage} from '@smart-link/core';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputBase,
    OutlinedInput,
    Radio,
    RadioGroup,
} from '@smart-link/core/material-ui';
import Carousel from '../Carousel/Carousel';

const Welcome = memo(() => {
    const {t} = useTranslation('@smart-link/context');
    const classes = useStyles();

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <SmartLinkPage className="flex flex-row flex-wrap">
            <div className="w-320">
                <Carousel>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>
            <div className="w-320 ml-12">
                <Carousel dotPlacement="top">
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>
            <div className="w-320 ml-12">
                <Carousel dotPlacement="left" className="h-160">
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>
            <div className="w-320 ml-12">
                <Carousel dotPlacement="right" className="h-160" trigger="hover">
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>
            <div className="w-320 mt-12">
                <Carousel showArrow>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>
            <div className="w-320 mt-12 ml-12">
                <Carousel autoPlay>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            {/*    <InputBase type="hidden" required name="id" className="hidden" inputRef={register()} /> */}
            {/*    <Grid container spacing={2}> */}
            {/*        <Grid item md={12}> */}
            {/*            <FormControl error={!!errors.title} className="flex flex-row items-center"> */}
            {/*                <FormLabel required htmlFor="title" className="min-w-60"> */}
            {/*                    标题 */}
            {/*                </FormLabel> */}

            {/*                <OutlinedInput */}
            {/*                    placeholder="不超过50个中文字符" */}
            {/*                    fullWidth */}
            {/*                    // autoFocus */}
            {/*                    id="title" */}
            {/*                    ref={register('title', { */}
            {/*                        required: {value: true, message: '请输入标题'}, */}
            {/*                        maxLength: {value: 100, message: '不超过50个中文字符'}, */}
            {/*                    })} */}
            {/*                /> */}
            {/*                {errors.title ? ( */}
            {/*                    <FormHelperText className="pl-0">{errors.title.message}</FormHelperText> */}
            {/*                ) : null} */}
            {/*            </FormControl> */}
            {/*        </Grid> */}
            {/*        <Grid item md={12}> */}
            {/*            <FormControl error={!!errors.content} fullWidth className="flex flex-row items-center"> */}
            {/*                <FormLabel required htmlFor="content" className="min-w-60"> */}
            {/*                    内容 */}
            {/*                </FormLabel> */}
            {/*                <OutlinedInput */}
            {/*                    type="text" */}
            {/*                    fullWidth */}
            {/*                    multiline */}
            {/*                    rowsMin={4} */}
            {/*                    id="title" */}
            {/*                    name="title" */}
            {/*                    ref={register('content')} */}
            {/*                /> */}
            {/*                {errors.content ? ( */}
            {/*                    <FormHelperText className="pl-0">{errors.content.message}</FormHelperText> */}
            {/*                ) : null} */}
            {/*            </FormControl> */}
            {/*        </Grid> */}
            {/*        <Grid item md={12}> */}
            {/*            <FormControl fullWidth className="flex flex-row items-center"> */}
            {/*                <FormLabel required htmlFor="content" className="min-w-60"> */}
            {/*                    是否匿名发帖 */}
            {/*                </FormLabel> */}
            {/*                <RadioGroup id="ni-ming" ref={register('niming')} row className="ml-12"> */}
            {/*                    <FormControlLabel value="yes" control={<Radio />} label="是" /> */}
            {/*                    <FormControlLabel value="no" control={<Radio />} label="否" /> */}
            {/*                </RadioGroup> */}
            {/*            </FormControl> */}
            {/*        </Grid> */}
            {/*        <Grid item md={12} className="flex flex-row justify-center"> */}
            {/*            <Button type="submit" variant="contained" color="secondary" className="mr-20"> */}
            {/*                发帖 */}
            {/*            </Button> */}
            {/*            <Button variant="contained">返回</Button> */}
            {/*        </Grid> */}
            {/*    </Grid> */}
            {/* </form> */}
        </SmartLinkPage>
    );
});

const useStyles = makeAppStyles({
    carouselImg: {
        width: '100%',
        height: '500px',
        objectFit: 'cover',
    },
});

export default Welcome;
