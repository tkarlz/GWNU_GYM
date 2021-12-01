import React, { useEffect, useState, } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor } from '../functions/GwnuColor'
import { GetCommunityList, GetFacilityList, ReservationInquiry } from '../functions/Firestore';
import DatePicker from 'react-native-date-picker'
import CheckBox from '@react-native-community/checkbox';
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
  const Facility = GetFacilityList()
  const comm = GetCommunityList(type, 1)

  const test = ReservationInquiry('health_gym', 'nXUvaSQdGQIRDQx4Aax4')
  console.log(test)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  
  return (
    <ScrollView style={styles.rootView}>
      <View style={styles.infoView}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("커뮤니티", { type: type})}>
         <Text style={styles.infoViewTitle}>커뮤니티</Text>
        </TouchableOpacity>
        {comm && comm.map((el, i) => {
          return (
            <Text style={styles.infoViewContent}>
              {el.title}
            </Text>           
          )
          })}
          
        </View>
    
      
        {Facility && Facility.map((el) => {
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
       
      {Facility && Facility.map((el) => {
        
        if (el.type == type) {
          const timeshow = el.opening;
          const Reservationtime=[];
          return (
            <View style={styles.infoView}>

              <Text style={styles.infoViewContent}>
                {timeshow}
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />                        
                {console.log(Reservationtime)}
              
                
              </Text>
            </View>
          
          )  
        }
      })}
      
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
              console.log(date)
             //const datetest = date.getFullYear() + date.getMonth() date.getDay() )               
              
            }}
            onCancel={() => {
            setOpen(false)
            }}
          />
          
           
        </TouchableOpacity>

        
      </View>
      <TouchableOpacity style={styles.ReservationButton} activeOpacity={0.8}>
        <Text align='center'>예약</Text>
      </TouchableOpacity>
    </ScrollView>
    
  );
};

export default ReservationScreen;
