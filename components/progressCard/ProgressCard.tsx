/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./ProgressCard.styles";
import * as Progress from 'react-native-progress';
import TodoScreenApi from "../../pages/todo/TodoScreenApi";
import useAuthentication from "../../shared/authentication/hooks/useAuthentication";


const ProgressCard = ({progress, todosCompleted, todos}) => {

    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Progress.Pie
                    style={styles.progress}
                    progress={progress}
                    size={150}
                    borderWidth={3}
                    indeterminate={false}
                    color={'rgba(0, 0, 0, 1)'}
                />
            </View>
            <View style={styles.textContainer}>
                <Text>You have {todosCompleted.length} todos completed out of {todos.length} todos</Text>
            </View>
        </View>
    )
}

export default ProgressCard;