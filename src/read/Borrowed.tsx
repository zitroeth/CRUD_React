import BasicTable from "../components/BasicTable";

export default function Borrowed() {
    return (
      <>
      <p>Read Borrowed</p>
      <BasicTable url="http://localhost:3113/api/v1/borrowings/"/>
      </>
    )
  }
  