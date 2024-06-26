/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Alert, Button, FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import useFetch from '../shared/hooks/useFetch';
//import { TodoDto } from '../dto/TodoDto';

interface ItemProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
 
/*interface ItemProps {
  todo?:TodoDto[];
} */

const TodoScreen: React.FC = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState<ItemProps[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedTodoTitle, setSelectedTodoTitle] = useState<string | null>(null);

  const {data, loading, error} = useFetch<ItemProps[]>('https://jsonplaceholder.typicode.com/todos');

  useEffect(() => {
    if (data) {
      setTodos(data.slice(0, 10));
    }
  }, [data]);

  const openModal = (type: 'create' | 'edit' | 'delete', id: number | null = null, title: string = '') => {
    setModalType(type);
    if (type === 'edit' && id !== null) {
      setEditingId(id);
      setEditTitle(title);
    }
    if (type === 'delete' && id !== null) {
      setEditingId(id);
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
    setEditingId(null);
    setEditTitle('');
    setNewTitle('');
    setSelectedTodoId(null);
    setSelectedTodoTitle(null);
  };

  const handleDelete = async () => {
    try{

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${selectedTodoId}`, {
        method: 'DELETE'
      });

      if(response.ok) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== selectedTodoId));
        closeModal();
      }
      else {
        Alert.alert('Error', `Failed to delete Todo with id: ${selectedTodoId}`);
      }
    } catch(error) {
      Alert.alert('Error', error.message);
    }

  }

  const startEditing = (id: number, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const handleUpdate = async () => {
    if (editingId === null) return;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          completed: false,
          userId: 1,
        }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(prevTodos =>
          prevTodos.map(todo => (todo.id === editingId ? updatedTodo : todo))
        );
        setEditingId(null);
        setEditTitle('');
        closeModal();
      } else {
        Alert.alert('Error', `Failed to update Todo with id: ${editingId}`);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  const handleNewTodo = async () => {
    if (!newTitle.trim()) {
      Alert.alert('Error', 'Title cannot be empty');
      return;
    }
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          completed: false,
          userId: 1,
        }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos([newTodo, ...todos]);
        setNewTitle('');
        closeModal();
      } else {
        Alert.alert('Error', 'Failed to create new Todo');
      }
    } catch(error) {
      Alert.alert('Error', error.message);
    }
  }

  if(loading) return <ActivityIndicator />
  if(error) return <Text>Error Message: {error.message}</Text>
  return (
    <>
      <View>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View>
        <Button title='Create' onPress={() => openModal('create')} />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={todos}
          renderItem={({item}) => (
            <View style={styles.item}>
              {editingId === item.id ? (
                <>
                  <TextInput value={editTitle} onChangeText={setEditTitle} />
                  <Button title="Guardar" onPress={handleUpdate} />
                </>
              ) : (
                <>
                  <Text style={styles.title}>{item.title}</Text><View>
                    <Button title='Editar' onPress={() => {startEditing(item.id, item.title); openModal('edit') }}/>
                    <Button title='Apagar' onPress={() => {
                    setSelectedTodoTitle(item.title);
                    setSelectedTodoId(item.id);
                    openModal('delete');
                  }} />
                  </View>
                </>
              )}
              
              
            </View>
          )}          
        />

      <Modal
        transparent={false}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
         {modalType === "create" && (
          <>
            <TextInput placeholder='New Todo' value={newTitle} onChangeText={setNewTitle} />
            <Button title='Cancel' onPress={closeModal} />
            <Button title='Create' onPress={handleNewTodo} />
          </>          
         )}
 
        {modalType === "edit" && (
          <>
             <TextInput value={editTitle} onChangeText={setEditTitle} />
             <Button title='Cancel' onPress={closeModal} />
             <Button title="Editar" onPress={handleUpdate} />
          </>          
         )}

        {modalType === "delete" && (
          <>
             <Text>Quer Apagar o todo: {selectedTodoTitle} ?</Text>
             <Button title='Cancel' onPress={closeModal} />
             <Button title='Apagar' onPress={handleDelete} />
          </>          
         )}
      </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'lightgrey',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    display: 'flex', 
    textAlign: 'center'
  },
  button: {
    width: '50%',
  }
});

export default TodoScreen;
 