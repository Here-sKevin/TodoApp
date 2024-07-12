/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./TodoCard.styles";
import { Button as ButtonComp } from '../../components/ui/Button'
import { useTranslation } from "../../shared/translations/Translations";
import { Text } from "../ui/Text";
import { Checkbox } from "../ui/Checkbox";


const TodoCard = ({completed, onValueChange, title, itemData, openModal}) => {
    const { T } = useTranslation();
    const [collapsed, setCollapsed] = useState(true);
    const [isChecked, setIsChecked] = useState(completed);

    const toggleCheckbox = () => {
        onValueChange(itemData)
        setIsChecked((previousState) => !previousState);
    } 

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
      };

    return(
        <View>
            <TouchableOpacity style={collapsed ? styles.container : styles.containerCollapse}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../images/to-do-list.png')} />
                </View>
                <View style={styles.textContainer}>
                    <Text fontWeight="bold" size="md">{title}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Checkbox label=" " onValueChange={toggleCheckbox} value={isChecked} />
                </View>
                <View style={{gap: 10, flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => {openModal('edit', itemData) }}>
                        <Image source={require('../../images/edit.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {openModal('delete', itemData)}} >
                        <Image source={require('../../images/delete.png')} />
                    </TouchableOpacity>

                </View>

            </TouchableOpacity>
            {!collapsed && (
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <ButtonComp title={T.todo_screen.buttonEdit} size='sm' onPress={() => {openModal('edit', itemData) }}/>
                    </View>
                    <View style={styles.button}>
                        <ButtonComp variant='destructive' title={T.todo_screen.buttonDelete} size='sm' onPress={() => {
                            openModal('delete', itemData);
                        }} />
                    </View>
                </View>
            )}
            
        </View>
    )
}

export default TodoCard;