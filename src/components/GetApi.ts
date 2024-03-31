import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GetApi( url : string) : string{

  const [data, setData] = useState('');

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [url]);

  return data;
}