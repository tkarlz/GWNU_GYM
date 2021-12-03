import React, { useState } from "react";
import { Modal, StyleSheet, View, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../functions/GwnuText";
import { GwnuPurple, GwnuYellow, TextColor, TextColorWhite } from "../functions/GwnuColor";
import { LoginButton } from './HeaderComponent'
import { RemoveFacility } from "../functions/AdminFirestore";
import { ReservationCancel, UpdateUserDetailInfo } from "../functions/Firestore";

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
    modalViewLarge: {
        paddingHorizontal: 20,
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
    modalTextSmall: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 10,
        fontWeight: "bold",
        textAlign: "center"
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
    buttonText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    textView: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 5,
    },
    textFieldName: {
        fontSize: 18,
        fontWeight: "bold",
        width: 70,
        padding: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: TextColor,
        paddingVertical: Platform.OS === 'ios' ? 15 : 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    errorText: {
        position: "absolute",
        top: -20,
        alignSelf: "center",
        color: "red",
    },
    borderColorPurple: {
        borderColor: GwnuPurple,
    },
    textColorRed: {
        color: 'red'
    },
    backgroundRed: {
        backgroundColor: 'red'
    },
    backgroundYellow: {
        backgroundColor: GwnuYellow
    },
    backgroundLightgray: {
        backgroundColor: 'lightgray'
    },
    textColorWhite: {
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
                activeOpacity={1}
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
                activeOpacity={1}
                onPress={() => setAlertVisible(false)}>

                <View style={[slideStyles.modalView, slideStyles.modalViewLarge]}>
                    <Text style={slideStyles.modalText}>{message}</Text>
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
                activeOpacity={1}
                onPress={() => setAlertVisible(false)}>

                <View style={fadeStyles.background} />

                <View style={fadeStyles.modalView}>
                    <Text style={[fadeStyles.modalText, fadeStyles.textColorRed]}>{`" ${name} "`}</Text>
                    <Text style={fadeStyles.modalText}>정말 삭제하시겠습니까?</Text>

                    <View style={fadeStyles.buttonView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[fadeStyles.button, fadeStyles.backgroundRed]}
                            onPress={() => {
                                RemoveFacility(type).then(() => { })  // Dangerous
                                setAlertVisible(false)
                            }} >

                            <Text style={[fadeStyles.buttonText, fadeStyles.textColorWhite]}>삭제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[fadeStyles.button, fadeStyles.backgroundLightgray]}
                            onPress={() => setAlertVisible(false)} >

                            <Text style={fadeStyles.buttonText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const CancelAlert = ({ history, day, uid, alertVisible, setAlertVisible }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={alertVisible}
            onRequestClose={() => setAlertVisible(false)}
        >
            <TouchableOpacity
                style={fadeStyles.centeredView}
                activeOpacity={1}
                onPress={() => setAlertVisible(false)}>

                <View style={fadeStyles.background} />

                <View style={fadeStyles.modalView}>
                    <Text style={[fadeStyles.modalText, fadeStyles.textColorRed]}>{`" ${day} "`}</Text>
                    <Text style={[fadeStyles.modalText, fadeStyles.textColorRed]}>{`" ${history?.name} "`}</Text>
                    <Text style={fadeStyles.modalText}>정말 취소하시겠습니까?</Text>

                    <View style={fadeStyles.buttonView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[fadeStyles.button, fadeStyles.backgroundRed]}
                            onPress={() => {
                                ReservationCancel(history.type, history.day, history.time, uid).then(() => { })
                                setAlertVisible(false)
                            }} >

                            <Text style={[fadeStyles.buttonText, fadeStyles.textColorWhite]}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[fadeStyles.button, fadeStyles.backgroundLightgray]}
                            onPress={() => setAlertVisible(false)} >

                            <Text style={fadeStyles.buttonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const InfoInputAlert = ({ uid, alertVisible, setAlertVisible }) => {
    const insets = useSafeAreaInsets()
    
    const [department, setDepartment] = useState("")
    const [studentId, setStudentId] = useState("")
    const [emptyError, setEmptyError] = useState(false)

    const checkText = (setState, text) => {
        setState(text.replace(/\s/g, ""))
    }

    const checkNumber = (setState, text) => {
        setState(text.replace(/\D/g, ""))
    }

    const onPressInputButton = () => {
        if (department && studentId) {
            UpdateUserDetailInfo(uid, department, studentId).then((res) => {
                if (res) {
                    setAlertVisible(false)
                }
            })
        } else {
            setEmptyError(true)
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={alertVisible}
        >
            <TouchableOpacity
                style={fadeStyles.centeredView}
                activeOpacity={1} >

                <View style={fadeStyles.background} />

                <View style={[fadeStyles.modalView, fadeStyles.borderColorPurple]}>
                    <Text style={fadeStyles.modalText}>추가 정보 입력</Text>
                    <Text style={[fadeStyles.modalTextSmall, fadeStyles.textColorRed]}>
                        입력된 정보는 변경할 수 없으니,{'\n'}정확히 입력해 주세요.
                    </Text>

                    <View style={fadeStyles.textView}>
                        <Text style={fadeStyles.textFieldName} >학과</Text>
                        <TextInput
                            style={fadeStyles.textInput}
                            onChangeText={(text) => checkText(setDepartment, text)}
                            value={department}
                            placeholder="ex) 컴퓨터공학과"
                        />
                    </View>
                    <View style={fadeStyles.textView}>
                        <Text style={fadeStyles.textFieldName} >학번</Text>
                        <TextInput
                            style={fadeStyles.textInput}
                            onChangeText={(text) => checkNumber(setStudentId, text)}
                            value={studentId}
                            keyboardType="numeric"
                            placeholder="ex) 20210000"
                        />
                    </View>

                    <View>
                        <Text style={[fadeStyles.errorText, emptyError ? null : { display: "none" }]}>
                            내용을 모두 입력해 주세요.
                        </Text>
                    </View>

                    <View style={fadeStyles.buttonView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[fadeStyles.button, fadeStyles.backgroundYellow]}
                            onPress={onPressInputButton} >

                            <Text style={[fadeStyles.buttonText, fadeStyles.textColorWhite]}>입력</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export {
    LoginAlert,
    DeleteAlert,
    DefaultAlert,
    CancelAlert,
    InfoInputAlert
}