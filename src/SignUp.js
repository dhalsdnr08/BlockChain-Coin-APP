import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import MainLogoImage from "../images/MainLogo.png";
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';
import Web3 from 'web3';
import '../global';

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
const db = getDatabase(app);

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();


  const validateEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const validateEmailDomain = (email) => {
    const emailDomain = email.split('@')[1];
    return emailDomain === 'mokpo.ac.kr';
  };

  const signUp123 = async () => {
    if (email === '' || password === '' || studentId === '' || name === '') {
      alert('이메일, 비밀번호, 학번, 이름을 모두 입력해주세요.');
      return;
    }

    if (!validateEmail(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (!validateEmailDomain(email)) {
      alert('mokpo.ac.kr 도메인의 이메일 주소를 입력해주세요.');
      return;
    }
    
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const uid = user.uid;
      const userRef = ref(db, `users/${uid}`);
      const wallet = await web3.eth.personal.newAccount('');
      await web3.eth.personal.unlockAccount(wallet, '');
      await set(userRef, {
        name,
        studentId,
        email,
        password,
        walletAddress: wallet,
      });
      const recipientAddress = wallet;
      const amountWei = web3.utils.toWei('10', 'ether');
      const senderAddress = "0xe0474E11E0C2dd743538B5052E45d47bb2789572";
      await web3.eth.sendTransaction({
        from: senderAddress,
        to: recipientAddress,
        value: amountWei,
      });
        alert("회원가입 성공!")
        navigation.navigate('SignInScreen');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.MainButton}>
        <View style = {styles.MainImageCon}><Image source = {MainLogoImage} style = {styles.imageStyle}/></View>
        <Text style = {styles.MainText}>MNU 코인</Text> 
      </View>
      <Text>이름:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <Text>학번:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setStudentId}
        value={studentId}
        keyboardType="numeric"
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={signUp123}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor:"#fff"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
  },
  button: {
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
    marginBottom:"5%"
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  MainButton: {
    flexDirection : 'row',
    justifyContent : "center",
    alignItems:"center",
    backgroundColor:"#fff",
  },
  MainImageCon:{
    backgroundColor:"#fff",
    paddingRight:"5%",
  },
  imageStyle: {
    width:70,
    height:50,
    justifyContent :"center",
    resizeMode:"stretch"
  },
  MainText:{
    textAlign:"center",
    alignSelf:"center",
    fontSize: 33,
    color:"#009a92",
    fontWeight: "bold",
  },
});