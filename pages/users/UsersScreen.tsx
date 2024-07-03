/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { UserType } from "./interface/UsersModel";
import UsersScreenApi from "./UsersScreenApi";
import { styles } from "./UsersScreen.styles";



const UsersScreen: React.FC = () => {
    const [users, setUsers] = useState<UserType[] | []>([]);

    useEffect(() => {
        
        const fetchData = async () => {
            const udata = await UsersScreenApi.getUsers();
            console.log('Users: ', udata)
            setUsers(udata);
        }
        fetchData();
        
    },[])

    return (
        <FlatList
          data={users}
          renderItem={({item}) => (
            <View style={styles.item}>
                <Text>{item.username}</Text>
            </View>
          )}          
        />

    )
};

export default UsersScreen;
