import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [records, setRecords] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('http://localhost:3000/records');
      console.log(data);
      setRecords(data);
    };
    getData();
  }, []);


  

  return (
    <>
      <h1>{records? records.map(record=>(< img src={record.img}/>)):<p>loading...</p>} </h1>

      
    </>
  );
}

export default App;
