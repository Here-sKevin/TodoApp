/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Alert, FlatList, Modal, SafeAreaView, Text, TextInput, View} from 'react-native';
//import useFetch from '../shared/hooks/useFetch';
import { TodoModel, TodoType, useTodoModel } from './interface/TodoModel';
import { Button as ButtonComp } from '../../components/ui/Button'
import { Text as TextComp } from '../../components/ui/Text'
import { styles } from './TodoScreen.styles';
import TodoScreenApi from './TodoScreenApi';

const TodoScreen: React.FC = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState<TodoModel[] | []>([]);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  //const {data, loading, error} = useFetch<TodoType[]>('https://jsonplaceholder.typicode.com/todos');
 
  

  const {
		field,
		handleSubmit,
    reset
	} = useTodoModel();

  useEffect(() => {

    const fetchData = async () => {
      const tdata = await TodoScreenApi.getTodos();
      console.log('Data TODOS: ', tdata)
      setTodos(tdata);
    }
    fetchData();

  }, []);

  const openModal = (type: 'create' | 'edit' | 'delete', item: TodoType | null) => {
    if(item != null) {
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

  const handleDelete = async (dataItem:TodoModel) => {
    try{
        await TodoScreenApi.deleteTodo(dataItem);
        const d = await TodoScreenApi.getTodos();
        setTodos(d);
        closeModal();
    } catch(error) {
      Alert.alert('Error', error.message);
    }

  }

  const handleUpdate = async (dataItem: TodoModel) => {
    if (dataItem.id === null) return;

    try {
      await TodoScreenApi.updateTodo(dataItem);
      const d = await TodoScreenApi.getTodos();
      console.log('Data TODOS: ', d)
      setTodos(d);
      closeModal();    
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  const handleNewTodo = async (dataItem: TodoModel) => {
    if (!dataItem.title.trim()) {
      Alert.alert('Error', 'Title cannot be empty');
      return;
    }
    try {
      await TodoScreenApi.createTodo(dataItem);
      const d = await TodoScreenApi.getTodos();
      setTodos(d);
      closeModal();

    } catch(error) {
      Alert.alert('Error', error.message);
    }
  }

  /*if(loading){
    return(
      <>
      <View>
        <ActivityIndicator style={{alignItems: "center", justifyContent: "center"}} size="large" />
      </View>
      </>         
    ) 
  } 
  if(error) return <Text>Error Message: {error.message}</Text>*/
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
              <Text>Quer Apagar o todo: {field('title').value}  ?</Text>
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

export default TodoScreen;
 