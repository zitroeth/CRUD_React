import './App.css'
import DenseAppBar from './components/DenseAppBar'
import { Route, Routes } from 'react-router'
import { default as CreateFriend } from './create/Friend'
import { default as CreateBelonging } from './create/Belonging'
import { default as CreateBorrowed } from './create/Borrowed'
import { default as CreateSentimentAnalysis } from './create/SentimentAnalysis'
import { default as ReadFriend } from './read/Friend'
import { default as ReadBelonging } from './read/Belonging'
import { default as ReadBorrowed } from './read/Borrowed'
import { default as ReadSentimentAnalysis } from './read/SentimentAnalysis'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Register from './user/Register'
import Login from './user/Login'
import UserList from './read/UserList'
// import sentimentWallpaper1 from './assets/sentiment_wallpaper_1.png';
import sentimentWallpaper2 from './assets/sentiment_wallpaper_2.png';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors'
import { default as UpdateSentimentAnalysis } from './update/SentimentAnalysis'
import { default as UpdateUser } from './update/User'

function HomePageContent() {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{
          my: 8,
          bgcolor: grey[300],
          color: grey[900],
          borderRadius: 1,
          opacity: .9,
        }}>
          <Typography variant="h2" align="center" gutterBottom>
            Game Review Sentiment Analysis
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Our platform leverages advanced machine learning algorithms to analyze the sentiment of game reviews. Whether a review is overwhelmingly positive, negative, or neutral, we provide insights that help gamers make informed decisions about their next gaming purchase.
          </Typography><br/>
          <Typography variant="h3" align="center" gutterBottom>
            Features
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            - Analyze sentiments across thousands of game reviews.<br/>
            - Get detailed reports on player satisfaction.<br/>
            - Identify trends and patterns in gamer opinions.<br/>
          </Typography><br/>
          <Typography variant="h3" align="center" gutterBottom>
            Why Choose Us
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            - Accurate sentiment analysis powered by cutting-edge technology.<br/>
            - User-friendly interface designed for easy navigation.<br/>
            - Continuous updates and improvements based on user feedback.<br/>
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default function App() {
  return (
    <div style={{
      backgroundImage: `url(${sentimentWallpaper2})`,
      width: "100",
      minHeight: "98vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DenseAppBar />
        <Routes>
          <Route path="/" element={<HomePageContent />} />
          <Route path="/create/Friend" element={<CreateFriend />} />
          <Route path="/create/Belonging" element={<CreateBelonging />} />
          <Route path="/create/Borrowed" element={<CreateBorrowed />} />
          <Route path="/create/SentimentAnalysis" element={<CreateSentimentAnalysis />} />
          <Route path="/read/Friend" element={<ReadFriend />} />
          <Route path="/read/Belonging" element={<ReadBelonging />} />
          <Route path="/read/Borrowed" element={<ReadBorrowed />} />
          <Route path="/read/SentimentAnalysis" element={<ReadSentimentAnalysis />} />
          <Route path="/read/UserList" element={<UserList />} />
          <Route path="/update/SentimentAnalysis/:id" element={<UpdateSentimentAnalysis />} />
          <Route path="/update/users/:id" element={<UpdateUser />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
        </Routes>
      </LocalizationProvider>
    </div>
  )
}