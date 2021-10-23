import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Logininit, LoginButton } from '../fuctions/GoogleLogin'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as root from '../rootValue'

const styles = StyleSheet.create({
  rootView: {
    flex: 1, 
    alignItems: "center",
  },
  infoView: {
    backgroundColor: root.GwnuBeige,
    borderRadius: 5,
    marginHorizontal: 30, 
    marginVertical: 50,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 1, //IOS
    elevation: 8, // Android
  },
  infoViewTitle: {
    padding: 15, 
    color: root.TextColor,
    fontSize: 20, 
    fontWeight: "bold"
  },
  infoViewContent: {
    backgroundColor: root.LightenColor, 
    borderBottomLeftRadius: 5, 
    borderBottomRightRadius: 5, 
    padding: 15, 
    color: root.TextColor,
    fontSize: 16
  },
  infoIcon: {
    fontSize: 22, 
    fontWeight: "bold"
  },
  loginView: {
    backgroundColor: root.GwnuYellow, 
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 1, //IOS
    elevation: 8, // Android
  },
  loginViewText: {
    paddingHorizontal: 10, 
    color: 'white',
    fontSize: 18, 
    fontWeight: "bold"
  }
})

const ReservationListScreen = () => {

  useEffect(() => {
    Logininit()
  }, [])

  return (
    <View style={styles.rootView}>
        <View style={styles.infoView}>
          <Text style={styles.infoViewTitle}>
            <Ionicons name="information-circle-outline" style={styles.infoIcon}/>
            {" 사용안내"}
          </Text>
          <Text style={styles.infoViewContent}>
            ● 예약은 로그인 후 이용할 수 있습니다.{'\n'}
            ● 예약 후 불참 시 페널티가 부여될 수 있습니다.{'\n'}
            ● 이름, 학과, 학번 등의 정보가 부정확할 경우 계정이 정지될 수 있습니다.
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

export default ReservationListScreen;
