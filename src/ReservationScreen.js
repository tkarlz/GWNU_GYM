import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor, TextColorWhite } from '../functions/GwnuColor'
import { ReservationInquiry, ReservationRegister } from '../functions/Firestore';
import { GetUserInfo } from '../functions/GoogleLogin'
import { DefaultAlert, LoginAlert } from './AlertDialog';

const styles = StyleSheet.create({
  rootView: {
    flex: 1
  },
  infoView: {
    alignSelf: 'stretch',
    backgroundColor: GwnuBeige,
    borderRadius: 5,
    marginHorizontal: 30,
    marginVertical: 30,
  },
  infoViewTitle: {
    padding: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  infoViewContent: {
    backgroundColor: LightenColor,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 5,
    overflow: "hidden", // IOS
  },
  mainView: {
    alignSelf: 'stretch',
    backgroundColor: GwnuBlue,
    borderRadius: 5,
    marginHorizontal: 30,
    marginBottom: 40,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  mainViewContent: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  dateText: {
    flex: 1,
    color: TextColorWhite,
    fontSize: 22,
    fontWeight: "bold",
  },
  dateButton: {
    backgroundColor: GwnuPurple,
    borderRadius: 5,
    padding: 10,
  },
  dateButtonText: {
    color: TextColorWhite,
    fontWeight: "bold",
  },
  listView: {
    alignSelf: 'stretch',
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LightenColor,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    marginVertical: 1,
  },
  listViewText: {
    flex: 1,
    fontSize: 18,
  },
  selectButton: {
    backgroundColor: GwnuYellow,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  selectButtonText: {
    fontWeight: "bold"
  },
  ReservationButton: {
    backgroundColor: GwnuPurple,
    alignItems: 'center',
    padding: 10,
    marginVertical: 1,
    borderRadius: 5,
  },
  ReservationButtonText: {
    color: TextColorWhite,
    fontSize: 20,
    fontWeight: "bold"
  },
  shadow: {
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
  }
})

const ReservationScreen = ({ route, navigation }) => {
  const { closing, info, location, maximum, name, opening, type } = route.params.info
  const user = GetUserInfo()

  const [date, setDate] = useState(new Date())
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(null)
  const [timeRange, setTimeRange] = useState([])
  const [selectButton, setSelectButton] = useState([]);

  const [loginAlertVisible, setLoginAlertVisible] = useState(false);
  const [message, setMessage] = useState("")
  const [messageAlertVisible, setMessageAlertVisible] = useState(false)

  const reservation = ReservationInquiry(type, currentTime?.slice())

  const maximumDate = new Date()
  maximumDate.setMonth(maximumDate.getMonth() + 1)

  const ListView = ({ time, idx }) => {
    return (
      <View style={styles.listView}>
        <Text style={styles.listViewText}>
          {time[0]} ~ {time[1]}{'\n'}
          ?????????????????? : {time[2]}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={time[2] <= 0 ? true : false}
          style={[styles.selectButton, styles.shadow]}
          onPress={() => {
            const arr = selectButton.slice()
            arr[idx] = !selectButton[idx]
            setSelectButton(arr)
          }} >

          <Text style={styles.selectButtonText}>{selectButton[idx] ? '??????' : '??????'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    setCurrentTime(`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`)
    setSelectButton([])
  }, [date])

  useEffect(() => {
    const openTime = parseInt(opening)
    const closeTime = parseInt(closing)
    const arr = Array.from({ length: closeTime - openTime }, (v, i) => {
      return [(openTime + i).toString().padStart(2, '0') + ":00", (openTime + i + 1).toString().padStart(2, '0') + ":00", maximum]
    })
    reservation?.forEach((el) => {
      const time = parseInt(el.time) / 100
      try {
        arr[time - openTime][2] -= el.num
      } catch { }
    })
    setTimeRange(arr)
  }, [reservation])

  return (
    <ScrollView style={styles.rootView}>
      <View style={[styles.infoView, styles.shadow]}>
        <Text style={styles.infoViewTitle}>{name}</Text>
        <Text style={styles.infoViewContent}>
          ?????? ???????????? : {maximum} {'\n'}
          ???????????? : {opening} ~ {closing} {'\n'}
          ?????? : {location} {'\n'}
          ?????? : {info}
        </Text>
      </View>

      <View style={styles.mainView}>
        <View style={styles.mainViewContent}>
          <Text style={styles.dateText}>
            {currentTime?.slice(0, 4)}??? {(currentTime?.slice(4, 6))}??? {currentTime?.slice(6, 8)}???
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.dateButton, styles.shadow]}
            onPress={() => setDatePickerOpen(true)}>

            <Text style={styles.dateButtonText}>?????? ??????</Text>
          </TouchableOpacity>
        </View>

        {timeRange?.map((time, i) => {
          return <ListView key={i} time={time} idx={i} />
        })}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.ReservationButton, styles.shadow]}
          onPress={user ? () => {
            if (selectButton.every(el => !el)) return
            const selectTime = []
            selectButton.forEach((el, i) => {
              if (el) selectTime.push(timeRange[i][0].replace(":", ""))
            })

            return (
              Alert.alert(
                "?????? ????????? ?????? ???????????????????",
                `${name} ${currentTime} ${selectTime}`,
                [{
                  text: "??????",
                  onPress: () => {
                    ReservationRegister(type, currentTime, selectTime, user?.uid).then((res) => {
                      if (res) setMessage("????????? ?????????????????????.")
                      else setMessage("????????? ?????????????????????.")
                      setMessageAlertVisible(true)
                    })
                    setSelectButton([])
                  }
                },
                {
                  text: "?????? ??????",
                  onPress: () => setSelectButton([]),
                  style: "cancel",
                }]
              )
            )
          } : () => setLoginAlertVisible(true)}>

          <Text style={[styles.ReservationButtonText, styles.shadow]}>??????</Text>
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        mode="date"
        open={datePickerOpen}
        date={date}
        minimumDate={new Date()}
        maximumDate={maximumDate}
        title={"?????? ??????"}
        confirmText="??????"
        cancelText="??????"
        onConfirm={(date) => {
          setDatePickerOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setDatePickerOpen(false)
        }}
      />

      <LoginAlert alertVisible={loginAlertVisible} setAlertVisible={setLoginAlertVisible} navigation={navigation} />
      <DefaultAlert message={message} alertVisible={messageAlertVisible} setAlertVisible={setMessageAlertVisible} />
    </ScrollView >
  );
};

export default ReservationScreen;