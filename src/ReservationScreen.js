import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuYellow, LightenColor } from '../functions/GwnuColor'
import { ReservationInquiry, ReservationRegister } from '../functions/Firestore';
import { GetUserInfo } from '../functions/GoogleLogin'

const styles = StyleSheet.create({
  rootView: {
    flex: 1
  },
  infoView: {
    alignSelf: 'stretch',
    backgroundColor: GwnuBeige,
    borderRadius: 5,
    marginHorizontal: 30,
    marginVertical: 15,
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
    padding: 5,
    overflow: "hidden", // IOS
  },
  ReservationButton: {
    backgroundColor: GwnuYellow,
    alignItems: 'center',
    width: 200,
    borderRadius: 5,
    marginHorizontal: 100,
    marginTop: 20,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5 // Android
  },
  infoViewTitle2: {
    backgroundColor: GwnuBeige,
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  infoViewTitle3: {
    backgroundColor: GwnuBlue,
    height: 60,
    marginBottom: 20,
    padding: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  infoViewContent2: {
    backgroundColor: LightenColor,
    borderRadius: 5,
    padding: 5,
    overflow: "hidden", // IOS
  },
  Buttonstyle: {
    width: 90,
    height: 45,
    borderRadius: 5,
    backgroundColor: GwnuYellow,
    alignItems: 'center'
  }
})

let boolean = new Array(12).fill(0)
boolean.fill(0)
console.log(boolean)

const ReservationScreen = ({ route }) => {
  const { info } = route.params
  const user = GetUserInfo()

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const today = new Date()
  const [currentTime, setcurrentTime] = useState(`${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`)

  const reservation = ReservationInquiry(info.type, currentTime)

  const startTime = info.opening.replace(":", "")
  const endTime = info.closing.replace(":", "")


  const iteration = []

  const temp = []
  let showtime = Number(startTime)
  let j = (Number(endTime) - Number(startTime)) / 100

  for (let i = 0; i < j; i++) {
    iteration[i] = showtime
    showtime += 100
  }

  return (
    <ScrollView style={styles.rootView}>
      <View style={styles.rootView}>
        <Text style={styles.infoViewTitle3}>{info.name}</Text>

        <View style={styles.infoView}>
          <Text style={styles.infoViewTitle2}>시설물 정보</Text>
          <Text style={styles.infoViewContent}>{info.info}
          </Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.infoViewContent2}>
            최대 이용인원 : {info.maximum} {'\n'}
            이용시간 : {info.opening} ~ {info.closing}
            {'\n'} 장소 : {info.location}
          </Text>
        </View>
      </View>


      <View style={styles.infoView}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(true)} >
          <Text style={styles.infoViewContent}>
            {"날짜 입력"}
          </Text>
        </TouchableOpacity>

        {iteration?.map((time, i) => {
          let [boolText, setText] = useState(1);
          let inwon = info.maximum

          reservation?.map((el, i) => {
            if (i != 0) {
              if (time / 100 == Number(el.time) / 100) {
                inwon -= el.num
              }
            }
            return inwon
          })

          return (
            <View key={i} style={styles.infoView}>
              <Text style={styles.infoViewContent}>
                {time / 100} 시{'\n'}
                예약가능인원 : {inwon} {'\n'}
              </Text>

              <TouchableOpacity
                style={styles.Buttonstyle}
                onPress={() => {
                  if (boolean[i] == 0) {
                    boolean[i]++
                  } else if (boolean[i] == 1) {
                    boolean[i]--
                  }
                  setText(boolText ^ 1)
                  console.log(boolean, boolText)
                }} >

                <Text >{boolText ? '선택' : '취소'}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.ReservationButton}
        onPress={() => {
          while (temp.length) {
            temp.pop()
          }
          boolean.map((el, i) => {
            if (el == 1) {
              temp.push(iteration[i].toString().padStart(4, '0'))
            }
          })

          return (
            Alert.alert(
              "아래 정보로 예약 하시겠습니까?",
              (info.name + ' ' + currentTime + ' ' + temp),
              [{
                text: "예",
                onPress: () => {
                  ReservationRegister(info.type, currentTime, temp, user?.uid)
                }
              },
              {
                text: "다시 선택",
                style: "cancel",
              }]
            )
          )
        }}>
        <Text align='center'>예약</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          setcurrentTime(`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`)
        }}

        onCancel={() => {
          setOpen(false)
        }}
      />
    </ScrollView >
  );
};

export default ReservationScreen;