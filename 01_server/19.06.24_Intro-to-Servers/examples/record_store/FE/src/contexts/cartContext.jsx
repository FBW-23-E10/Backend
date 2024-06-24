import { createContext, useReducer } from 'react';
import { cartReducer } from './reducers/cartReducer';
// CREATE CONTEXT
const cartContext = createContext(null);



export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, []);

  return (
    <cartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};

export default cartContext;
