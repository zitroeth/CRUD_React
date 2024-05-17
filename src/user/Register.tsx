import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { teal } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import Alert from '@mui/material/Alert';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
    },
});

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(teal[400]),
    backgroundColor: teal[400],
    '&:hover': {
        backgroundColor: teal[600],
    },
}));

type FormValues = {
    username: string,
    password: string,
    email: string,
    first_name: string,
    last_name: string
}

export default function Register() {

    const form = useForm<FormValues>({
        defaultValues: {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: ''
        }
    })

    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertContentSuccess, setAlertContentSuccess] = useState('');
    const [alertError, setAlertError] = useState(false);
    const [alertContentError, setAlertContentError] = useState('');


    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const onSubmit = (data: FormValues) => {
        // Using Fetch API
        fetch('http://localhost:3113/register/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (response.ok === true) {
                    setAlertContentSuccess(response.statusText);
                    setAlertSuccess(true);
                    setAlertError(false);
                } else {
                    setAlertContentError(response.statusText);
                    setAlertError(true);
                    setAlertSuccess(false);
                }
                console.log(response.statusText);
                return response.json();
            })
            // .then((data) => {
            //   console.log(data);
            //   // Handle data
            // })
            .catch((err) => {
                alert(err.message);
            });
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: "auto",
                        my: "10vh",
                        width: "19rem",
                        height: "32rem",
                        p: "3vw"
                    },
                }}
            >
                <Paper elevation={3} >

                    <Typography variant="h5" component="div" textAlign={"center"} fontWeight={"bold"}>
                        Register User
                        <Typography variant="h6" component="div" marginY={"2.5vh"} textAlign={"left"}>
                            Enter User Details
                        </Typography>
                    </Typography>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { my: "2.5%", width: '40ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                        onChange={() => { setAlertSuccess(false); setAlertError(false); }}
                    >
                        <CssTextField label="Username" id="username-textfield" type="text" {...register("username", { required: "Username is required", })} error={!!errors.username} helperText={errors.username?.message} />
                        <CssTextField label="Password" id="password-textfield" type="text" {...register("password", { required: "Password is required", })} error={!!errors.password} helperText={errors.password?.message} />
                        <CssTextField label="Email" id="email-textfield" type="text" {...register("email", { required: "Email is required", })} error={!!errors.email} helperText={errors.email?.message} />
                        <CssTextField label="First Name" id="first-name-textfield" type="text" {...register("first_name", { required: "First name is required", })} error={!!errors.first_name} helperText={errors.first_name?.message} />
                        <CssTextField label="Last Name" id="last-name-textfield" type="text" {...register("last_name", { required: "Last name is required", })} error={!!errors.last_name} helperText={errors.last_name?.message} />
                        <ColorButton variant="contained" type='submit'>Submit</ColorButton>
                    </Box>

                    {alertError ? <Alert severity='error'>{alertContentError}</Alert> : <></>}
                    {alertSuccess ? <Alert severity='success'>{alertContentSuccess}</Alert> : <></>}
                </Paper>
            </Box>
        </>
    )
}
