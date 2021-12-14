import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetFacilityList } from '../../functions/Firestore';
import Text from '../../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, TextColor, TextColorWhite } from '../../functions/GwnuColor'

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    marginTop: 30
  },
  listRootView: {
    flexDirection: 'row',
  },
  listView: {
    flex: 5,
    backgroundColor: GwnuBlue,
    alignSelf: 'stretch',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    marginHorizontal: 30,
    marginVertical: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5 // Android
  },
  listViewText: {
    padding: 20,
    fontSize: 18,
    fontWeight: "bold"
  },
})

const ReservationManageScreen = ({ navigation }) => {
  const facilityList = GetFacilityList()

  const colorRatation = [[GwnuBlue, TextColorWhite], [GwnuPurple, TextColorWhite], [GwnuBeige, TextColor], [GwnuYellow, TextColor]]

  const ListView = ({ color, info }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.listView, { backgroundColor: color[0] }]}
        onPress={() => {
          navigation.navigate("예약 정보 확인", { info })
        }} >

        <Text style={[styles.listViewText, { color: color[1] }]}>
          {info.name}
        </Text>
        <Ionicons name="chevron-forward-outline" style={[styles.listViewText, { color: color[1] }]} />
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={styles.rootView}>
      {facilityList?.map((el, i) => {
        return (
          <View key={i} style={styles.listRootView}>
            <ListView color={colorRatation[i % 4]} info={el} />
          </View>
        )
      })}
    </ScrollView>
  );
};

export default ReservationManageScreen;