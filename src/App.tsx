import './App.css'
import BasicTable from './components/BasicTable'

function App() {

  return (
    <>
      <BasicTable url="http://localhost:3113/api/v1/friends/"/>
      <br/>
      <br/>
      <BasicTable url="http://localhost:3113/api/v1/belongings/"/>
      <br/>
      <br/>
      <BasicTable url="http://localhost:3113/api/v1/borrowings/"/>
    </>
  )
}

export default App