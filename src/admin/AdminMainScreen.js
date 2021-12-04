import React from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetUserDetailInfo } from '../../functions/Firestore';
import { GetUserInfo } from '../../functions/GoogleLogin';
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor, TextColor, TextColorWhite } from '../../functions/GwnuColor';
import Text from '../../functions/GwnuText'

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
    fontSize: 20,
    fontWeight: "bold",
  },
  infoViewContent: {
    minHeight: 75,
    backgroundColor: LightenColor,
    borderRadius: 5,
    padding: 15,
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  textFieldName: {
    fontSize: 18,
    fontWeight: "bold",
    width: 75,
  },
  textValue: {
    flex: 1,
    color: TextColor,
    fontSize: 18,
    padding: 0,
    overflow: "hidden", // IOS
  },
  listView: {
    backgroundColor: GwnuBlue,
    alignSelf: 'stretch',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  listViewText: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    fontSize: 18,
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

const AdminMainScreen = ({ navigation }) => {
  const user = GetUserInfo()
  const userInfo = GetUserDetailInfo(user?.uid)

  const data = [{ name: '예약 관리' }, { name: '시설물 관리' }, { name: '커뮤니티 관리' }]
  const colorRatation = [[GwnuBlue, TextColorWhite], [GwnuPurple, TextColorWhite], [GwnuBeige, TextColor], [GwnuYellow, TextColor]]

  const userData = [{ name: '이름', value: userInfo?.name }, { name: '이메일', value: userInfo?.email },
    { name: '부서', value: userInfo?.department }, { name: '사번', value: userInfo?.studentId }]
  const UserView = ({ name, value }) => {
    return (
      <View style={styles.textView}>
        <Text style={styles.textFieldName} >{name}</Text>
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          style={styles.textValue}
          value={value ?? ""}
        />
      </View>
    )
  }

  const ListView = ({ name, color }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.listView, styles.shadow, { backgroundColor: color[0] }]}
        onPress={() => navigation.navigate(name)} >

        <Text style={[styles.listViewText, { color: color[1] }]}>
          {` ${name}`}
        </Text>
        <Ionicons name="chevron-forward-outline" style={[styles.listViewText, { color: color[1] }]} />
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={styles.rootView} >
      <View style={[styles.infoView, styles.shadow]}>
        <Text style={styles.infoViewTitle}>관리자 정보</Text>
        <View style={styles.infoViewContent}>
          {userData?.map((el, i) => {
            return <UserView key={i} name={el.name} value={el.value} />
          })}
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: 'lightgray', margin: 20 }} />

      {data?.map((el, i) => {
        return <ListView key={i} name={el.name} color={colorRatation[i % 4]} />
      })}
    </ScrollView>

  );
};

export default AdminMainScreen;