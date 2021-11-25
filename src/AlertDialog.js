import React from "react";
import { Modal, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../functions/GwnuText";
import { GwnuPurple, TextColorWhite } from "../functions/GwnuColor";
import { LoginButton } from './HeaderComponent'
import { RemoveFacility } from "../functions/AdminFirestore";

const slideStyles = StyleSheet.create({
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

const fadeStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    modalView: {
        alignSelf: "stretch",
        margin: 20,
        backgroundColor: "white",
        paddingHorizontal: 35,
        paddingVertical: 15,
        alignItems: "center",
        borderStartWidth: 7,
        borderEndWidth: 7,
        borderColor: 'red',
        borderRadius: 10,
        shadowColor: 'black', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 10, //IOS
        elevation: 5, // Android
    },
    modalText: {
        fontSize: 22,
        margin: 10,
        fontWeight: "bold"
    },
    modalSelectedName: {
        color: 'red'
    },
    buttonView: {
        marginTop: 15,
        flexDirection: 'row',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        shadowColor: 'black', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 5, //IOS
        elevation: 5, // Android
    },
    buttonDelete: {
        backgroundColor: 'red'
    },
    buttonCancel: {
        backgroundColor: 'lightgray'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonTextDelete: {
        color: TextColorWhite
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
                style={[slideStyles.centeredView, { marginBottom: 40 + insets.bottom }]}
                activeOpacity={0}
                onPress={() => setAlertVisible(false)}>

                <View style={slideStyles.modalView}>
                    <Text style={slideStyles.modalText}>로그인 하러가기</Text>
                    <LoginButton onPress={() => {
                        setAlertVisible(false)
                        navigation.navigate("로그인")
                    }} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const DeleteAlert = ({ type, name, alertVisible, setAlertVisible }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={alertVisible}
            onRequestClose={() => setAlertVisible(false)}
        >
            <TouchableOpacity
                style={fadeStyles.centeredView}
                activeOpacity={0}
                onPress={() => setAlertVisible(false)}>

                <View style={fadeStyles.background} />

                <View style={fadeStyles.modalView}>
                    <Text style={[fadeStyles.modalText, fadeStyles.modalSelectedName]}>{`" ${name} "`}</Text>
                    <Text style={fadeStyles.modalText}>정말 삭제하시겠습니까?</Text>

                    <View style={fadeStyles.buttonView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[fadeStyles.button, fadeStyles.buttonDelete]}
                            onPress={() => {
                                console.log("delete")
                                RemoveFacility(type).then(() => { })  // Dangerous
                                setAlertVisible(false)
                            }} >

                            <Text style={[fadeStyles.buttonText, fadeStyles.buttonTextDelete]}>삭제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[fadeStyles.button, fadeStyles.buttonCancel]}
                            onPress={() => setAlertVisible(false)} >

                            <Text style={fadeStyles.buttonText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const DefaultAlert = ({ message, alertVisible, setAlertVisible }) => {
    const insets = useSafeAreaInsets()

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={alertVisible}
            onRequestClose={() => setAlertVisible(false)}
        >
            <TouchableOpacity
                style={[slideStyles.centeredView, { marginBottom: 40 + insets.bottom }]}
                activeOpacity={0}
                onPress={() => setAlertVisible(false)}>

                <View style={slideStyles.modalView}>
                    <Text style={slideStyles.modalText}>{message}</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export {
    LoginAlert,
    DeleteAlert,
    DefaultAlert
}