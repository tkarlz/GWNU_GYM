import React from "react";
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "./GwnuText";
import { GwnuPurple } from "./GwnuColor";
import { LoginButton } from '../src/HeaderComponent'

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    modalView: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",
        margin: 20,
        backgroundColor: "white",
        paddingHorizontal: 35,
        paddingVertical: 15,
        alignItems: "center",
        borderStartWidth: 7,
        borderEndWidth: 7,
        borderBottomWidth: 1,
        borderColor: GwnuPurple,
        borderRadius: 10,
        shadowColor: 'black', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 10, //IOS
        elevation: 5, // Android
    },
    modalText: {
        fontSize: 20,
        margin: 10,
        fontWeight: "bold"
    }
});


const LoginAlert = ({ alertVisible, setAlertVisible, navigation }) => {
    const insets = useSafeAreaInsets()

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={alertVisible}
            onRequestClose={() => setAlertVisible(false)}
        >
            <TouchableOpacity 
                style={[styles.centeredView, { marginBottom: 40 + insets.bottom}]} 
                activeOpacity={0}
                onPress={() => setAlertVisible(false)}>

                <View style={styles.modalView}>
                    <Text style={styles.modalText}>로그인 하러가기</Text>
                    <LoginButton onPress={() => {
                        setAlertVisible(false)
                        navigation.navigate("로그인")
                    }}/>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export {
    LoginAlert
}