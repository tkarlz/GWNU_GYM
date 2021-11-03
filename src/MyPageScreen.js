import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../functions/GwnuText'
import { LoginConfigure, LoginButton } from '../functions/GoogleLogin'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor } from '../functions/GwnuColor'

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: "center",
  },
  infoView: {
    backgroundColor: GwnuBeige,
    borderRadius: 5,
    marginHorizontal: 30,
    marginVertical: 50,
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
    backgroundColor: LightenColor,
    borderRadius: 5,
    padding: 15,
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
  },
  contentviewBlue: {
    backgroundColor: GwnuBlue,
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
  },
  contentviewYellow: {
    backgroundColor: GwnuYellow,
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
  },
  contentviewBeige: {
    backgroundColor: GwnuBeige,
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
  },
  contentviewPurple: {
    backgroundColor: GwnuPurple,
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android

  },
  listView: {
    marginHorizontal: 30,
    marginBottom: 15,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5

  }
})

const MyPageScreen = () => {
  return (
    <View>
      <View style={styles.contentviewBeige}>
        <Text >마이페이지</Text>
      </View>
      <View style={styles.infoViewContent}>
        <Text>회원 정보{'\n'}{'\n'}{'\n'}로그인한 정보 불러오기</Text>
      </View>
    </View>

  );
};

export default MyPageScreen;
