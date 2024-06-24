import { v4 as uuidv4 } from 'uuid';
export const recordsReducer = (recordsState, action) => {
  const { type, payload } = action;
  const copyOfState = JSON.parse(JSON.stringify(recordsState));

  switch (type) {
    case 'FETCH_RECORDS':
      {
        return [...payload];
      }
      break;
    case 'ADD_RECORD':
      {
        console.log(payload)
        let newId = uuidv4();
        let idExists = copyOfState.find((record) => record._id === newId);
        if (idExists) {
          newId = uuidv4();
          return [...copyOfState, { ...payload, _id: newId }];
        } else {
          return [...copyOfState, { ...payload, _id: newId }];
        }
      }
      break;
    case 'DELETE_RECORD':
      {
        return copyOfState.filter((record) => record._id !== payload);
      }
      break;
    case 'UPDATE_RECORD':
      {
        return copyOfState.map((record) => {
          if (record._id === payload._id) {
            return payload;
          } else {
            return record;
          }
        });
      }
      break;
    default:
      return recordsState;
  }
};
