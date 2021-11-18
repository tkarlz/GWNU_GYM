import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor } from '../functions/GwnuColor'
import { GetCommunityList, GetFacilityList, ReservationInquiry, ReservationRegister } from '../functions/Firestore';

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

const ReservationScreen = ({ route, navigation }) => {
  const { type } = route.params
  const Facilityinfo = GetFacilityList()
  const comm = GetCommunityList('health_gym')
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("커뮤니티")}>
        <View style={styles.infoView}>
         <Text style={styles.infoViewTitle}>커뮤니티</Text>
          <Text style={styles.infoViewContent}>
            {comm && comm.map((el, i) => {
             return `${i ? '\n' : ''}・ ${el.title}`
           })}
          </Text>
        </View>
    </TouchableOpacity>
      <View style={styles.infoView}>
        <Text style={styles.infoViewContent}>
          { Facilityinfo && Facilityinfo.map((el) => {
            return el.info
          })}
        </Text>
      </View>
    </View>
  );
};

export default ReservationScreen;
