/* eslint-disable prettier/prettier */
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native"
import { styles } from "./BaseLayout.styles";

type Props = {
    children: ReactNode;
    camera: boolean
}

const BaseLayout = ({children, camera} : Props) => {

    return(
        <SafeAreaView style={camera ? styles.containerCamera : styles.container}>
            {children}
        </SafeAreaView>
    )
}


export default BaseLayout;