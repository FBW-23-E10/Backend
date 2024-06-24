export const cartReducer = (cartState, action) => {
  const { type, payload } = action;

  const newCartState = JSON.parse(JSON.stringify(cartState));

  switch (type) {
    case 'ADD_TO_CART':
      {
        const existingRecord = newCartState.find(
          (record) => record._id === payload._id
        );
        if (existingRecord) {
          existingRecord.amount++;
          return newCartState;
        } else {
          return [...newCartState, { ...payload, amount: 1 }];
        }
      }
      break;
    case 'REMOVE_FROM_CART':
      {
        const existingRecord = newCartState.find(
          (record) => record._id === payload
        );
        if (existingRecord.amount > 1) {
          existingRecord.amount--;
          return newCartState;
        } else {
          existingRecord.amount = 0;
          return newCartState.filter((record) => record._id !== payload);
        }
      }
      break;
    case 'DELETE_FROM_CART':
      {
        return newCartState.filter((record) => record._id !== payload);
      }
      break;
    default:
      return cartState;
  }
};
