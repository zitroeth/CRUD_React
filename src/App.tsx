import './App.css'
import DenseAppBar from './components/DenseAppBar'
import { Route, Routes } from 'react-router'
import { default as CreateFriend } from './create/Friend'
import { default as CreateBelonging } from './create/Belonging'
import { default as CreateBorrowed } from './create/Borrowed'
import { default as ReadFriend } from './read/Friend'
import { default as ReadBelonging } from './read/Belonging'
import { default as ReadBorrowed } from './read/Borrowed'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DenseAppBar />
        <Routes>
          <Route path="/create/Friend" element={<CreateFriend />} />
          <Route path="/create/Belonging" element={<CreateBelonging />} />
          <Route path="/create/Borrowed" element={<CreateBorrowed />} />
          <Route path="/read/Friend" element={<ReadFriend />} />
          <Route path="/read/Belonging" element={<ReadBelonging />} />
          <Route path="/read/Borrowed" element={<ReadBorrowed />} />
        </Routes>
      </LocalizationProvider>
    </>
  )
}