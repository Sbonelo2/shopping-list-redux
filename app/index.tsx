import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import ShoppingListScreen from '../src/screens/ShoppingListScreen';

export default function Index() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ShoppingListScreen />
        <StatusBar style="auto" />
      </Provider>
    </SafeAreaProvider>
  );
}
