import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    height: 300,  // <-------------------temp
    backgroundColor: LightenColor,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 25 : 15,
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
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 5, //IOS
    elevation: 5 // Android
  },
  listViewText: {
    padding: 15,
    fontSize: 18,
    fontWeight: "bold"
  }
})

const AdminMainScreen = ({ navigation }) => {
  const data = [{ name: '시설물 관리' }, { name: '커뮤니티 관리' }]
  const colorRatation = [[GwnuBlue, TextColorWhite], [GwnuPurple, TextColorWhite], [GwnuBeige, TextColor], [GwnuYellow, TextColor]]

  const ListView = ({ name, color }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.listView, { backgroundColor: color[0] }]}
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
      <View style={styles.infoView}>
        <Text style={styles.infoViewTitle}>???</Text>
        <Text style={styles.infoViewContent}>
          ???
        </Text>
      </View>

      <View style={{ height: 1, backgroundColor: 'lightgray', margin: 20 }} />

      {data?.map((el, i) => {
        return <ListView key={i} name={el.name} color={colorRatation[i % 4]} />
      })}
    </ScrollView>

  );
};

export default AdminMainScreen;