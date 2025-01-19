import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getAuth } from 'firebase/auth';
import Web3 from 'web3';
import { initializeApp } from 'firebase/app';
// import app from './firebaseConfig.js';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainLogoImage from "./images/MainLogo.png";
import Megaphone from "./images/Megaphone.png";
import Calender from "./images/Calender.png";
import Shop from "./images/Shop.png";
import Cart from "./images/Cart.png";
import NoteBook from "./images/NoteBook.png";
import Cash from "./Screens/Cash/Cash";
import { useNavigation } from '@react-navigation/native';

const web3 = new Web3(new Web3.providers.HttpProvider("http://172.17.228.204:7545"));

const firebaseConfig = {
  apiKey: "AIzaSyBEEQF38AtY0SOEF7V6hL3c6JApQvzU5xc",
  authDomain: "mnuc-ce1ca.firebaseapp.com",
  projectId: "mnuc-ce1ca",
  storageBucket: "mnuc-ce1ca.appspot.com",
  messagingSenderId: "234776504564",
  appId: "1:234776504564:web:a72dd1a1584bc85955d6a1",
  measurementId: "G-LBGCZC8J3X"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const Tab = createBottomTabNavigator();


function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#fb8c00',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Cash}
        options={{
          headerShown: false,
          title: '마이페이지',
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}



function HomeScreen() {
  const navigation = useNavigation();
  const handlePress = () => {
    Linking.openURL('http://172.17.228.204:3000');
  };
  return (
    <View style = {styles.container}>
      <View style={styles.subContainerOne}>
        <View style={styles.MainButton}>
          <View style = {styles.MainImageCon}><Image source = {MainLogoImage} style = {styles.imageStyle}/></View>
          <Text style = {styles.MainText}>MNU 코인</Text> 
        </View>
        <View style = {styles.MNUpayCon}>
          <Text style = {styles.MNUpay}>MNU PAY</Text>
        </View>
        <View style = {styles.MNUpayBalance}>
          <Text style ={styles.MNUpayCoin}>보유 코인</Text>
        </View>
        <View style = {styles.MainUnderText}>
        <TouchableOpacity style={styles.Payment} onPress={() => navigation.navigate('Transfer')}>
          <Text style ={styles.Payment}>송금</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Payment} onPress={() => navigation.navigate('TestWeb3')}>
          <Text style ={styles.Payment}>결제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.UsageHistory} onPress={handlePress}>
          <Text style ={styles.Payment}>거래 내역</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainerTwo}>
        <View style={styles.Notice}>
          <Image source = {Megaphone} style = {styles.MegaStyle}/>
          <Text style ={styles.NoticeText}>MNU 코인 출시!! Click Click!!</Text>
        </View>
        <View style={styles.MainMenuSel1}>
          <View style = {styles.MainMenuBut}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Calendar')}>
            <Text style={styles.buttonText}>행사정보</Text>
            <Image source = {Calender} style = {styles.Calender}/>
            </TouchableOpacity>
          </View>
          <View style = {styles.MainMenuBut}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('List')}>
              <Text style={styles.buttonText}>가맹점</Text>
              <Image source = {Shop} style = {styles.Shop}/>
            </TouchableOpacity>
          </View>        
        </View>
        <View style={styles.MainMenuSel2}>
          <View style = {styles.MainMenuBut}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Item1')}>
              <Text style={styles.buttonText}>장터</Text>
              <Image source = {Cart} style = {styles.Cart}/>
            </TouchableOpacity>
          </View>
          <View style = {styles.MainMenuBut}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('QRScan')}>
              <Text style={styles.buttonText}>출석체크</Text>
              <Image source = {NoteBook} style = {styles.NoteBook}/>
            </TouchableOpacity>
          </View>         
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainerOne: {
    flex:5,
    backgroundColor:"#fff"
  },
  logoutButton: {
    backgroundColor: '#009a92',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  MainButton: {
    marginTop:45,
    flexDirection : 'row',
    justifyContent : "center",
    alignItems:"center",
    backgroundColor:"#fff",
  },
  MainImageCon:{
    backgroundColor:"#fff",
    paddingRight:20,
  },

  MainText:{
    textAlign:"center",
    alignSelf:"center",
    fontSize: 33,
    color:"#009a92",
    fontWeight: "bold",
  },

  MNUpayCon:{
    marginTop:25,
    backgroundColor:"#009a92",
    borderRadius :15,
    marginLeft:'10%',
    width : 80,
  },
  
  MNUpay:{
    color:"#fff",
    fontWeight: 'bold',
    alignSelf:"center",
    textAlign:"center"
  },

  MNUpayCoin:{
    textAlign:"center",
    alignSelf:"center",
    fontSize: 33,
    color:"#000",
    fontWeight: 'bold',
    backgroundColor:"#fff",
    borderRadius :10
  },

  MNUpayBalance:{
    flex:0.5,
    borderWidth:3,
    backgroundColor:"#fff",
    shadowColor:"rgb(00, 00, 00)",
    textAlign:"center",
    alignSelf:"center",
    justifyContent:"center",
    marginTop:"3%",
    width:"80%",
  },

  MainUnderText:{
    flex:0.2,
    backgroundColor:"#fff",
    flexDirection : 'row',
    justifyContent:"space-between",
    alignSelf:"center",
    width:"80%",
    marginTop:"1%",
  },

  Accumulate:{
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:"center",
    alignSelf:"center",
  },
  
  Payment:{
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:"center",
    alignSelf:"center",
  },

  UsageHistory:{
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:"center",
    alignSelf:"center",
  },

  imageStyle: {
    width:70,
    height:50,
    justifyContent : "center",
    resizeMode:"stretch"
  },

  subContainerTwo: {
    flex:7.5,
    borderColor:"#73bab6",
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    backgroundColor:"#73bab6"
  },
  Notice:{
    flex:0.12,
    borderWidth:2,
    borderRadius :30,
    paddingLeft:"3%",
    marginTop:"3%",
    width:"80%",
    flexDirection:"row",
    alignSelf:"center",
    backgroundColor:"#fff"
  },
  NoticeText:{
    alignSelf:"center",
  },
  MegaStyle:{
    width:"7%",
    height:15,
    marginRight:"2%",
    alignSelf:"center",
    resizeMode:"cover"
  },
  MainMenuSel1:{
    flex : 1,
    flexDirection:"row",
    justifyContent:"space-around",
    backgroundColor:"#73bab6",
  },
  MainMenuSel2:{
    flex : 1,
    flexDirection:"row",
    justifyContent:"space-around",
    backgroundColor:"#73bab6",
  },
  buttonText:{
    paddingTop:"4%",
    marginLeft:"7%",
    color:"#000",
    fontSize:25,
    fontWeight:'bold'
  },

  MainMenuBut:{
    width:150,
    height:145,
    borderColor:"#696969",
    borderWidth:1.5,
    backgroundColor:"#fff",
    borderRadius :20,
    alignSelf:"center",
    textAlign:"left"
  },
  Calender:{
    alignSelf:"center",
    resizeMode:"cover",
    marginLeft:"18%",
    marginTop:"8%",
    width:"65%",
    height:"65%",
  },
  Shop:{
    alignSelf:"center",
    resizeMode:"cover",
    marginLeft:"32%",
    marginTop:"5%",
    width:"60%",
    height:"67%",
  },
  Cart:{
    alignSelf:"center",
    resizeMode:"cover",
    marginLeft:"25%",
    marginTop:"5%",
    width:"70%",
    height:"67%",
  },

  NoteBook:{
    alignSelf:"center",
    resizeMode:"cover",
    marginLeft:"28%",
    marginTop:"7%",
    width:"65%",
    height:"65%",
  },

});     

export default MainScreen;