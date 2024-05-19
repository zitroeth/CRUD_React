import BasicTable from "../components/BasicTable";

export default function UserList() {
  const token = localStorage.getItem('access_token');
  return (
    <>
      <p>User List</p>
      <BasicTable url="http://localhost:3113/users/" token={token} />
    </>
  )
}
