import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor, TextColor, TextColorWhite } from '../functions/GwnuColor'
import { GetCommunityList, GetFacilityList } from '../functions/Firestore';

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  infoView: {
    alignSelf: 'stretch',
    backgroundColor: GwnuBeige,
    borderRadius: 5,
    marginHorizontal: 30,
    marginTop: 40,
    marginBottom: 10,
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
    minHeight: 75,
    backgroundColor: LightenColor,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 25 : 15,
    overflow: "hidden", // IOS
  },
  listButton: {
    alignSelf: 'stretch',
    borderRadius: 5,
    marginHorizontal: 30,
    marginVertical: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5 // Android
  },
  listButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listButtonTypeText: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 15 : 5,
    fontSize: 20,
    fontWeight: "bold"
  },
  listButtonLocationText: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  listButtonAvailableText: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 5
  }
})

const ReservationListScreen = ({ navigation }) => {
  const noticeList = GetCommunityList('notice', 3)
  const facilityList = GetFacilityList()
  const colorRatation = [[GwnuBlue, TextColorWhite], [GwnuPurple, TextColorWhite], [GwnuBeige, TextColor], [GwnuYellow, TextColor]]

  const ListView = ({ color, type, name, location, available }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.listButton, { backgroundColor: color[0] }]}
        onPress={() => navigation.navigate("예약하기", {
          type: type
        })} >

        <View style={styles.listButtonView}>
          <Text style={[styles.listButtonTypeText, { color: color[1] }]}>
            {name}
          </Text>
          <Text style={[styles.listButtonLocationText, { color: color[1] }]}>
            {location}
          </Text>
        </View>

        <Text style={[styles.listButtonAvailableText, { color: color[1] }]}>
          이용 가능 시간 : {available}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={styles.rootView}>
      <View style={styles.infoView}>
        <Text style={styles.infoViewTitle}>공지사항</Text>
        <Text style={styles.infoViewContent}>
          {noticeList?.map((el, i) => {
            return `${i ? '\n' : ''}・ ${el.title}`
          })}
        </Text>
      </View>

      <View style={{ flex: 1, height: 1, backgroundColor: 'lightgray', margin: 20 }} />

      {facilityList?.map((el, i) => {
        const available = `${el.opening} ~ ${el.closing}`;
        return (
          <ListView
            key={i}
            color={colorRatation[i % 4]}
            type={el.type} name={el.name}
            location={el.location}
            available={available}
          />
        )
      })}
    </ScrollView>

  );
};

export default ReservationListScreen;
