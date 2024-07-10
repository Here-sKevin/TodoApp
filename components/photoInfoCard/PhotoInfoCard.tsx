/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import TodoScreenApi from "../../pages/todo/TodoScreenApi";
import useAuthentication from "../../shared/authentication/hooks/useAuthentication";
import { styles } from "./PhotoInfoCard.styles";
import RNFS from 'react-native-fs';


const PhotoInfoCard = ({photo}) => {

    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../images/photo-camera.png')} />
            </View>
            <View style={styles.textContainer}>
                <Text>You have taken {photo} photos</Text>
            </View>
        </View>
    )
}

export default PhotoInfoCard;