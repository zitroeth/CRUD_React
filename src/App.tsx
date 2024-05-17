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

export default function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DenseAppBar />
        <Routes>
          <Route path="/create/Friend" element={<CreateFriend />} />
          <Route path="/create/Belonging" element={<CreateBelonging />} />
          <Route path="/create/Borrowed" element={<CreateBorrowed />} />
          <Route path="/create/SentimentAnalysis" element={<CreateSentimentAnalysis />} />
          <Route path="/read/Friend" element={<ReadFriend />} />
          <Route path="/read/Belonging" element={<ReadBelonging />} />
          <Route path="/read/Borrowed" element={<ReadBorrowed />} />
          <Route path="/read/SentimentAnalysis" element={<ReadSentimentAnalysis />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
        </Routes>
      </LocalizationProvider>
    </>
  )
}