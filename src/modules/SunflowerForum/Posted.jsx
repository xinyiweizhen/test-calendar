import React from 'react';
import {
    FormLabel,
    FormControl,
    FormHelperText,
    FormControlLabel,
    OutlinedInput,
    Paper,
    InputBase,
    RadioGroup,
    Radio,
    Grid,
    Button,
} from '@smart-link/core/material-ui';
import {useForm, Controller} from 'react-hook-form';
import {makeAppStyles} from '@smart-link/context';

const Posted = () => {
    const defaultValues = {
        id: '1234567889',
        title: '',
        content: '',
        nameless: '',
    };

    const {register, errors, control, handleSubmit} = useForm({
        defaultValues,
    });

    const onSubmit = d => {
        console.log(d);
    };

    return (
        <Paper className="m-12 p-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputBase
                    type="hidden"
                    required
                    value={defaultValues.id}
                    name="id"
                    className="hidden"
                    inputRef={register()}
                />
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <FormControl
                            fullWidth
                            margin="dense"
                            error={!!errors.title}
                            className="flex flex-row items-center"
                        >
                            <FormLabel required htmlFor="title" className="min-w-60">
                                标题
                            </FormLabel>
                            <div className="w-full">
                                <OutlinedInput
                                    placeholder="不超过50个中文字符"
                                    fullWidth
                                    // autoFocus
                                    id="title"
                                    name="title"
                                    inputRef={register({
                                        required: {value: true, message: '请输入标题'},
                                        maxLength: {value: 100, message: '不超过50个中文字符'},
                                    })}
                                />
                                {errors.title ? (
                                    <FormHelperText className="pl-0">{errors.title.message}</FormHelperText>
                                ) : null}
                            </div>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <FormControl
                            error={!!errors.content}
                            margin="dense"
                            fullWidth
                            className="flex flex-row items-center"
                        >
                            <FormLabel required htmlFor="content" className="min-w-60">
                                内容
                            </FormLabel>
                            <div className="w-full">
                                <OutlinedInput
                                    type="text"
                                    fullWidth
                                    multiline
                                    rowsMin={4}
                                    id="title"
                                    name="content"
                                    inputRef={register({
                                        required: {value: true, message: '请输入内容'},
                                        validate: value => {
                                            if (String(value).trim()) {
                                                return true;
                                            }
                                            return '请输入内容';
                                        },
                                    })}
                                />
                                {errors.content ? (
                                    <FormHelperText className="pl-0">{errors.content.message}</FormHelperText>
                                ) : null}
                            </div>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <FormControl error={!!errors.nameless} fullWidth className="flex flex-row items-center">
                            <FormLabel required htmlFor="nameless" className="min-w-80">
                                是否匿名发帖
                            </FormLabel>
                            <div className="w-full">
                                <Controller
                                    name="nameless"
                                    control={control}
                                    rules={{
                                        required: {value: true, message: '请选择是否匿名发帖'},
                                    }}
                                    as={
                                        <RadioGroup id="nameless" row>
                                            <FormControlLabel
                                                name="nameless"
                                                value="1"
                                                control={<Radio />}
                                                label="是"
                                            />
                                            <FormControlLabel
                                                name="nameless"
                                                value="0"
                                                control={<Radio />}
                                                label="否"
                                            />
                                        </RadioGroup>
                                    }
                                />
                                {errors.nameless ? (
                                    <FormHelperText className="pl-0">{errors.nameless.message}</FormHelperText>
                                ) : null}
                            </div>
                        </FormControl>
                    </Grid>
                    <Grid item md={12} className="flex flex-row justify-center">
                        <Button type="submit" variant="contained" color="secondary" className="mr-20">
                            发帖
                        </Button>
                        <Button variant="contained">返回</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default Posted;
