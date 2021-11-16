import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/MainScreen';
import LoginScreen from './src/LoginScreen'
import ReservationScreen from './src/ReservationScreen';
import FacilityManageScreen from './src/admin/FacilityManageScreen';
import CommunityManageScreen from './src/admin/CommunityManageScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="메인"
          component={MainScreen}
        />
        <Stack.Screen
          name="로그인"
          component={LoginScreen}
        />
        <Stack.Screen
          name="예약하기"
          component={ReservationScreen}
        />
        <Stack.Screen
          name="시설물 관리"
          component={FacilityManageScreen}
        />
        <Stack.Screen
          name="커뮤니티 관리"
          component={CommunityManageScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
