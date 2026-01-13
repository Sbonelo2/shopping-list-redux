import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ShoppingItem as ShoppingItemType } from '../redux/shoppingSlice';

interface ShoppingItemProps {
  item: ShoppingItemType;
  onToggle: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({ item, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(item.name);

  const handleToggle = () => {
    onToggle(item.id);
  };

  const handleEdit = () => {
    console.log('Edit button pressed for item:', item.name);
    setIsEditing(true);
    setEditText(item.name);
  };

  const handleSaveEdit = () => {
    console.log('Save edit button pressed for item:', item.name, 'new text:', editText);
    const trimmedText = editText.trim();
    
    if (!trimmedText) {
      Alert.alert('Error', 'Item name cannot be empty');
      return;
    }

    if (trimmedText.length > 50) {
      Alert.alert('Error', 'Item name must be 50 characters or less');
      return;
    }

    console.log('Calling onEdit with:', item.id, trimmedText);
    onEdit(item.id, trimmedText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(item.name);
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log('Delete button pressed for item:', item.name);
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Delete confirmed for item:', item.name);
            onDelete(item.id);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={handleToggle}
        accessibilityLabel={`Toggle ${item.name} purchased status`}
        accessibilityHint={`Mark ${item.name} as ${item.purchased ? 'not purchased' : 'purchased'}`}
              >
        <View style={[styles.checkbox, item.purchased && styles.checked]}>
          {item.purchased && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>
        
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            onSubmitEditing={handleSaveEdit}
            onBlur={handleSaveEdit}
            maxLength={50}
            autoFocus
            accessibilityLabel="Edit item name"
            accessibilityHint="Enter new name for shopping item"
          />
        ) : (
          <Text style={[styles.itemText, item.purchased && styles.strikethrough]}>
            {item.name}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.actions}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSaveEdit}
              accessibilityLabel="Save edit"
              accessibilityHint="Save the edited item name"
            >
              <Text style={styles.saveButtonText}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleCancelEdit}
              accessibilityLabel="Cancel edit"
              accessibilityHint="Cancel editing and keep original name"
            >
              <Text style={styles.cancelButtonText}>✕</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={handleEdit}
              accessibilityLabel={`Edit ${item.name}`}
              accessibilityHint={`Edit the name of ${item.name}`}
            >
              <Text style={styles.editButtonText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
              accessibilityLabel={`Delete ${item.name}`}
              accessibilityHint={`Delete ${item.name} from your shopping list`}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#007AFF',
    borderWidth: 1,
    borderColor: '#0056b3',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    borderWidth: 1,
    borderColor: '#c82333',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  editButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShoppingItem;