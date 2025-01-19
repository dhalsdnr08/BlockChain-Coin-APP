import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, Clipboard } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLogoImage from '../../images/MainLogo.png';
import QRCode from 'react-native-qrcode-svg';
import Web3 from 'web3';
import '../../global';
import MNUCoin from '../../build/contracts/MNUCoin.json';
import { ref, getDatabase, get } from 'firebase/database';

const CashScreen = ({ navigation }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [tokenContract, setTokenContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3('http://172.17.228.204:7545'); // 노드 RPC 주소 입력
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MNUCoin.networks[networkId];
      const tokenContract = new web3.eth.Contract(
        MNUCoin.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setWeb3(web3);
      setAccounts(accounts);
      setTokenContract(tokenContract);
    };
    init();
  }, []);

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        if (userData && userData.walletAddress) {
          const walletAddress = userData.walletAddress;
          setWalletAddress(walletAddress);
        } else {
          console.log('User wallet address not found');
          setWalletAddress('');
        }
      } catch (error) {
        console.error('Failed to fetch wallet address:', error);
      }
    };

    fetchWalletAddress();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      if (accounts.length > 0 && tokenContract && walletAddress) {
        const balance = await tokenContract.methods.balanceOf(walletAddress).call();
        setBalance(balance);
      }
    };

    const interval = setInterval(getBalance, 1500);
    return () => clearInterval(interval);
  }, [accounts, tokenContract, walletAddress]);

  const handleLogout = async () => {
    try {
      Alert.alert(
        '로그아웃',
        '정말로 로그아웃 하시겠습니까?',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '로그아웃',
            onPress: async () => {
              const auth = getAuth();
              await signOut(auth);
              await AsyncStorage.removeItem('user');
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignInScreen' }],
              });
            },
          },
        ],
      );
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const formattedBalance = (balance / 10 ** 18).toFixed(0);

  const [qrData, setQrData] = useState('1234567890');

  useEffect(() => {
    const generateNewQRCode = async () => {
      const paymentId = Math.floor(Math.random() * 1000000);
      const paymentData = {
        transactionId: `tid_${paymentId}`,
        Name: '오민욱',
        Number: '183817',
      };

      // 결제 데이터 문자열로 변환. 카카오페이에서 원하는 형식으로 변환하세요.
      const paymentDataString = JSON.stringify(paymentData);
      setQrData(paymentDataString);
    };

    generateNewQRCode();
  }, []);

  const handleWalletAddressClick = () => {
    if (walletAddress) {
      Clipboard.setString(walletAddress);
      Alert.alert('지갑 주소 복사', '지갑 주소가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={MainLogoImage} style={styles.logoImage} />
        <Text style={styles.logoText}>MNU 코인</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>잔여 코인:</Text>
        <Text style={styles.balanceText}>{formattedBalance}</Text>
      </View>
      <TouchableOpacity style={styles.walletAddressContainer} onPress={handleWalletAddressClick}>
        <Text style={styles.walletAddressText}>지갑주소 복사하기</Text>
        <Text style={styles.walletAddressText}>{walletAddress}</Text>
      </TouchableOpacity>
      <View style={styles.qrCodeContainer}>
        {/* 결제 데이터를 포함하는 QR 코드 */}
        <QRCode value={qrData} size={200} />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '20%',
  },
  logoImage: {
    width: 70,
    height: 50,
    resizeMode: 'stretch',
  },
  logoText: {
    marginLeft: 10,
    color: '#009a92',
    fontSize: 33,
    fontWeight: 'bold',
  },
  balanceContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 28,
    shadowColor: 'rgb(00, 00, 00)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 6,
  },
  balanceTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 15,
  },
  balanceText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  walletAddressContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgb(00, 00, 00)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 6,
  },
  walletAddressText: {
    fontSize: 20,
    color: '#000',
    textDecorationLine: 'none',
  },
  qrCodeContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#009a92',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CashScreen;
