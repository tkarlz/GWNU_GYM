import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import { SignOut } from '../functions/GoogleLogin'
import Text from '../functions/GwnuText'
import LogoSvg from '../assets/logo.svg'
import { GwnuYellow, TextColorWhite } from '../functions/GwnuColor'

const styles = StyleSheet.create({
  logoTitle: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  logoTitleText: {
    marginStart: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  loginButton: {
    backgroundColor: GwnuYellow,
    borderRadius: 5,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
  },
  loginButtonText: {
    color: TextColorWhite,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  userNameText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

const LogoTitle = () => {
  return (
    <View style={styles.logoTitle}>
      <WithLocalSvg width={30} height={30} asset={LogoSvg} />
      <Text style={styles.logoTitleText}>
        체육 시설물 통합 예약
      </Text>
    </View>
  )
}

const LoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.loginButton}
      onPress={onPress}
    >
      <Text style={styles.loginButtonText}>로그인</Text>
    </TouchableOpacity>
  )
}

const UserName = ({ name }) => {
  return (  // TouchableOpacity for Testing..
    <View>
      <TouchableOpacity onPress={() => SignOut()}>
        <Text style={styles.userNameText}>{`${name.slice(0, 4)} 님`}</Text>
      </TouchableOpacity>
    </View>
  )
}

export {
  LogoTitle,
  LoginButton,
  UserName
};