/* eslint-disable prettier/prettier */
import React from "react";
import { FlatList, Image, View } from "react-native";
import { styles } from "./PhotoInfoCard.styles";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

type Props = {
    photo: string[]
    goPhoto: () => void
}

const PhotoInfoCard = ({photo, goPhoto}: Props) => {
    console.log('Photos: ', photo)
    const renderItem = ({ item, index }) => {
        const jpg = item.split('/');
        let bgc;
        if(index % 2 === 0)
            bgc = '#FFF1FC';
        else
            bgc = '#E8FFEC'
        return(
            <>
                <View style={[styles.itemContainer, {backgroundColor: bgc}]}>
                    <Image source={{ uri: item }} style={styles.image} />
                    <Text size="sm" fontWeight="bold">{jpg[jpg.length-1]}</Text>
                </View>
                <View style={{height:5}} />
            </>
            
        )  
    };
    return(
        <View style={{width:'100%', alignItems:'center'}}>
            <View style={styles.titleWrapper}>
                <Text fontFam="title" size="xl" fontWeight="bold">Photos</Text>
                <Button variant="ghost"  title="See all" onPress={() => goPhoto()} />

            </View>
            <View style={styles.container}>
                <FlatList 
                    data={photo}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

export default PhotoInfoCard;