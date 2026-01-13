import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShoppingItem {
  id: string;
  name: string;
  purchased: boolean;
}

interface ShoppingState {
  items: ShoppingItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ShoppingState = {
  items: [
    { id: '1', name: 'Milk', purchased: false },
    { id: '2', name: 'Bread', purchased: false },
    { id: '3', name: 'Eggs', purchased: true },
  ],
  isLoading: false,
  error: null,
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: action.payload.trim(),
        purchased: false,
      };
      state.items.push(newItem);
      state.error = null;
    },
    editItem: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.name = action.payload.newName.trim();
        state.error = null;
      }
    },
    toggleItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
        state.error = null;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.error = null;
    },
    clearList: (state) => {
      state.items = [];
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  addItem,
  editItem,
  toggleItem,
  deleteItem,
  clearList,
  setLoading,
  setError,
  setItems,
} = shoppingSlice.actions;

export type { ShoppingItem, ShoppingState };
export default shoppingSlice.reducer;