import { useContext, useState } from 'react';
import recordsContext from '../contexts/recordsContext';
import { useNavigate } from 'react-router-dom';
const AddRecord = () => {
  const { dispatch } = useContext(recordsContext);
  const navigate = useNavigate();
  const [recordToAdd, setRecordToAdd] = useState({
    img: '',
    title: '',
    artist: '',
    year: '',
    price: '',
    genre: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch({ type: 'ADD_RECORD', payload: recordToAdd });
    navigate('/records');
  };

  return (
    <div className='addRecord-container'>
      <h1>Add a new Record</h1>
      {/* ADDS A PREVIEW IMAGE FROM STATE AFTER PROVIDING A URL */}
      <div className='previewImg'>
        {recordToAdd.img ? (
          <img src={recordToAdd.img} alt='' />
        ) : (
          <h2>No Image URL </h2>
        )}
      </div>
      <form className='addRecordForm'>
        <input
          type='text'
          placeholder='image url'
          onChange={(e) =>
            setRecordToAdd({ ...recordToAdd, img: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='title'
          onChange={(e) =>
            setRecordToAdd({ ...recordToAdd, title: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='artist'
          onChange={(e) =>
            setRecordToAdd({ ...recordToAdd, artist: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='year'
          onChange={(e) =>
            setRecordToAdd({ ...recordToAdd, year: +e.target.value })
          }
        />
        <input
          type='text'
          placeholder='price'
          onChange={(e) =>
            setRecordToAdd({ ...recordToAdd, price: +e.target.value })
          }
        />
        <input
          type='text'
          placeholder='genre'
          onChange={(e) =>
            setRecordToAdd({ ...recordToAdd, genre: e.target.value })
          }
        />

        <input type='submit' value='add record' onClick={submitHandler} />
      </form>
    </div>
  );
};

export default AddRecord;
