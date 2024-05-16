import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { teal } from '@mui/material/colors';
import { createTheme, styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider } from '@emotion/react';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import { DateTimePicker } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs, { Dayjs } from 'dayjs';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(teal[400]),
  backgroundColor: teal[400],
  '&:hover': {
    backgroundColor: teal[600],
  },
}));

const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6F7E8C',
    },
    secondary: {
      main: '#A0AAB4',
    },
  },
});

type FormValues = {
  what: number
  to_who: number
  returned: string
}

type Item = {
  id: number;
  name: string;
};

export default function Borrowed() {
  const form = useForm<FormValues>({
    defaultValues: {
    }
  })

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertContentSuccess, setAlertContentSuccess] = useState('');
  const [alertError, setAlertError] = useState(false);
  const [alertContentError, setAlertContentError] = useState('');
  const [belonging, setBelonging] = React.useState('');
  const [friend, setFriend] = React.useState('');
  const [belongingData, setBelongingData] = React.useState<Item[]>([]);
  const [friendData, setFriendData] = React.useState<Item[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3113/api/v1/belongings/")
      .then((res) => {
        setBelongingData(res.data)
      })
    axios
      .get("http://localhost:3113/api/v1/friends/")
      .then((res) => {
        setFriendData(res.data)
      })
  }, [])

  const handleBelongingChange = (event: SelectChangeEvent) => {
    setBelonging(event.target.value as string);
  };

  const handleFriendChange = (event: SelectChangeEvent) => {
    setFriend(event.target.value as string);
  };

  const { register, handleSubmit, formState } = form
  const { errors } = formState


  const onSubmit = (data: FormValues) => {
    if (selectedDate) {
      data.returned = selectedDate.toISOString();
    }

    console.log(data);
    fetch('http://localhost:3113/api/v1/borrowings/', {
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
            height: "25rem",
            p: "3vw"
          },
        }}
      >
        <Paper elevation={3} >

          <Typography variant="h5" component="div" textAlign={"center"} fontWeight={"bold"}>
            Rental Borrow
            <Typography variant="h6" component="div" marginY={"2.5vh"} textAlign={"left"}>
              Enter Borrow Details
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
          >
            <ThemeProvider theme={themeOptions}>
              <FormControl fullWidth >
                <InputLabel id="what-select-label" >What</InputLabel>
                <Select
                  labelId="what-select-label"
                  id="what-select"
                  value={belonging}
                  label="What"
                  color='primary'
                  {...register("what", { required: "Belonging is required", })}
                  onChange={handleBelongingChange}  //() => { handleBelongingChange; setAlertSuccess(false); setAlertError(false);
                  error={!!errors.what}
                >
                  {belongingData.map((belonging) => (
                    <MenuItem value={belonging.id}>{belonging.name}</MenuItem>
                  )
                  )}
                </Select>
                <FormHelperText>{errors.what?.message}</FormHelperText>
              </FormControl>

              <FormControl fullWidth >
                <InputLabel id="to-who-select-label" >To Who</InputLabel>
                <Select
                  labelId="to-who-select-label"
                  id="to-who-select"
                  value={friend}
                  label="To Who"
                  color='primary'
                  {...register("to_who", { required: "Friend is required", })}
                  onChange={() => { handleFriendChange; setAlertSuccess(false); setAlertError(false); }}
                  error={!!errors.to_who}
                >
                  {friendData.map((friend) => (
                    <MenuItem value={friend.id}>{friend.name}</MenuItem>
                  )
                  )}
                </Select>
                <FormHelperText>{errors.what?.message}</FormHelperText>
              </FormControl>

              <DateTimePicker
                label="Returned"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                defaultValue={dayjs()}
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setAlertSuccess(false);
                  setAlertError(false);
                }}
              />

            </ThemeProvider>

            <ColorButton variant="contained" type='submit'>Submit</ColorButton>
          </Box>

          {alertError ? <Alert severity='error'>{alertContentError}</Alert> : <></>}
          {alertSuccess ? <Alert severity='success'>{alertContentSuccess}</Alert> : <></>}
        </Paper >
      </Box >
    </>
  )
}
