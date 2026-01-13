import React, { useEffect } from 'react';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddItemInput from '../components/AddItemInput';
import ShoppingItem from '../components/ShoppingItem';
import { addItem, clearList, deleteItem, editItem, setError, setItems, toggleItem } from '../redux/shoppingSlice';
import { AppDispatch, RootState } from '../redux/store';
import { loadShoppingList, saveShoppingList } from '../utils/storage';

const ShoppingListScreen: React.FC = () => {
  const { items, isLoading, error } = useSelector((state: RootState) => state.shopping);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    loadSavedData();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      saveShoppingList(items);
    }
  }, [items]);

  const loadSavedData = async () => {
    try {
      const savedItems = await loadShoppingList();
      if (savedItems) {
        dispatch(setItems(savedItems));
      }
    } catch (err) {
      dispatch(setError('Failed to load saved data'));
    }
  };

  const handleAddItem = (name: string) => {
    if (name.trim()) {
      dispatch(addItem(name));
    }
  };

  const handleToggleItem = (id: string) => {
    dispatch(toggleItem(id));
  };

  const handleDeleteItem = (id: string) => {
    console.log('Delete item called:', id);
    dispatch(deleteItem(id));
  };

  const handleEditItem = (id: string, newName: string) => {
    console.log('Edit item called:', { id, newName });
    if (newName.trim()) {
      dispatch(editItem({ id, newName }));
    }
  };

  const handleClearList = () => {
    Alert.alert(
      'Clear List',
      'Are you sure you want to clear the entire shopping list?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive', 
          onPress: () => dispatch(clearList()) 
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <ShoppingItem
      item={item}
      onToggle={handleToggleItem}
      onDelete={handleDeleteItem}
      onEdit={handleEditItem}
    />
  );

  const purchasedCount = items.filter(item => item.purchased).length;
  const totalCount = items.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        <View style={styles.stats}>
          <Text style={styles.statText}>
            {purchasedCount}/{totalCount} purchased
          </Text>
        </View>
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.content}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items in your shopping list</Text>
              <Text style={styles.emptySubtext}>Add items using the input below</Text>
            </View>
          }
        />
        <AddItemInput onAddItem={handleAddItem} />
        
        {items.length > 0 && (
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={handleClearList}
            >
              <Text style={styles.clearButtonText}>Clear All Items</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  stats: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#adb5bd',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ShoppingListScreen;
