import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingItem } from '../redux/shoppingSlice';

const STORAGE_KEY = 'shopping_list';

export const saveShoppingList = async (items: ShoppingItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving shopping list:', error);
    throw new Error('Failed to save shopping list');
  }
};

export const loadShoppingList = async (): Promise<ShoppingItem[] | null> => {
  try {
    const savedList = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedList) {
      const parsed = JSON.parse(savedList);
      return Array.isArray(parsed) ? parsed : null;
    }
    return null;
  } catch (error) {
    console.error('Error loading shopping list:', error);
    return null;
  }
};

export const clearShoppingList = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing shopping list:', error);
    throw new Error('Failed to clear shopping list');
  }
};
