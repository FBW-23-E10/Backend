import { useContext, useState } from 'react';
import recordsContext from '../contexts/recordsContext';
import RecordCard from './RecordCard';

const RecordList = () => {
  //ACCESSING THE STATE FROM THE RECORDCONTEXT
  const { recordsState } = useContext(recordsContext);


  //SEARCHTERM STATE FOR FILTERING
  const [searchTerm, setSearchTerm] = useState('');

  //FILTER THE STATE FOR A SEARCHTERM THAT IS INCLUDED IN THE TITLE OF THE RECORDS
  //IF THERE IS A SEARCHTERM AT ALL
  const displayedRecords = recordsState
    .filter((record) =>
      searchTerm === ''
        ? record
        : record.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    //MAP THROUGH THE ARRAY OF RECORDS THE FILTER RETURNS
    .map((record) => (
      <div key={record._id}>{<RecordCard record={record} />}</div>
    ));

  return (
    <div className='record-list'>
      <h1>Our latest records</h1>
      <form>
        <input
          type='text'
          value={searchTerm}
          //SETTING SEARCHTERM STATE TO THE INPUTVALUE
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='filter by title...'
        />
      </form>
      <div className='record-list-container'>
        {/* CONDITIONAL RENDERING OF THE MAPPED ARRAY OF RECORDS, BASED ON THE AVAILABILITY OF THE STATE */}
        {/* DISPLAY LOADING MESSAGE DURING FETCHING DATA */}
        {recordsState.length > 0 ? displayedRecords : <div>Loading....</div>}
      </div>
    </div>
  );
};

export default RecordList;
