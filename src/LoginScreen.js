import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../functions/GwnuText'
import { LoginConfigure, GetUserInfo, LoginButton } from '../functions/GoogleLogin'
import { GetInfo } from '../functions/Firestore'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GwnuBeige, GwnuYellow, LightenColor } from '../functions/GwnuColor'

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: "center",
  },
  infoView: {
    alignSelf: 'stretch',
    backgroundColor: GwnuBeige,
    borderRadius: 5,
    marginHorizontal: 30,
    marginVertical: 40,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
  },
  infoViewTitle: {
    padding: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  infoViewContent: {
    minHeight: 100,
    backgroundColor: LightenColor,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 25 : 15,
    overflow: "hidden", // IOS
  },
  infoIcon: {
    fontSize: 22,
    fontWeight: "bold"
  },
  loginView: {
    backgroundColor: GwnuYellow,
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
  },
  loginViewText: {
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: "bold"
  }
})

const LoginScreen = ({ navigation }) => {
  const user = GetUserInfo()
  const usage = GetInfo('usage')

  useEffect(() => {
    LoginConfigure()
  }, [])

  useEffect(() => {
    if (user) navigation.goBack()
  }, [user])

  return (
    <View style={styles.rootView}>
      <View style={styles.infoView}>
        <Text style={styles.infoViewTitle}>
          <Ionicons name="information-circle-outline" style={styles.infoIcon} />
          {" 사용안내"}
        </Text>
        <Text style={styles.infoViewContent}>
          {usage && Object.values(usage).map((el, i) => {
            return `${i ? '\n' : ''}・ ${el}`
          })}
        </Text>
      </View>

      <View style={styles.loginView}>
        <Text style={styles.loginViewText}>
          구글 계정으로 로그인 하기
        </Text>
        <LoginButton />
      </View>
    </View>
  );
};

export default LoginScreen;
