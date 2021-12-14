import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker'
import Accordion from 'react-native-collapsible/Accordion';
import Text from '../../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, LightenColor, TextColorWhite } from '../../functions/GwnuColor'
import { AdminReservationInquiry } from '../../functions/AdminFirestore';

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
    fontSize: 18,
    fontWeight: "bold",
  },
  infoViewContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LightenColor,
    borderRadius: 5,
    padding: 15,
  },
  mainView: {
    alignSelf: 'stretch',
    backgroundColor: GwnuBlue,
    borderRadius: 5,
    marginHorizontal: 30,
    marginBottom: 30,
    padding: 5,
  },
  mainViewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  mainViewTitle: {
    color: TextColorWhite,
    fontSize: 18,
    fontWeight: "bold",
  },
  dateText: {
    flex: 1,
    fontSize: 20,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: LightenColor,
    borderRadius: 5,
    marginVertical: 1,
  },
  listViewText: {
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 0,
    fontSize: 20,
  },
  innerView: {
    backgroundColor: LightenColor,
    borderRadius: 5,
    marginVertical: 1,
    marginStart: 15,
    paddingHorizontal: 10
  },
  innerViewText: {
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
  },
  shadow: {
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
  }
})

const ReservationInfoScreen = ({ route }) => {
  const { closing, maximum, name, opening, type } = route.params.info

  const [date, setDate] = useState(new Date())
  const [showDate, setShowDate] = useState(null)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const [timeRange, setTimeRange] = useState([])
  const [activeSections, setActiveSections] = useState([])

  const reservationInfo = AdminReservationInquiry(type, showDate?.replace(/[^0-9]/g, ""))

  const renderHeader = (section) => {
    return (
      <View style={styles.listView}>
        <Text style={styles.listViewText}>{section[0]} ~ {section[1]}</Text>
        <Text style={styles.listViewText}>{section[2]}/{maximum}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      section[3]?.map((item, i) => {
        return (
          <View key={i} style={styles.innerView}>
            <Text style={styles.innerViewText}>
              ・ {item.name} / {item.department} / {item.studentId}
              {'\n        '}{item.email}
            </Text>
          </View>
        )
      })
    );
  };

  useEffect(() => {
    setShowDate(`${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, '0')}월 ` +
      `${date.getDate().toString().padStart(2, '0')}일`)
  }, [date])

  useEffect(() => {
    const openTime = parseInt(opening)
    const closeTime = parseInt(closing)
    const arr = Array.from({ length: closeTime - openTime }, (v, i) => {
      return [(openTime + i).toString().padStart(2, '0') + ":00", (openTime + i + 1).toString().padStart(2, '0') + ":00", 0, null]
    })
    reservationInfo?.forEach((el) => {
      const time = parseInt(el.time) / 100
      try {
        arr[time - openTime][2] = el.num
        arr[time - openTime][3] = el.users
      } catch { }
    })
    setTimeRange(arr)
  }, [reservationInfo])

  return (
    <ScrollView style={styles.rootView}>
      <View style={[styles.infoView, styles.shadow]}>
        <Text style={styles.infoViewTitle}>{name}</Text>
        <View style={styles.infoViewContent}>
          <Text style={styles.dateText}>{showDate}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.dateButton, styles.shadow]}
            onPress={() => setDatePickerOpen(true)}>

            <Text style={styles.dateButtonText}>날짜 변경</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.mainView, styles.shadow]}>
        <View style={styles.mainViewHeader}>
          <Text style={styles.mainViewTitle}>예약 시간</Text>
          <Text style={styles.mainViewTitle}>예약 인원</Text>
        </View>
        <View>
          <Accordion
            sections={timeRange}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={(activeSections) => setActiveSections(activeSections)}
            touchableComponent={TouchableOpacity}
            touchableProps={{ activeOpacity: 0.8 }}
          />
        </View>
      </View>

      <DatePicker
        modal
        open={datePickerOpen}
        date={date}
        mode="date"
        title={"날짜 변경"}
        confirmText="선택"
        cancelText="취소"
        onConfirm={(date) => {
          setDatePickerOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setDatePickerOpen(false)
        }}
      />
    </ScrollView>
  );
};

export default ReservationInfoScreen;