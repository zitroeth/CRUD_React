import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Alert,
  ButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
import SentimentDisplay from "../components/SentimentDisplay";
import GaugeChart from "../components/GaugeChart";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(teal[400]),
  backgroundColor: teal[400],
  "&:hover": {
    backgroundColor: teal[600],
  },
}));

type FormValues = {
  text: string;
};

export default function SentimentAnalysis() {
  const form = useForm<FormValues>({
    defaultValues: {
      text: "",
    },
  });

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertContentSuccess, setAlertContentSuccess] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [alertContentError, setAlertContentError] = useState("");
  const [sentimentScore, setSentimentScore] = useState<number>(0);
  const [sentimentLabel, setSentimentLabel] = useState<string | null>(null);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      const token = localStorage.getItem('access_token');
      console.log(token);
      const response = await fetch(
        "http://localhost:3113/api/v1/SentimentAnalysis/",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData = await response.json();
      setAlertContentSuccess(responseData.message);
      setAlertSuccess(true);
      setAlertError(false);
      setSentimentScore(responseData.score);
      setSentimentLabel(responseData.sentiment);
    } catch (err: any) {
      alert(err.message);
      setAlertError(true);
      setAlertContentError(err.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: "auto",
            my: "10vh",
            width: "19rem",
            height: "22rem",
            p: "3vw",
          },
        }}
      >
        <Paper elevation={3}>
          <Typography
            variant="h5"
            component="div"
            textAlign={"center"}
            fontWeight={"bold"}
          >
            Sentiment Analysis
            <Typography
              variant="h6"
              component="div"
              marginY={"2.5vh"}
              textAlign={"left"}
            >
              Enter Text
            </Typography>
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { my: "2.5%", width: "40ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CssTextField
              label="Text"
              id="text-textfield"
              type="text"
              {...register("text", { required: "Text is required" })}
              error={!!errors.text}
              helperText={errors.text?.message}
            />
            <ColorButton variant="contained" type="submit">
              Submit
            </ColorButton>
          </Box>
          {alertError && <Alert severity="error">{alertContentError}</Alert>}
          {alertSuccess && (
            <Alert severity="success">{alertContentSuccess}</Alert>
          )}
          {alertSuccess ? (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <SentimentDisplay label={sentimentLabel} score={sentimentScore} />
              <GaugeChart label={sentimentLabel} score={sentimentScore} />
            </Box>
          ) : null}
        </Paper>
      </Box>
    </>
  );
}
