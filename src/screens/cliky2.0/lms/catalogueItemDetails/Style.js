
import { StyleSheet } from "react-native";
import {  Dimension } from '../../../../enums';

const styles = StyleSheet.create({
    
    container: {
        height:Dimension.height,
        backgroundColor:"#fff",
        flex:1
    },
    advisorySec: {
        backgroundColor: "#172834",
        borderRadius: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        paddingVertical: 15,
        marginHorizontal:10
    }

})

export default styles;