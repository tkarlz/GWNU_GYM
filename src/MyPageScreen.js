import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GetUserInfo } from '../functions/GoogleLogin'
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor, TextColorWhite } from '../functions/GwnuColor'
import { GetHistory } from '../functions/Firestore';
import { CancelAlert } from './AlertDialog';

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  infoView: {
    alignSelf: 'stretch',
    backgroundColor: GwnuBeige,
    borderRadius: 5,
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 10,
  },
  infoViewTitle: {
    padding: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  infoViewContent: {
    fontSize: 18,
    minHeight: 75,
    backgroundColor: LightenColor,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 25 : 15,
    overflow: "hidden", // IOS
  },
  reservationView: {
    alignSelf: 'stretch',
    backgroundColor: GwnuBlue,
    borderRadius: 5,
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  reservationViewTitle: {
    padding: 15,
    color: TextColorWhite,
    fontSize: 20,
    fontWeight: "bold",
  },
  reservationViewContent: {
    minHeight: 75,
    marginVertical: 1,
    backgroundColor: LightenColor,
    borderRadius: 5,
    padding: 15,
    overflow: "hidden", // IOS
  },
  historyViewInnerView1: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyViewInnerView2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  historyTextName: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  historyTextDay: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  historyTextTime: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  reservationCancelButton: {
    backgroundColor: GwnuPurple,
    borderRadius: 5,
    padding: 10,
  },
  reservationCancelText: {
    color: TextColorWhite,
    fontWeight: 'bold',
  },
  reservationDisableButton: {
    backgroundColor: GwnuYellow,
    borderRadius: 5,
    padding: 10,
  },
  reservationDisableText: {
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
  }
})

const MyPageScreen = () => {
  const user = GetUserInfo()
  const historys = GetHistory(user?.uid)

  const [selectedHistory, setSelectedHistory] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [alertVisible, setAlertVisible] = useState(false)

  const userData = [{ key: '이름', value: user?.displayName }, { key: '이메일', value: user?.email }]

  const HistoryView = ({ history }) => {
    const date = new Date()
    const currentTime = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}` +
      `${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}00`
    date.setHours(date.getHours() + 2)
    const deadline = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}` +
      `${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}00`

    const startTime = `${history.time[0].slice(0, 2)}:${history.time[0].slice(2, 4)}`
    const endHours = (parseInt(history.time[history.time.length - 1].slice(0, 2)) + 1).toString().padStart(2, '0')
    const endTime = `${endHours}:${history.time[0].slice(2, 4)}`
    const timeRange = `${startTime} ~ ${endTime}`
    const historyDay = `${history.day.slice(0, 4)}년 ${history.day.slice(4, 6)}월 ${history.day.slice(6, 8)}일`

    return (
      <View style={styles.reservationViewContent}>
        <View style={styles.historyViewInnerView1}>
          <Text style={styles.historyTextName}>
            {history.name}
          </Text>
          <Text style={styles.historyTextDay}>
            {historyDay}
          </Text>
        </View>

        <View style={styles.historyViewInnerView2}>
          <Text style={styles.historyTextTime}>
            {`예약 시간 : ${timeRange}`}
          </Text>
          {currentTime <= `${history.day}${endHours}00` ?
            <TouchableOpacity
              disabled={deadline >= history.day + history.time[0] ? true : false}
              activeOpacity={0.8}
              style={[styles.reservationCancelButton, styles.shadow]}
              onPress={() => {
                setSelectedHistory(history)
                setSelectedDay(historyDay)
                if (currentTime >= history.day + history.time[0]) return
                setAlertVisible(true)
              }}>

              <Text style={styles.reservationCancelText}>
                {deadline >= history.day + history.time[0] ? "예약 확정" : "예약 취소"}
              </Text>
            </TouchableOpacity> :
            <TouchableOpacity
              disabled
              style={[styles.reservationDisableButton, styles.shadow]} >

              <Text style={styles.reservationDisableText}>
                이용 완료
              </Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.rootView}>
      <View style={[styles.infoView, styles.shadow]}>
        <Text style={styles.infoViewTitle}>내 정보</Text>
        <Text style={styles.infoViewContent}>
          {userData?.map((el, i) => {
            return `${i ? '\n' : ''}${el.key} : ${el.value}`
          })}
        </Text>
      </View>

      <View style={{ flex: 1, height: 1, backgroundColor: 'lightgray', margin: 20 }} />

      <View style={[styles.reservationView, styles.shadow]}>
        <Text style={styles.reservationViewTitle}>예약 내역</Text>
        {historys?.map((el, i) => {
          return <HistoryView key={i} history={el} />
        })}
      </View>

      {user && <CancelAlert
        history={selectedHistory}
        day={selectedDay}
        uid={user?.uid}
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
      />}
    </ScrollView>
  );
};

export default MyPageScreen;
