import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReservationListScreen from './src/ReservationListScreen'
import LoginScreen from './src/LoginScreen'
import MyPageScreen from './src/MyPageScreen'
import { WithLocalSvg } from 'react-native-svg';
import LogoSvg from './assets/logo.svg'
import * as root from './rootValue'

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: root.GwnuYellow, 
    borderRadius: 5, 
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 1, //IOS
    elevation: 8, // Android
  },
  loginButtonText: {
    color: 'white', 
    paddingVertical: 8, 
    paddingHorizontal: 10, 
    fontSize: 16, 
    fontWeight: "bold"
  },
  logoTitle: {
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1 
  },
  logoTitleText: {
    marginStart: 10, 
    fontSize: 20, 
    color: root.TextColor, 
    fontWeight: "bold"
  }
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Main = ({ navigation }) => {

  const LogoTitle = () => {
    return (
      <View style={styles.logoTitle}>
        <WithLocalSvg width={30} height={30} asset={LogoSvg}/>
        <Text style={styles.logoTitleText}>
          체육 시설물 통합 예약
        </Text>
      </View>
    )
  }

  const LoginButton = ({ onPress }) => {
    return(
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.loginButton}
        onPress={onPress}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity> 
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <LogoTitle />,
      headerRight: () => <LoginButton onPress={() => navigation.navigate("Login")}/>
    })
  }, [])

  return(
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
        tabBarActiveTintColor: root.GwnuPurple,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="예약" component={ReservationListScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="마이페이지" component={MyPageScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  )
}


const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
