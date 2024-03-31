import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { teal } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { useForm } from "react-hook-form";

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
  name: string
}

export default function Belonging() {

  const form = useForm<FormValues>({
    defaultValues: {
      name: ''
    }
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = (data: FormValues) => {
    // Using Fetch API
    fetch('http://localhost:3113/api/v1/belongings/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
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
            height: "22rem",
            p: "3vw"
          },
        }}
      >
        <Paper elevation={3} >

          <Typography variant="h5" component="div" textAlign={"center"} fontWeight={"bold"}>
            Rental Belonging
            <Typography variant="h6" component="div" marginY={"2.5vh"} textAlign={"left"}>
              Enter Belonging Details
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
            <CssTextField label="Name" id="name-textfield" type="text" {...register("name", { required: "Name is required", })} error={!!errors.name} helperText={errors.name?.message} />
            <ColorButton variant="contained" type='submit'>Submit</ColorButton>
          </Box>

        </Paper>
      </Box>
    </>
  )
}