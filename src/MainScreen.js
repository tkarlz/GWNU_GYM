import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReservationListScreen from './ReservationListScreen'
import MyPageScreen from './MyPageScreen'
import { LogoTitle, LoginButton, UserName } from './HeaderComponent'
import { GetUserInfo } from '../fuctions/GoogleLogin'
import { GwnuPurple } from '../fuctions/GwnuColor'

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
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
      <Tab.Screen name="마이페이지" component={MyPageScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default MainScreen;
