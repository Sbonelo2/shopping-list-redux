import { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddItemInput = ({ onAddItem }) => {
  const [text, setText] = useState('');

  const handleAddItem = () => {
    if (text.trim()) {
      onAddItem(text.trim());
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add new item..."
        placeholderTextColor="#999"
        onSubmitEditing={handleAddItem}
        returnKeyType="done"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#007AFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});

export default AddItemInput;
