import React, { useState, useEffect } from 'react';
import '../global';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Web3 from 'web3';
import MNUCoin from '../build/contracts/MNUCoin.json';
import { getAuth } from 'firebase/auth';
import { ref, getDatabase, get } from 'firebase/database';

function Transfer() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientStudentId, setRecipientStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider("http://172.17.228.204:7545"));
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MNUCoin.networks[networkId];
      const tokenContract = new web3.eth.Contract(
        MNUCoin.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setWeb3(web3);
      setAccount(accounts[0]);
      setTokenContract(tokenContract);
    };
    init();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      if (account && tokenContract && walletAddress) {
        const balance = await tokenContract.methods.balanceOf(walletAddress).call();
        setBalance(balance);
      }
    };

    const interval = setInterval(getBalance, 1500);
    return () => clearInterval(interval);
  }, [account, tokenContract, walletAddress]);

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid; // userId 설정 추가
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
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Failed to fetch wallet address:', error);
      }
    };

    fetchWalletAddress();
  }, []);

  const getAddressByNameAndStudentId = async (name, studentId) => {
    try {
      const db = getDatabase();
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
  
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const recipientUser = Object.values(usersData).find((user) => user.name === name && user.studentId === studentId);  
        if (recipientUser) {
          const recipientAddress = recipientUser.walletAddress;
          return recipientAddress;
        } else {
          console.log('Recipient user not found');
          return null;
        }
      } else {
        console.log('No matching users found');
        return null;
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return null;
    }
  };

  const handleTransferByUserInfo = async () => {
    try {
      const recipientAddress = await getAddressByNameAndStudentId(recipientName, recipientStudentId);
      if (recipientAddress) {
        const amountWei = web3.utils.toWei(amount, 'ether');
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const db = getDatabase();
          const userRef = ref(db, `users/${userId}`);
          const snapshot = await get(userRef);
          const userData = snapshot.val();
  
          if (userData && userData.walletAddress) {
            const senderAddress = userData.walletAddress;
            await web3.eth.personal.unlockAccount(senderAddress, '');
            await tokenContract.methods.transfer(recipientAddress, amountWei).send({ from: senderAddress });
            
            Alert.alert('Error', '송금이 완료 되었습니다.');
          } else {
            Alert.alert('Error', '학번과 이름을 다시 확인해주세요');
          }
        } else {
          Alert.alert('Error', '학번과 이름을 다시 확인해주세요');
        }
      } else {
        Alert.alert('Error', '학번과 이름을 다시 확인해주세요');
      }
    } catch (error) {
      Alert.alert('Error', '관리자에게 문의주세요!');
      console.log(error)
      console.log(senderAddress)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MNUCoin</Text>
      <Text style={styles.label}>송금하기</Text>
      <TextInput
        style={styles.input}
        placeholder="받는사람 이름"
        value={recipientName}
        onChangeText={setRecipientName}
      />
      <TextInput
        style={styles.input}
        placeholder="받는사람 학번"
        value={recipientStudentId}
        onChangeText={setRecipientStudentId}
      />
      <TextInput
        style={styles.input}
        placeholder="코인 양"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleTransferByUserInfo}>
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
      <Text style={styles.label}>남은 총 코인 수:</Text>
      <Text style={styles.value}>{web3 && web3.utils.fromWei(balance, 'ether')} MNU</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#008CBA',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Transfer;
