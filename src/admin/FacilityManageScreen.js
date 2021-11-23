import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetFacilityList } from '../../functions/Firestore';
import Text from '../../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, TextColor, TextColorWhite } from '../../functions/GwnuColor'
import { DeleteAlert } from '../AlertDialog';

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
  editButton: {
    padding: 10
  },
  editButtonText: {
    color: 'mediumblue',
    fontWeight: "bold"
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    marginEnd: 10,
  },
  deleteButtonIcon: {
    fontSize: 40,
    color: 'red',
  },
  addButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  },
  addButtonIcon: {
    fontSize: 50,
    color: 'green',
  }
})

const FacilityManageScreen = ({ navigation }) => {
  const facilityList = GetFacilityList()
  const [editMode, setEditMode] = useState(false)

  const [selectedType, setSelectedType] = useState(null)
  const [selectedName, setSelectedName] = useState(null)
  const [alertVisible, setAlertVisible] = useState(false)

  const colorRatation = [[GwnuBlue, TextColorWhite], [GwnuPurple, TextColorWhite], [GwnuBeige, TextColor], [GwnuYellow, TextColor]]

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.editButton}
            onPress={() => setEditMode(!editMode)} >

            <Text style={styles.editButtonText}>{editMode ? '완료' : '편집'}</Text>
          </TouchableOpacity>
        )
      }
    })
  }, [editMode])

  const ListView = ({ color, type, name }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.listView, { backgroundColor: color[0] }]}
        onPress={() => {
          setEditMode(false)
          console.log(type)
        }} >

        <Text style={[styles.listViewText, { color: color[1] }]}>
          {name}
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
            <ListView color={colorRatation[i % 4]} type={el.type} name={el.name} />

            {editMode ?
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.deleteButton}
                onPress={() => {
                  setSelectedType(el.type)
                  setSelectedName(el.name)
                  setAlertVisible(true)
                }} >

                <Ionicons name="remove-circle" style={styles.deleteButtonIcon} />
              </TouchableOpacity> : null}
          </View>
        )
      })}

      {editMode ?
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addButton}
          onPress={() => {
            setEditMode(false)
            navigation.navigate("시설물 추가")
          }} >

          <Ionicons name="add-circle" style={styles.addButtonIcon} />
        </TouchableOpacity> : null}

      <DeleteAlert
        type={selectedType}
        name={selectedName}
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
      />
    </ScrollView>
  );
};

export default FacilityManageScreen;
