/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Alert, FlatList, Modal, Text, TextInput, View} from 'react-native';
import { TodoModel, TodoType, useTodoModel } from './interface/TodoModel';
import { Button as ButtonComp } from '../../components/ui/Button'
import { Text as TextComp } from '../../components/ui/Text'
import { styles } from './TodoScreen.styles';
import TodoScreenApi from './TodoScreenApi';
import useAuthentication from '../../shared/authentication/hooks/useAuthentication';
import { useTranslation } from '../../shared/translations/Translations';
import FormControl from '../../components/ui/FormControl';
import BaseLayout from '../../components/layout/baseLayout/BaseLayout';
import TodoCard from '../../components/todoCard/TodoCard';
import { useNavigation } from '@react-navigation/native';

const TodoScreen: React.FC = () => {
  const { T } = useTranslation();
  const [todos, setTodos] = useState<TodoModel[] | []>([]);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  
  const {
		field,
		handleSubmit,
    reset,
    getErrors
	} = useTodoModel();

  const {user} = useAuthentication();

  useEffect(() => {

    const fetchData = async () => {
      const tdata = await TodoScreenApi.getMyTodos(user);
      setTodos(tdata);
      setLoading(false)
    }
    setLoading(true)
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
        let d;
      if(!isChecked)
         d = await TodoScreenApi.getTodos();
      else
         d = await TodoScreenApi.getMyTodos(user);
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
      let d;
      if(!isChecked)
         d = await TodoScreenApi.getTodos();
      else
         d = await TodoScreenApi.getMyTodos(user);
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
      await TodoScreenApi.createTodo(dataItem, user);
      let d;
      if(!isChecked)
         d = await TodoScreenApi.getTodos();
      else
         d = await TodoScreenApi.getMyTodos(user);
      setTodos(d);
      closeModal();

    } catch(error) {
      Alert.alert('Error', error.message);
    }
  }

  const handleCompleted = async (data: TodoModel) => {
    let d;
    await TodoScreenApi.setCompleted(data);
    if(!isChecked)
      d = await TodoScreenApi.getTodos();
   else
      d = await TodoScreenApi.getMyTodos(user);
   setTodos(d);
  }

  if(loading){
    return (
      <View style={[styles.cont, styles.horizontal]}>
          <ActivityIndicator size="large" color='lightgreen' />
      </View>

    ) 
  } 
  /*if(error) return <Text>Error Message: {error.message}</Text>*/
  return (
    <BaseLayout camera={false}>
      <View>
        <View style={styles.row}>
          <View style={styles.buttonContainer}>
            <ButtonComp title='<' variant='outline' size='lg' onPress={() => navigation.navigate('Home')}/>
              <View style={{width:80}} />
              <TextComp size='xl' fontFam='title' fontWeight='bold'>Task List</TextComp>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={todos}
          renderItem={({item}) => (
            <>
              <TodoCard openModal={(type, data) => openModal(type,data)} completed={item.completed} onValueChange={() => handleCompleted(item)} title={item.title} itemData={item} />
            </>
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
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TextComp size='lg'>{T.todo_screen.buttonCreate}</TextComp>
                <ButtonComp variant='outline' shape='circle' title=' X ' onPress={closeModal} />
              </View>
            <FormControl errors={getErrors('title')}>
              <TextInput style={styles.input} placeholder='New Todo' /*value={newTitle}*/ /*onChangeText={setNewTitle}*/ onChangeText={(e) => field('title').onChange(e)} />
            </FormControl>
                
                  <View style={{}}>
                      <ButtonComp variant='gold2' shape='circle' title={T.todo_screen.buttonCreate} onPress={() => onSubmit()} />
                  </View>
            </View>         
          </View>
            
          </>          
         )}
 
        {modalType === "edit" && (
          <>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TextComp size='lg'>{T.todo_screen.buttonEdit}</TextComp>
                <ButtonComp variant='outline' shape='circle' title=' X ' onPress={closeModal} />
            </View>
            <FormControl errors={getErrors('title')}>
              <TextInput style={styles.input} value={field('title').value} /*onChangeText={setEditTitle}*/ onChangeText={(e) => field('title').onChange(e)} />
            </FormControl>
              
                  <View>                     
                      <ButtonComp variant='gold2' shape='circle' title={T.todo_screen.buttonEdit} onPress={() => onSubmit()} />
                  </View>
            </View>         
          </View>
            
          </>    
         )}

        {modalType === "delete" && (
          <>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TextComp size='lg'>{T.todo_screen.buttonDelete}</TextComp>
                <ButtonComp variant='outline' shape='circle' title=' X ' onPress={closeModal} />
              </View>
              <Text style={{padding:20}}>{T.todo_screen.message_delete}{field('title').value}  ?</Text>
              
                    <View>
                        <ButtonComp variant='gold2' shape='circle' title={T.todo_screen.buttonDelete} onPress={() => onSubmit()} />
                    </View>
              </View>         
            </View> 
          </>      
         )}
      </Modal>
      </View>
      <View style={styles.stickyFooter}>
        <ButtonComp variant='gold' shape='circle' size='xl' title={T.todo_screen.buttonCreate} onPress={() => openModal('create', null)} />
      </View>
    </BaseLayout>
  );
};

export default TodoScreen;
 