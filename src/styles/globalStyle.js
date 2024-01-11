import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor : '#e1e1e1',
        justifyContent : "center",
        alignItems : "center"
    },
    
    formInput : {
        width : 250,
        borderColor : "#2b2d42",
        padding: 15,
        borderWidth: 1,
        marginHorizontal: 40,
        marginVertical: 10,
        color: "#2b2d42",
    },
    
    authLogo : {
        width : 150,
        height : 150,
        marginBottom : 50,
    }, 
   
    screenTitle : {
        color: '#2b2d42',
        fontSize: 30,
        marginTop: 50,
        fontWeight: '600',
    }
})
