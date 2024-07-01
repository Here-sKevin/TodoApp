/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Alert, Button, FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import useFetch from '../shared/hooks/useFetch';
import { TodoType, useTodoModel } from '../models/TodoModel';
import { Button as ButtonComp } from '../components/ui/Button'
import { Text as TextComp } from '../components/ui/Text'

const TodoScreen: React.FC = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const[selected, setSelected] = useState<TodoType | null>(null);

  const {data, loading, error} = useFetch<TodoType[]>('https://jsonplaceholder.typicode.com/todos');

  const {
		field,
		handleSubmit,
    reset
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
      //setSelected(itemData);
      reset(item);
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

  if(loading){
    return(
      <>
      <View>
        <ActivityIndicator style={{alignItems: "center", justifyContent: "center"}} size="large" />
      </View>
      </>         
    ) 
  } 
  if(error) return <Text>Error Message: {error.message}</Text>
  return (
    <>
      <View>
                  <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                      <ButtonComp
                        title="Go to Home"
                        onPress={() => navigation.navigate('Home')}
                      />
                    </View>
                    <View style={styles.buttonContainer}>
                      <ButtonComp title='Create Todo' onPress={() => openModal('create', null)} />
                    </View>
                  </View>
        
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={todos}
          renderItem={({item}) => (
            <View style={styles.item}>
                <>
                  <TextComp style={styles.title} size='lg'>{item.title}</TextComp>
                  <View>
                  <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                      <ButtonComp title='Editar' size='sm' variant='outline' onPress={() => {openModal('edit', item) }}/>
                    </View>
                    <View style={styles.buttonContainer}>
                      <ButtonComp title='Apagar' size='sm' variant='outline' onPress={() => {
                        openModal('delete', item);
                      }} />
                    </View>
                  </View>
                    
                    
                  </View>
                </>
            </View>
          )}          
        />

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
         {modalType === "create" && (
          <>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <TextInput style={styles.input} placeholder='New Todo' /*value={newTitle}*/ /*onChangeText={setNewTitle}*/ onChangeText={(e) => field('title').onChange(e)} />
                  <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                      <ButtonComp title='Cancel' onPress={closeModal} />
                    </View>
                    <View style={styles.buttonContainer}>
                      <ButtonComp title='Create' onPress={() => onSubmit()} />
                    </View>
                  </View>
            </View>         
          </View>
            
          </>          
         )}
 
        {modalType === "edit" && (
          <>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput style={styles.input} value={field('title').value} /*onChangeText={setEditTitle}*/ onChangeText={(e) => field('title').onChange(e)} />
                  <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                      <ButtonComp title='Cancel' onPress={closeModal} />
                    </View>
                    <View style={styles.buttonContainer}>
                      <ButtonComp title="Editar" onPress={() => onSubmit()} />
                    </View>
                  </View>
            </View>         
          </View>
            
          </>    
         )}

        {modalType === "delete" && (
          <>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
              <Text>Quer Apagar o todo: {selected.title}  ?</Text>
                    <View style={styles.row}>
                      <View style={styles.buttonContainer}>
                        <ButtonComp title='Cancel' onPress={closeModal} />
                      </View>
                      <View style={styles.buttonContainer}>
                      <ButtonComp title='Apagar' onPress={() => onSubmit()} />
                      </View>
                    </View>
              </View>         
            </View> 
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
    backgroundColor: 'transparent',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgrey'
  },
  title: {
    fontSize: 20,
    display: 'flex', 
    textAlign: 'center'
  },
  button: {
    width: '50%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width:300
  },
});

export default TodoScreen;
 