import BasicTable from "../components/BasicTable";

export default function UserList() {
    return (
      <>
      <p>User List</p>
      <BasicTable url="http://localhost:3113/users/"/>
      </>
    )
  }
  