import BasicTable from "../components/BasicTable";

export default function Belonging() {
    return (
      <>
      <p>Read Belonging</p>
      <BasicTable url="http://localhost:3113/api/v1/belongings/"/>
      </>
    )
  }
  