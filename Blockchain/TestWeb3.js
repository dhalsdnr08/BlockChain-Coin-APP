import React, { useState, useEffect } from 'react';
import '../global';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Web3 from 'web3';
import MNUCoin from '../build/contracts/MNUCoin.json';

function TestWeb3() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3("http://172.17.228.204:7545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MNUCoin.networks[networkId];
      const tokenContract = new web3.eth.Contract(
        MNUCoin.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const name = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const totalSupply = await tokenContract.methods.totalSupply().call();
      setWeb3(web3);
      setAccount(accounts[0]);
      setTokenContract(tokenContract);
      setName(name);
      setSymbol(symbol);
      setTotalSupply(totalSupply);
    };
    init();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await tokenContract.methods.balanceOf(account).call();
      setBalance(balance);
    };
    if (web3 && account && tokenContract) {
      getBalance();
    }
  }, [web3, account, tokenContract]);
  
  const handleTransfer = async () => {
    const amountWei = web3.utils.toWei(amount, 'ether');
    const tx = await tokenContract.methods.transfer(recipient, amountWei).send({ from: account });
    // console.log('Transaction hash: ', tx.transactionHash);
  
    const balance = await tokenContract.methods.balanceOf(account).call();
    setBalance(balance);

  };
   
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MNUCoin</Text>
      <Text style={styles.label}>코인 이름:</Text>
      <Text style={styles.value}>{name}</Text>
      <Text style={styles.label}>코인 심볼:</Text>
      <Text style={styles.value}>{symbol}</Text>
      <Text style={styles.label}>코인 총 공급량:</Text>
      <Text style={styles.value}>{web3 && web3.utils.fromWei(totalSupply, 'ether')}</Text>
      <Text style={styles.label}>코인 보내기:</Text>
      <TextInput
        style={styles.input}
        placeholder="코인 제공 받을 사람 주소"
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        style={styles.input}
        placeholder="코인 양"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
      <Text style={styles.label}>남은 총 코인 수:</Text>
      <Text style={styles.value}>{web3 && web3.utils.fromWei(balance,"ether")}</Text>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
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
  
export default TestWeb3;

