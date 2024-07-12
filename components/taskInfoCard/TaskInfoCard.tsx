/* eslint-disable prettier/prettier */
import React from "react";
import { Image, View } from "react-native";
import { styles } from "./TaskInfoCard.styles";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import useAuthentication from "../../shared/authentication/hooks/useAuthentication";

type Props = {
    todos: Object[]
    goTodo: () => void
}

const TaskInfoCard = ({todos, goTodo}:Props) => {
    const {user} = useAuthentication()
    if(todos.length > 0) {
        return(
            <View>
                <View style={styles.titleWrapper}>
                    <Text fontFam="title" size="xl" fontWeight="bold">Last Task Created</Text>
                    <Button variant="ghost" size="md"  title="See all" onPress={() => goTodo()} />
                </View>
                <View style={styles.container}>
                    <View style={{padding:15, backgroundColor: '#E6FEFF', width:'16%', borderRadius: 20}}>
                        <Image source={require('../../images/to-do-list.png')} />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{paddingVertical:20}}>
                            <Text fontFam="title" fontWeight="bold" size="xl">{todos[todos.length-1].title}</Text>
                            <Text fontFam="description" size="md">{todos[todos.length-1].completed ? 'Task completed' : 'Task not completed'}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', paddingTop:20, paddingHorizontal: 130, paddingLeft: 160}}>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Image source={require('../../images/user.png')} />
                                <Text size="sm" fontWeight="bold">{user.username}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>           
        )
    }
    
}

export default TaskInfoCard;