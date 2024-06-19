/* import { data } from '../../public/data'; */
import { createContext, useEffect, useReducer } from 'react';
import { recordsReducer } from './reducers/recordsReducer';
import axios from 'axios';
// CREATE CONTEXT
const recordsContext = createContext(null);

export const RecordsProvider = ({ children }) => {
  //INITIATE REDUCER
  const [recordsState, dispatch] = useReducer(recordsReducer, []);

  //FETCH DATA

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        const data = await axios.get('http://localhost:3000/records');
        console.log(data);
        dispatch({ type: 'FETCH_RECORDS', payload: data.data });
      };
      fetchData();
    }, 1500);
  }, []);

  return (
    <recordsContext.Provider value={{ recordsState, dispatch }}>
      {children}
    </recordsContext.Provider>
  );
};

export default recordsContext;
