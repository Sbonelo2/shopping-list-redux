import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './redux/store';
import ShoppingListScreen from './screens/ShoppingListScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ShoppingListScreen />
        <StatusBar style="auto" />
      </Provider>
    </SafeAreaProvider>
  );
}