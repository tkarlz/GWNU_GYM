import React, { useEffect, useState, Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor } from '../functions/GwnuColor'
import { GetCommunityList, GetFacilityList, ReservationInquiry, ReservationRegister } from '../functions/Firestore';
import DatePicker from 'react-native-date-picker'
import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-paper';

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
    minheight: 40,
    backgroundColor: LightenColor,
    borderRadius: 5,
    padding: 5,
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
    minheight: 40,
    minweight: 60,
    backgroundColor: LightenColor,
    borderRadius: 5,
    padding: 5,
    overflow: "hidden", // IOS
  },
  modalView: {
    width: 300,
    height: 100,
    borderRadius: 5,
  }
})



const ReservationScreen = ({ route, navigation }) => {
  const { type } = route.params
  const { name } = route.params
  const { info } = route.params
  const Facility = GetFacilityList()
  const comm = GetCommunityList(info.type, 1)

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  let [checked, setcheck] = useState(false)

  const [modalVisible, setModalVisible] = useState(false);

  const [currentTime, setcurrentTime] = useState(Date())

  const test = ReservationInquiry(info.type, currentTime)

  const startTime = info.opening.replace(":", "")
  const endTime = info.closing.replace(":", "")


  let iteration = []
  let boolean = []

  let showtime = Number(startTime)
  let j = (Number(endTime) - Number(startTime)) / 100

  for (let i = 0; i < j; i++) {
    iteration[i] = showtime
    showtime += 100
    boolean[i] = false
  }

  return (
    <ScrollView style={styles.rootView}>

      {/*<View style={styles.infoView}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("커뮤니티", { type: type })}>
          <Text style={styles.infoViewTitle}>커뮤니티</Text>
        </TouchableOpacity>
        {comm && comm.map((el, i) => {
          return (
            <Text style={styles.infoViewContent}>
              {el.title}
            </Text>
          )
        })}
          
      </View>*/}
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
        </TouchableOpacity>
        {iteration && iteration.map((time, i) => {
          let inwon = info.maximum

          {
            test && test.map((el, i) => {
              if (i == 0) {

              }
              else {
                if (time / 100 == Number(el.time) / 100) {
                  inwon -= el.num
                }
              }
              return (inwon)
            })
          }

          return (
            <View style={styles.infoView}>
              <Text style={styles.infoViewContent}>
                {time / 100} 시{'\n'}
                예약가능인원 : {inwon} {'\n'}

                {//여기가 문제 value 값을 어떻게 줘야할지 모르겟음
                }
                <CheckBox
                  disabled={false}
                  onAnimationType='fill'
                  offAnimationType='fade'
                  value={boolean[i]}
                  onValueChange={(newValue) => {
                    boolean[i] = newValue
                    console.log(boolean, (time.toString().padStart(4, '0')))

                  }}
                />

              </Text>
            </View>
          )

        })}




      </View>
      <TouchableOpacity style={styles.ReservationButton} activeOpacity={0.8}
        onPress={() => {
          console.log(info.type, currentTime, startTime, endTime) //임시로 startTime endTime넣어둠

          return (
            Alert.alert(
              "아래 정보로 예약 하시겠습니까?",
              (info.name + ' ' + currentTime + ' ' + startTime + ' ' + endTime),
              [{
                text: "예",
                onPress: () => {
                  //ReservationRegister(info.type, currentTime, [startTime, endTime], 'DUg7F0fQOebs3thMmeS9p56b2b53')
                }
              },
              {
                text: "아니오",
                style: "cancel"
              }]
            )
          )
        }}>
        <Text align='center'>예약</Text>
      </TouchableOpacity>
    </ScrollView>

  );
};

export default ReservationScreen;


