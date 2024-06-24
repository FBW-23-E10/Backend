import { useContext } from 'react';
import cartContext from '../contexts/cartContext';
import { NavLink } from 'react-router-dom';
const RecordCard = ({ record }) => {
  //TAKING RECORD FROM THE RECORDLIST AS A PROP

  const { dispatch } = useContext(cartContext);



  return (
    <div key={record._id} className='record-card'>
      <NavLink to={record._id} >
        <img src={record.img} />
      </NavLink>

      <div className='record-info'>
        <h3>{record.title}</h3>
        <p>${record.price}</p>
        <button
          onClick={() => dispatch({ type: 'ADD_TO_CART', payload: record })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecordCard;
