import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReservationListScreen from './ReservationListScreen'
import MyPageScreen from './MyPageScreen'
import AdminMainScreen from './admin/AdminMainScreen';
import { LogoTitle, LoginButton, UserName } from './HeaderComponent'
import { GetUserInfo } from '../functions/GoogleLogin'
import { GwnuPurple } from '../functions/GwnuColor'
import { InfoInputAlert, LoginAlert } from './AlertDialog';
import { CheckUserInfo } from '../functions/Firestore';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  const user = GetUserInfo()
  const checkUserInfo = CheckUserInfo(user?.uid)

  const [loginAlertVisible, setLoginAlertVisible] = useState(false);
  const [blankInfoAlertVisible, setBlankInfoAlertVisible] = useState(false);

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

  useEffect(() => {
    if (checkUserInfo?.isBlankInfo) {
      setBlankInfoAlertVisible(true)
    }
  }, [checkUserInfo])

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "예약") {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === "마이페이지") {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === "관리자 페이지") {
              iconName = focused ? 'settings' : 'settings-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: GwnuPurple,
          tabBarInactiveTintColor: 'gray',
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="예약" component={ReservationListScreen} options={{ headerShown: false }} />
        {checkUserInfo?.isAdmin ?
          <Tab.Screen name="관리자 페이지" component={AdminMainScreen} options={{ headerShown: false }} /> :
          <Tab.Screen name="마이페이지" component={MyPageScreen} options={{
            headerShown: false, tabBarButton: (props) => (
              user ? <TouchableOpacity activeOpacity={1} {...props} /> :
                <TouchableOpacity activeOpacity={1} {...props} onPress={() => setLoginAlertVisible(true)} />
            )
          }} />
        }
      </Tab.Navigator>

      <LoginAlert alertVisible={loginAlertVisible} setAlertVisible={setLoginAlertVisible} navigation={navigation} />
      <InfoInputAlert uid={user?.uid} alertVisible={blankInfoAlertVisible} setAlertVisible={setBlankInfoAlertVisible} />
    </>
  )
}

export default MainScreen;
