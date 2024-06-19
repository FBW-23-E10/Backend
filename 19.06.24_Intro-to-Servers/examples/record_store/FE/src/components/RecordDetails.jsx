import { NavLink, useParams,useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTrashAlt } from 'react-icons/fa';
import recordsContext from '../contexts/recordsContext';
import cartContext from '../contexts/cartContext';
const RecordDetails = () => {
  //IMPORTING CONTEXTS
  const { recordsState, dispatch: dispatchRecords } =
    useContext(recordsContext);
  const { dispatch: dispatchCart } = useContext(cartContext);
  const navigate=useNavigate()
  //SETTING THE NEEDED LOCALSTATES FOR THE RECORD AND EDITMODE
  const [currentRecord, setCurrentRecord] = useState({});
  const [editMode, setEditMode] = useState(false);

  // GRABS THE ID FROM THE ADDRESSBAR
  const { id } = useParams();

  //FINDS THE MATCHING RECORD IN THE CONTEXT AND SETS IT AS A LOCAL STATE
  useEffect(() => {
    setCurrentRecord(recordsState.find((record) => record._id === id));
  }, []);

  const saveChanges = () => {
    setEditMode((editMode) => !editMode);
    dispatchRecords({ type: 'UPDATE_RECORD', payload: currentRecord });
  };

  //DELETES THE EXISTING VERSION OF THE RECORD AND TAKES YOU BACK TO THE RECORDS_LIST PAGE

  const deleteRecord = () => {
    setEditMode((editMode) => !editMode);
    dispatchRecords({ type: 'DELETE_RECORD', payload: currentRecord._id });
    navigate('/records')
  };

  return (
    <div className='record-detail'>
      <h1>
        {currentRecord ? `${currentRecord.title}` : <>Record not found</>}
      </h1>

      <div className='record-info'>
        {/* ADDS A PREVIEW OF THE NEW IMAGE BASED ON THE UPDATED URL */}
        <div className='previewImg'>
          {editMode && <img src={currentRecord.img} alt='' />}
        </div>
        <div>
          {/* CONDITIONAL RENDERING BASED ON EDITMODE, IF IN EDITMODE< SHOW AN INPUT WITH THE CURRENT VALUES OF THE RECORD INSTEAD OF THE NORMAL VIEW */}
          {editMode ? (
            <input
              type='text'
              value={currentRecord.img}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, img: e.target.value })
              }
            />
          ) : (
            <img src={currentRecord.img} />
          )}
        </div>
        <div>
          {editMode ? (
            <input
              type='text'
              value={currentRecord.artist}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, artist: e.target.value })
              }
            />
          ) : (
            <p>{currentRecord.artist}</p>
          )}
        </div>
        <div>
          {editMode ? (
            <input
              type='text'
              value={currentRecord.title}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, title: e.target.value })
              }
            />
          ) : (
            <p>{currentRecord.title}</p>
          )}
        </div>
        <div>
          {editMode ? (
            <input
              type='text'
              value={currentRecord.price}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, price: e.target.value })
              }
            />
          ) : (
            <p>{currentRecord.price}</p>
          )}
        </div>
        <div>
          {editMode ? (
            <input
              type='text'
              value={currentRecord.genre}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, genre: e.target.value })
              }
            />
          ) : (
            <p>{currentRecord.genre}</p>
          )}
        </div>
        <div>
          {editMode ? (
            <input
              type='text'
              value={currentRecord.year}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, year: e.target.value })
              }
            />
          ) : (
            <p>{currentRecord.year}</p>
          )}
        </div>
      </div>
      {/* ONLY ADDS THE ADD TO CART BUTTON WHEN NOT IN EDIT MODE */}
      {!editMode && (
        <button
          onClick={() =>
            dispatchCart({ type: 'ADD_TO_CART', payload: currentRecord })
          }
        >
          Add to Cart
        </button>
      )}

      <div className='record-actions'>
        <FaEdit
          className={'recordEditButton'}
          onClick={() => setEditMode((editMode) => !editMode)}
        />
        {/* THE FOLLOWING 2 BUTTONS ONLY APPEAR IN EDIT MODE */}
        <FaSave
          onClick={saveChanges}
          className={`recordEditButton ${editMode ? 'visible ' : 'hidden'}`}
        />
          <FaTrashAlt
            onClick={deleteRecord}
            className={`recordEditButton ${editMode ? 'visible ' : 'hidden'}`}
          />
      
      </div>
    </div>
  );
};

export default RecordDetails;
