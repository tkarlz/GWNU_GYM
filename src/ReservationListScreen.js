import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor } from '../functions/GwnuColor'

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
    minHeight: 100,
    backgroundColor: LightenColor,
    borderRadius: 5,
    padding: 15,
    overflow: "hidden", // IOS
  },
  listButton: {
    alignSelf: 'stretch',
    borderRadius: 5,
    marginHorizontal: 30,
    marginBottom: 15,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5 // Android
  },
  listButtonText: {
    padding: 20,
    fontWeight: "bold"
  }
})

const ReservationListScreen = ({ navigation }) => {

  const ListView = ({ color, text }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.8}
        style={[styles.listButton, { backgroundColor: color }]}
        onPress={() => navigation.navigate("예약하기")}
        >
        <Text style={styles.listButtonText}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.rootView}>
      <View style={styles.infoView}>
        <Text style={styles.infoViewTitle}>공지사항</Text>
        <Text style={styles.infoViewContent}>
          ・ 추석 체육시설물 휴무 안내{'\n'}
          ・ 배드민턴장 시설 보수 공지
        </Text>
      </View>
      <ListView color={GwnuBlue} text={'체육관'} />
      <ListView color={GwnuPurple} text={'헬스장(체육관)'} />
      <ListView color={GwnuBeige} text={'테니스장'} />
      <ListView color={GwnuYellow} text={'헬스장(기숙사)'} />
      <ListView color={GwnuBlue} text={'배드민턴'} />
    </View>

  );
};

export default ReservationListScreen;
