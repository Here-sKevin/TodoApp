/* eslint-disable prettier/prettier */
import React, { ReactNode } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

type Props = {
    children: ReactNode
}

const ButtonContainer = ({children}:Props) => {

    return(
        <ScrollView horizontal>
            <View style={styles.container}>
                {children}
            </View>  
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between', 
        flex: 1, 
        padding: 5,
        borderRadius: 100,
        backgroundColor: 'white',
        flexDirection: 'row',
        width:'100%',
        height: 400
    }
})

export default ButtonContainer;