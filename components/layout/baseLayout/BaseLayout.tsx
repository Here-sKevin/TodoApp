/* eslint-disable prettier/prettier */
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native"
import { styles } from "./BaseLayout.styles";

type Props = {
    children: ReactNode;
}

const BaseLayout = ({children} : Props) => {

    return(
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}


export default BaseLayout;