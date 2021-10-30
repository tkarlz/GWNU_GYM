import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../fuctions/GwnuText'
import { LoginConfigure, LoginButton } from '../fuctions/GoogleLogin'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor } from '../fuctions/GwnuColor'

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
const ReservationListScreen = () => {
  return (
    <View>
    <View style={styles.infoView}>
        <Text style={styles.infoViewTitle}>공지사항</Text>
        <Text style={styles.infoViewContent}>
        ・ 추석 체육시설물 휴무 안내{'\n'}
       ・ 배드민턴장 시설 보수 공지
       </Text>
    </View>
    <View style={styles.listView}>
      <Text style={styles.contentviewBlue}>
        체육관                                                     6  /   24
        </Text>
      </View>
      <View style={styles.listView}>
      <Text style={styles.contentviewPurple}>
        헬스장(체육관)                                       0  /   30
        </Text>
        </View>
        <View style={styles.listView}>
      <Text style={styles.contentviewBeige}>
        테니스장                                                  0  /   8
        </Text>
      </View>
          <View style={styles.listView}>
      <Text style={styles.contentviewYellow}>
          헬스장(기숙사)                                      12  /   40
        </Text>
      </View>
      <View style={styles.listView}>
      <Text style={styles.contentviewBlue}>
          배드민턴                                                 4  /   8
        </Text>
      </View>
    </View>

  );
};

export default ReservationListScreen;
