import { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';

interface Props {
  url: string;
  token: string | null;
  editurl: string | null;
}

export default function BasicTable({ url, token, editurl }: Props) {
  const [data, setData] = useState([]);

  axios.defaults.headers.common['Authorization'] = `Token ${token}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  const handleEdit = async (id: number) => {
    console.log("Editing:", id);
    window.location.href = `${editurl}${id}/`;
  };

  const handleDelete = async (id: number) => {
    console.log("Deleting:", id);

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(
        `${url}${id}`,
        {
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Token ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        alert('Success!');
        if (url === "http://localhost:3113/users/") {
          localStorage.removeItem('access_token');
          localStorage.removeItem('username');
          window.location.href = '/login';
        }else if (url === "http://localhost:3113/api/v1/SentimentAnalysis/"){
          window.location.href = '/read/SentimentAnalysis';
        }
      }

    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) => (
                  <TableCell align="left">{key}</TableCell>
                ))}
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, i) => (
                  <TableCell align="left">{value}</TableCell>
                ))}
                <TableCell>
                  <Button variant="contained" color="success" onClick={() => handleEdit(Object.values(row)[0])}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(Object.values(row)[0])}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
