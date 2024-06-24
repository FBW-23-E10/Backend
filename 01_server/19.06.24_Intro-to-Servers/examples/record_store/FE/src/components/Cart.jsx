import { useContext } from 'react';
import cartContext from '../contexts/cartContext';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
const Cart = () => {
  const { cartState, dispatch } = useContext(cartContext);

  let cartTemplate = cartState.map((record) => (
    <div className='cart-item' key={record._id}>
      <img src={record.img} alt='' />
      <div className='cart-info'>
        <div className='cart-top'>
          <p>{record.title}</p>
        </div>
        <div className='cart-bottom'>
          <p>amount: {record.amount}</p>
          <p>price: {record.price}</p>
          <div className='cart-button-container'>
            <FaPlus
              className='cartButton'
              onClick={() => dispatch({ type: 'ADD_TO_CART', payload: record })}
            />

            <FaMinus
              className='cartButton'
              onClick={() =>
                dispatch({ type: 'REMOVE_FROM_CART', payload: record._id })
              }
            />

            <MdDelete
              className='cartButton'
              onClick={() =>
                dispatch({ type: 'DELETE_FROM_CART', payload: record._id })
              }
            />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='cart'>
      {/* CONDITIONALLY RENDERING OUR H1, IF THERE ARE ITEM(S) IN THE CART, WE DISPLAY THE TOTAL AMOUNT OF RECORDS AND THEIR PRICE */}
      {cartTemplate.length > 0 ? (
        <h1>
          <span>
            {/* CALCULATING THE COMBINED TOTAL AMOUNT OF ALL RECORDS IN THE CART */}
            {cartState.reduce((acc, record) => {
              acc += record.amount;
              return acc;
            }, 0)}
          </span>
          {/* CONDITIONALLY DISPLAYING THE PLURAR FORM OF THE WORD 'RECORD(S)' BASED ON THE AMOUNT OF RECORD(S) IN THE CART */}
          <span>
            {' '}
            {`record${
              cartState.reduce((acc, record) => {
                acc += record.amount;
                return acc;
              }, 0) > 1
                ? 's'
                : ''
            }, $`}
          </span>
          <span>
            {/* CALCULATING THE COMBINED TOTAL PRICE OF ALL RECORDS IN THE CART */}
            {cartState.reduce((acc, record) => {
              acc += record.price * record.amount;
              return acc;
            }, 0)}
          </span>
        </h1>
      ) : (
        <h1>The cart is empty</h1>
      )}
      {cartTemplate.length > 0 && cartTemplate}
    </div>
  );
};

export default Cart;
