import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddItemInputProps {
  onAddItem: (name: string) => void;
}

const AddItemInput: React.FC<AddItemInputProps> = ({ onAddItem }) => {
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleAddItem = () => {
    console.log('Add button pressed with text:', text);
    const trimmedText = text.trim();

    if (!trimmedText) {
      Alert.alert('Error', 'Please enter an item name');
      return;
    }

    if (trimmedText.length > 50) {
      Alert.alert('Error', 'Item name must be 50 characters or less');
      return;
    }

    console.log('Calling onAddItem with:', trimmedText);
    onAddItem(trimmedText);
    setText('');
    Keyboard.dismiss();
  };

  const handleSubmitEditing = () => {
    handleAddItem();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmitEditing}
          placeholder="Enter shopping item..."
          placeholderTextColor="#999"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={50}
          accessibilityLabel="Shopping item input"
          accessibilityHint="Enter the name of a shopping item"
        />
        <TouchableOpacity
          style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}
          onPress={handleAddItem}
          disabled={!text.trim()}
          accessibilityLabel="Add shopping item"
          accessibilityHint="Add the entered item to your shopping list"
        >
          <Text style={[styles.addButtonText, !text.trim() && styles.addButtonTextDisabled]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      {text.length > 40 && (
        <Text style={styles.characterCount}>
          {text.length}/50 characters
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  inputContainerFocused: {
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  addButton: {
    width: 70,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButtonTextDisabled: {
    color: '#999',
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
  },
});

export default AddItemInput;