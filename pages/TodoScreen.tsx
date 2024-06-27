/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Alert, Button, FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import useFetch from '../shared/hooks/useFetch';
import { TodoType, useTodoModel } from '../models/TodoModel';

const TodoScreen: React.FC = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const[selected, setSelected] = useState<TodoType | null>(null);

  const {data, loading, error} = useFetch<TodoType[]>('https://jsonplaceholder.typicode.com/todos');

  const {
		field,
		handleSubmit
	} = useTodoModel();

  useEffect(() => {
    if (data) {
      setTodos(data.slice(0, 10));
    }
  }, [data]);

  const openModal = (type: 'create' | 'edit' | 'delete', item: TodoType | null) => {
    if(item != null) {
      const itemData: TodoType = {
        id: item.id,
        userId: item.userId,
        title: item.title
      }
      setSelected(itemData);
    }

    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  const onSubmit = handleSubmit(async (data) => {
		if(modalType === 'create') {
        handleNewTodo(data);
    }
    if(modalType === 'edit') {
      handleUpdate(data);
    }
    if(modalType === 'delete') {
      handleDelete(data);
    }
	});

  const handleDelete = async (data:TodoType) => {
    try{
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${selected.id}`, {
        method: 'DELETE'
      });

      if(response.ok) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== selected.id));
        closeModal();
      }
      else {
        Alert.alert('Error', `Failed to delete Todo with id: ${selected.id}`);
      }
    } catch(error) {
      Alert.alert('Error', error.message);
    }

  }

  const handleUpdate = async (data: TodoType) => {
    if (selected.id === null) return;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${selected.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          completed: false,
          userId: selected.userId,
        }),
      });
      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(prevTodos =>
          prevTodos.map(todo => (todo.id === selected.id ? updatedTodo : todo))
        );
        closeModal();
      } else {
        Alert.alert('Error', `Failed to update Todo with id: ${selected.id}`);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  const handleNewTodo = async (data: TodoType) => {
    if (!data.title.trim()) {
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
          title: data.title,
          completed: false,
          userId: 1,
        }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos([newTodo, ...todos]);
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
        <Button title='Create' onPress={() => openModal('create', null)} />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={todos}
          renderItem={({item}) => (
            <View style={styles.item}>
                <>
                  <Text style={styles.title}>{item.title}</Text><View>
                    <Button title='Editar' onPress={() => {openModal('edit', item) }}/>
                    <Button title='Apagar' onPress={() => {
                    openModal('delete', item);
                  }} />
                  </View>
                </>

              
              
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
            <TextInput placeholder='New Todo' /*value={newTitle}*/ /*onChangeText={setNewTitle}*/ onChangeText={(e) => field('title').onChange(e)} />
            <Button title='Cancel' onPress={closeModal} />
            <Button title='Create' onPress={() => onSubmit()} />
          </>          
         )}
 
        {modalType === "edit" && (
          <>
             <TextInput /*value={selected.title}*/ /*onChangeText={setEditTitle}*/ onChangeText={(e) => field('title').onChange(e)} />
             <Button title='Cancel' onPress={closeModal} />
             <Button title="Editar" onPress={() => onSubmit()} />
          </>          
         )}

        {modalType === "delete" && (
          <>
             <Text>Quer Apagar o todo: {selected.title}  ?</Text>
             <Button title='Cancel' onPress={closeModal} />
             <Button title='Apagar' onPress={() => onSubmit()} />
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
 