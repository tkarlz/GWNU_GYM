import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor } from '../functions/GwnuColor'
import { GetCommunityList, GetFacilityList } from '../functions/Firestore';
// import DateTimePicker from '@react-native-community/datetimepicker'

const styles = StyleSheet.create({
  rootView: {
    flex: 1
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
    minheight:40,
    backgroundColor: LightenColor,
    borderRadius: 5,
    padding:5,
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
    width: 150,
    borderRadius: 5,
    marginHorizontal: 30,
    marginBottom: 15,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5 // Android
  }

})

const ReservationScreen = ({ route, navigation }) => {
  const { type } = route.params
  const { name } = route.params
  const Facilityinfo = GetFacilityList()
  const comm = GetCommunityList(type)
 

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  

  return (
    <ScrollView style={styles.rootView}>
        <View style={styles.infoView}>
         <Text style={styles.infoViewTitle}>커뮤니티</Text>
          
        {comm && comm.map((el, i) => {
            const title = el.title
            return (<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("커뮤니티", {type: type, title: title})
            }>
              <Text style={styles.infoViewContent}>
                {el.title}
              </Text>
            </TouchableOpacity>)
          })}
          
        </View>
    
      
        {Facilityinfo && Facilityinfo.map((el) => {
          if (el.type == type) {
            return (
              <View style={styles.infoView}>
                <Text style={styles.infoViewTitle}>
                  {el.name} 시설물 정보
                </Text>
                <Text style={styles.infoViewContent}>
                  {el.info}
                </Text>
              </View>
            )
          }
          })}
       
      
      
      <View style={styles.infoView}>
        <TouchableOpacity activeOpacity={0.8} onPress={showDatepicker} >
          <Text style={styles.infoViewContent}>
            {"날짜 입력"}
          </Text>
        
          {/* {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="calendar"
              onChange={onChange}
            // />
          )} */}
        </TouchableOpacity>

        
      </View>
      <TouchableOpacity style={styles.ReservationButton} activeOpacity={0.8}>
        <Text align='center'>예약</Text>
      </TouchableOpacity>
    </ScrollView>
    
  );
};

export default ReservationScreen;
