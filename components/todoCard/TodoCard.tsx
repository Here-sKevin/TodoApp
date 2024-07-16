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
            <TouchableOpacity style={isChecked ? styles.checked : styles.notChecked}>
                <TouchableOpacity style={isChecked ? styles.imageContainerChecked : styles.imageContainerNotchecked} onPress={toggleCheckbox}>
                    <Image style={isChecked ? styles.imageChecked : styles.imageNotChecked} source={require('../../images/checked.png')} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text fontWeight="bold" size="md">{title}</Text>
                </View>
                <View style={{gap: 10, flexDirection:'row'}}>
                    <TouchableOpacity style={{paddingHorizontal:10, paddingVertical:10, borderRadius:100, backgroundColor: '#FFE89E', alignItems:'center'}} onPress={() => {openModal('edit', itemData) }}>
                        <Image source={require('../../images/edit.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius:100, backgroundColor: '#FFC7C7', justifyContent:'center', padding:10}}  onPress={() => {openModal('delete', itemData)}} >
                        <Image source={require('../../images/bin.png')} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TodoCard;