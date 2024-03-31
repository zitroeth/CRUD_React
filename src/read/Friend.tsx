import BasicTable from "../components/BasicTable";

export default function Friend() {
  return (
    <>
    <p>Read Friend</p>
    <BasicTable url="http://localhost:3113/api/v1/friends/"/>
    </>
  )
}
