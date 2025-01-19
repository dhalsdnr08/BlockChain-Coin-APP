import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainLogoImage from "../images/MainLogo.png";
import MainScreen from '../MainScreen';

const Stack = createStackNavigator();

export default function SignIn() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const validateEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const validateEmailDomain = (email) => {
    const emailDomain = email.split('@')[1];
    return emailDomain === 'mokpo.ac.kr';
  };

  useEffect(() => {
    const checkUserLogin = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        setUser(user);
        disableBackswip();
        navigation.navigate('MainScreen');
        alert('로그인 성공');
      }
    };
    checkUserLogin();
  }, []);
  
  const disableBackswip = () => {
    navigation.dispatch(StackActions.replace('MainScreen'));
  };
  
  const signIn = async () => {
    if (email === '' || password === '') {
      alert('이메일과 비밀번호 모두 입력해주세요.');
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
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
      setUser(userCredential.user);
      alert('로그인 성공');
  
      navigation.navigate('MainScreen');
      disableBackswip();
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainScreen' }],
      });
    } catch (error) {
      // 이전 코드 생략
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.MainButton}>
        <View style={styles.MainImageCon}><Image source={MainLogoImage} style={styles.imageStyle} /></View>
        <Text style={styles.MainText}>MNU 코인</Text>
      </View>
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
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: "5%",
    backgroundColor: "#fff"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
  },
  MainButton: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  MainImageCon: {
    backgroundColor: "#fff",
    paddingRight: "5%",
  },
  imageStyle: {
    width: 70,
    height: 50,
    justifyContent: "center",
    resizeMode: "stretch"
  },
  MainText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 33,
    color: "#009a92",
    fontWeight: "bold",
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
    marginBottom: "5%"
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
