import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShoppingItem {
  id: string;
  name: string;
  purchased: boolean;
}

interface ShoppingState {
  items: ShoppingItem[];
}

const initialState: ShoppingState = {
  items: [
    { id: '1', name: 'Milk', purchased: false },
    { id: '2', name: 'Bread', purchased: false },
    { id: '3', name: 'Eggs', purchased: true },
  ],
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const newItem = {
        id: Date.now().toString(),
        name: action.payload,
        purchased: false,
      };
      state.items.push(newItem);
    },
    toggleItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearList: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, toggleItem, deleteItem, clearList } = shoppingSlice.actions;
export type { ShoppingItem, ShoppingState };
export default shoppingSlice.reducer;

