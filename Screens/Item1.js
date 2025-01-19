import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, } from 'react-native';
import imagePath from '../images/mokpo.jpg';
import Road from "../images/road.png"
import Mission from "../images/mission.png"



const Eventdata1 = ({navigation}) => {
    return (
      <ScrollView>
        <View style = {styles.container}>
          <View style={styles.subContainerOne}>
              <View style={[styles.TitleTopView]}>
                <Text style={styles.titleText}>목포 항구 축제</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image source = {imagePath} style = {styles.image} />
                <Text style={styles.explanation}>
                  기간 : 2022년 10월 14일(금) ~ 10월{'\n'} 16일(일) / 3일간{'\n'}
                  주제 : 청년과 함께하는 가을 파시 항구{'\n'}
                  장소 : 목포항 및 삼학도 일원{'\n'}{'\n'}
                  지급 코인 500코인
                  </Text>
                
              </View>
              <View style={styles.Button}>
                <View>
                  <Image source = {Road} style = {styles.RoadStyle}/>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Map')} >
                  <Text>길찾기</Text>
                </TouchableOpacity>
                <View>
                  <Image source = {Mission} style = {styles.RoadStyle}/>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                  <Text>미션</Text>
                </TouchableOpacity>
              </View>
              <View style = {styles.eventdescriptionCon}>
                <Text style = {styles.eventdescription}>행사 구성</Text>
              </View>
              <View>
                <Text style = {styles.explanation}>청년하이볼 페스티벌, 청년파시 디스코파티, 파시나이트 쇼, 각종 먹거리 및 체험 프로그램</Text>
              </View>
              <View style = {styles.eventdescriptionCon}>
                <Text style = {styles.eventdescription}>주요 프로그램</Text>
              </View>
              <View>
                <Text style = {styles.explanation}>대표 프로그램</Text>
                <Text style = {styles.explanation}>공연 프로그램</Text>
                <Text style = {styles.explanation}>경연 프로그램</Text>
                <Text style = {styles.explanation}>체험 프로그램</Text>
                <Text style = {styles.explanation}>부대 프로그램</Text>
              </View>
                
            </View>
        </View>
      </ScrollView>
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
    
    TitleTopView:{
      backgroundColor:'#16A497'
      
    },
    titleText:{
      fontSize:25,
      fontWeight: "bold"
      
    },
    
    explanation:{
        padding:15,
        borderRadius:5,
    },
    image:{
        width: 150,
        height: 200,
        resizeMode: "cover"
    },
    Button:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding:3,
      marginLeft:"40%",
    },
    RoadStyle:{
      width:22,
      height:22,
      marginLeft:"40%",
      marginRight:"-40%",
      justifyContent: 'flex-end',
    },
    eventdescriptionCon:{
      marginTop:5,
      backgroundColor:"#009a92",
      borderRadius :15,
      marginLeft:'5%',
      width : 100,
    },
    
    eventdescription:{
      color:"#fff",
      fontWeight: 'bold',
      alignSelf:"center",
      textAlign:"center"
    },

  
  });

export default Eventdata1;