import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReservationListScreen from './ReservationListScreen'
import MyPageScreen from './MyPageScreen'
import { LogoTitle, LoginButton, UserName } from './HeaderComponent'
import { GetUserInfo } from '../functions/GoogleLogin'
import { GwnuPurple } from '../functions/GwnuColor'
import { LoginAlert } from '../functions/Alert';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const user = GetUserInfo()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <LogoTitle />
    })
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        user ? <UserName name={user.displayName} /> : <LoginButton onPress={() => navigation.navigate("로그인")} />
    })
  }, [user])

  return (
    <>
      <LoginAlert alertVisible={alertVisible} setAlertVisible={setAlertVisible} navigation={navigation}/>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "예약") {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === "마이페이지") {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: GwnuPurple,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="예약" component={ReservationListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="마이페이지" component={MyPageScreen} options={{ headerShown: false, tabBarButton: (props) => (
          user ? <TouchableOpacity {...props} /> :
          <TouchableOpacity {...props} onPress={() => setAlertVisible(true)} />
        ) }} />
      </Tab.Navigator>
    </>
  )
}

export default MainScreen;
