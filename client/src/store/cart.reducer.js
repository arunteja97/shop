import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const addItemHelper = (item, cartItems) => {
  const existingItem = cartItems.find((cItem) => cItem._id === item._id);
  if (existingItem) {
    return cartItems.map((cItem) => {
      if (cItem._id === item._id) {
        return {
          ...cItem,
          quantity: cItem.quantity + 1,
        };
      }
      return cItem;
    });
  }
  return [...cartItems, { ...item, quantity: 1 }];
};

const clearItemHelper = (item, cartItems) => {
  return cartItems.filter((cItem) => cItem._id !== item._id);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems = addItemHelper(action.payload, state.cartItems);
    },
    clearItem: (state, action) => {
      state.cartItems = clearItemHelper(action.payload, state.cartItems);
    },
  },
});

export const { addItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;
