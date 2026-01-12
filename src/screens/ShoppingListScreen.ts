import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addItem, deleteItem, toggleItem } from '../redux/shoppingSlice';
import AddItemInput from '../components/AddItemInput';
import ShoppingItem from '../components/ShoppingItem';

const ShoppingListScreen = () => {
  const items = useSelector((state: RootState) => state.shopping.items);
  const dispatch = useDispatch();

  const handleAddItem = (name: string) => {
    dispatch(addItem(name));
  };

  const handleToggleItem = (id: string) => {
    dispatch(toggleItem(id));
  };

  const handleDeleteItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  const renderItem = ({ item }) => (
    <ShoppingItem
      item={item}
      onToggle={handleToggleItem}
      onDelete={handleDeleteItem}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.content}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
        <AddItemInput onAddItem={handleAddItem} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default ShoppingListScreen;
