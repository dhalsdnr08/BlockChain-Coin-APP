import React from 'react';
import './global';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// 필요한 Firebase 서비스를 추가로 불러올 수 있습니다.
import 'firebase/database';
import MainScreen from './MainScreen';
import ListScreen from './Screens/List';
import ItemScreen from './Screens/Item1';
import Mart1Screen from './Screens/Mart1';
import Mart2Screen from './Screens/Mart2';
import Mart3Screen from './Screens/Mart3';
import Event1Screen from './Screens/Festival/event1'
import CheckScreen from './Screens/Check';
import MapScreen from './Screens/Map/Map';
import CalendarScreen from './Screens/Calendar/Calendar';
import CameraScreen from './Screens/Camera/Camera';
import CashScreen from './Screens/Cash/Cash'
import QRScreen from './Screens/Cash/QRScan'
import Transfer from './Blockchain/Transfer'
import TestWeb3 from './Blockchain/TestWeb3';
import SignIn from './src/SignIn';
import SignUp from './src/SignUp';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Transfer"
          component={Transfer}
          options = {{ headerTitle: '송금' }}
        />
        <Stack.Screen
          name="TestWeb3"
          component={TestWeb3}
          options = {{ headerTitle: '운영자' }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options = {{ headerTitle: '행사 일정' }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options = {{ headerTitle: '가맹점' }}
        />
        <Stack.Screen
          name="Event1"
          component={Event1Screen}
          options = {{ headerTitle: '행사 정보' }}
        />
        <Stack.Screen
          name="Item1"
          component={ItemScreen}
        />
        <Stack.Screen
          name="Mart1"
          component={Mart1Screen}
        />
        <Stack.Screen
          name="Mart2"
          component={Mart2Screen}
        />
        <Stack.Screen
          name="Mart3"
          component={Mart3Screen}
        />
        <Stack.Screen
          name="Check"
          component={CheckScreen}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
        />
        <Stack.Screen
          name="Cash"
          options={{headerShown: false}}
          component={CashScreen}
        />
        <Stack.Screen
          name="QRScan"
          component={QRScreen}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;