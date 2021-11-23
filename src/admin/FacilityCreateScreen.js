import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { CreateFacility } from '../../functions/AdminFirestore';
import { GwnuBeige, LightenColor, TextColor } from '../../functions/GwnuColor';
import Text from '../../functions/GwnuText'
import { DefaultAlert } from '../AlertDialog';

const styles = StyleSheet.create({
  rootView: {
    backgroundColor: GwnuBeige,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 10, //IOS
    elevation: 5 // Android
  },
  textRootView: {
    backgroundColor: LightenColor,
    paddingVertical: 30,
    borderRadius: 10,
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  textFieldName: {
    fontSize: 18,
    fontWeight: "bold",
    width: 150,
    padding: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: TextColor,
    backgroundColor: "white",
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    paddingHorizontal: 10,
    marginEnd: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  textInputMultiLineForIOS: {
    ...Platform.select({
      ios: {
        minHeight: 110,
        paddingTop: 15
      },
    })
  },
  availableTimeView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 15,
  },
  availableTimeButton: {
    backgroundColor: "white",
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  addButton: {
    alignSelf: "stretch",
    alignItems: "center",
    paddingVertical: 15,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  errorText: {
    position: "absolute",
    alignSelf: "center",
    color: "red"
  }
})

const FacilityCreateScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [locateId, setLocateId] = useState("")
  const [maximum, setMaximum] = useState("")

  const nullTime = "__:__"
  const [date, setDate] = useState(null)
  const [selectWhich, setSelectWhich] = useState("open")
  const [openTime, setOpenTime] = useState(nullTime)
  const [minimumDate, setMinimumDate] = useState(null)
  const [closeTime, setCloseTime] = useState(nullTime)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const [detailInfo, setDetailInfo] = useState("")

  const [emptyError, setEmptyError] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)

  const checkText = (setState, text) => {
    setState(text.replace(/\s/g, ""))
  }

  const checkNumber = (setState, text) => {
    setState(text.replace(/\D/g, ""))
  }

  const onPressAddButton = () => {
    if (name && locateId && maximum && detailInfo && openTime !== nullTime && closeTime !== nullTime) {
      CreateFacility(name, locateId, maximum, detailInfo, openTime, closeTime).then((res) => {
        if (res) {
          navigation.goBack()
        } else {
          setAlertVisible(true)
        }
      })
    } else {
      setEmptyError(true)
    }
  }

  useEffect(() => {
    const date = new Date()
    date.setMinutes(date.getMinutes() < 30 ? 0 : 30)
    setDate(date)
  }, [])

  return (
    <ScrollView>
      <View style={styles.rootView}>
        <View style={styles.textRootView}>
          <Text style={[styles.errorText, emptyError ? null : { display: "none" }]}>내용을 모두 입력해 주세요.</Text>
          <View style={styles.textView}>
            <Text style={styles.textFieldName} >이름</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => checkText(setName, text)}
              value={name}
              placeholder="ex) 체육관"
            />
          </View>

          <View style={styles.textView}>
            <Text style={styles.textFieldName} >건물 번호</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => checkText(setLocateId, text)}
              value={locateId}
              placeholder="ex) E1"
            />
          </View>

          <View style={styles.textView}>
            <Text style={styles.textFieldName} >최대 예약 인원</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => checkNumber(setMaximum, text)}
              value={maximum}
              keyboardType="numeric"
              placeholder="ex) 10"
            />
          </View>

          <View style={styles.textView}>
            <Text style={styles.textFieldName} >이용 가능 시간</Text>
            <View style={styles.availableTimeView}>
              <TouchableOpacity
                style={styles.availableTimeButton}
                onPress={() => {
                  setSelectWhich("open")
                  setDatePickerOpen(true)
                }}>
                <Text>{openTime}</Text>
              </TouchableOpacity>
              <Text>~</Text>
              <TouchableOpacity
                style={styles.availableTimeButton}
                onPress={() => {
                  setSelectWhich(openTime === nullTime ? "open" : "close")
                  setDatePickerOpen(true)
                }}>
                <Text>{closeTime}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.textView}>
            <Text style={styles.textFieldName} >상세 정보</Text>
            <TextInput
              style={[styles.textInput, styles.textInputMultiLineForIOS]}
              onChangeText={setDetailInfo}
              value={detailInfo}
              multiline
              numberOfLines={4}
              placeholder="상세 정보"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={onPressAddButton} >
          <Text style={styles.addButtonText}>생성</Text>
        </TouchableOpacity>
      </View>

      {date && <DatePicker
        modal
        open={datePickerOpen}
        date={date}
        mode="time"
        title={selectWhich === "close" ? "종료 시간" : "시작 시간"}
        confirmText="선택"
        cancelText="취소"
        minimumDate={selectWhich === "close" ? minimumDate : null}
        minuteInterval={30}
        onConfirm={(date) => {
          setDatePickerOpen(false)
          const hours = date.getHours().toString().padStart(2, '0')
          const minutes = date.getMinutes() < 30 ? "00" : "30"
          const newDate = new Date(date.getTime() + (60 * 60 * 1000))

          if (selectWhich === "close") {
            setDate(date)
            setCloseTime(`${hours}:${minutes}`)
          } else {
            setDate(newDate)
            setMinimumDate(newDate)
            setOpenTime(`${hours}:${minutes}`)
            setSelectWhich("close")
            setDatePickerOpen(true)
          }
        }}
        onCancel={() => {
          setDatePickerOpen(false)
          if (selectWhich === "close") {
            setCloseTime(nullTime)
          } else {
            setOpenTime(nullTime)
            setCloseTime(nullTime)
          }
        }}
      />}
      <DefaultAlert
        message="생성 실패 : 이름 중복"
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
      />
    </ScrollView>
  );
};

export default FacilityCreateScreen;
