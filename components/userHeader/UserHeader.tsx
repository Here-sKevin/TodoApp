/* eslint-disable prettier/prettier */
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./UserHeader.styles";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import useAuthentication from "../../shared/authentication/hooks/useAuthentication";

const UserHeader = ({username, onDisplayNotification}) => {
    const {logout} = useAuthentication();
    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap:20}}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../images/user.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <View>
                    <Text fontFam="title" size="xl" fontWeight="bold">{username}</Text>

                </View>
                
            </View>
            
            <TouchableOpacity style={styles.buttonContainer} onPress={logout}>
              <Image
                source={require('../../images/logout.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
        </View>
    )
}

export default UserHeader;