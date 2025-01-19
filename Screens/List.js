import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Market1 from "../images/Market1.png"
import Market2 from "../images/Market2.png"
import Market3 from "../images/Market3.png"
import Market4 from "../images/Market4.png"


const Tab = createMaterialTopTabNavigator();

function ListScreen() {
    return (
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#fb8c00',
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={KoreanScreen}
          options={{
            tabBarIcon: ({color}) => <Icon name="fast-food-outline" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={ChinaScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="pizza-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={JapanScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="beer-outline" color={color} size={24} />
            ),
          }}
        />
        
      </Tab.Navigator>
    );
  }


  
  function KoreanScreen({navigation}) {
    return (
        <ScrollView>
        <View style = {styles.container}>
          <View style={styles.subContainerOne}>
            <View style={{flexDirection: 'row'}}>
                <Image source = {Market1} style = {styles.image}  />
                <Text style={styles.explanation}>
                  목포대학교 이모네{'\n'}{'\n'}
                  ⭐ 4.5/5{'\n'}{'\n'}
                  주 메뉴 : 제육볶음, 닭볶음
                  </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Image source = {Market2} style = {styles.image}  />
                <Text style={styles.explanation}>
                  목대 브리또{'\n'}{'\n'}
                  ⭐ 4.8/5{'\n'}{'\n'}
                  주 메뉴 : 섞어 약간 브리또
                  </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Image source = {Market3} style = {styles.image}  />
                <Text style={styles.explanation}>
                  이모네 칼국수{'\n'}{'\n'}
                  ⭐ 4.3/5{'\n'}{'\n'}
                  주 메뉴 : 바지락 칼국수
                  </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Image source = {Market4} style = {styles.image}  />
                <Text style={styles.explanation}>
                  도쿄라멘{'\n'}{'\n'}
                  ⭐ 4.0/5{'\n'}{'\n'}
                  주 메뉴 : 미소라멘, 돈코츠라멘
                  </Text>
            </View>
          </View>  
        </View>
        
        </ScrollView>
    )
  }
  
  function ChinaScreen({navigation}) {
    return (
      <ScrollView>
      <View style = {styles.container}>
        <View style={styles.subContainerOne}>
          <View style={{flexDirection: 'row'}}>
              <Image source = {Market1} style = {styles.image}  />
              <Text style={styles.explanation}>
                목포대학교 이모네{'\n'}{'\n'}
                ⭐ 4.5/5{'\n'}{'\n'}
                주 메뉴 : 제육볶음, 닭볶음
                </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
              <Image source = {Market1} style = {styles.image}  />
              <Text style={styles.explanation}>
                목포대학교 이모네{'\n'}{'\n'}
                ⭐ 4.5/5{'\n'}{'\n'}
                주 메뉴 : 제육볶음, 닭볶음
                </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
              <Image source = {Market1} style = {styles.image}  />
              <Text style={styles.explanation}>
                목포대학교 이모네{'\n'}{'\n'}
                ⭐ 4.5/5{'\n'}{'\n'}
                주 메뉴 : 제육볶음, 닭볶음
                </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
              <Image source = {Market1} style = {styles.image}  />
              <Text style={styles.explanation}>
                목포대학교 이모네{'\n'}{'\n'}
                ⭐ 4.5/5{'\n'}{'\n'}
                주 메뉴 : 제육볶음, 닭볶음
                </Text>
          </View>
        </View>  
      </View>
      
      </ScrollView>
        
        

    )
  }
  
  function JapanScreen({navigation}) {
    return (

      <ScrollView>
      <View style = {styles.container}>
        <View style={styles.subContainerOne}>
          <View style={{flexDirection: 'row'}}>
              <Image source = {Market1} style = {styles.image}  />
              <Text style={styles.explanation}>
                목포대학교 이모네{'\n'}{'\n'}
                ⭐ 4.5/5{'\n'}{'\n'}
                주 메뉴 : 제육볶음, 닭볶음
                </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
              <Image source = {Market1} style = {styles.image}  />
              <Text style={styles.explanation}>
                목포대학교 이모네{'\n'}{'\n'}
                ⭐ 4.5/5{'\n'}{'\n'}
                주 메뉴 : 제육볶음, 닭볶음
                </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
              <Image source = {Market1} style = {styles.image}  />
              <Text style={styles.explanation}>
                목포대학교 이모네{'\n'}{'\n'}
                ⭐ 4.5/5{'\n'}{'\n'}
                주 메뉴 : 제육볶음, 닭볶음
                </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
              <Image source = {Market1} style = {styles.image}  />
              <Text style={styles.explanation}>
                목포대학교 이모네{'\n'}{'\n'}
                ⭐ 4.5/5{'\n'}{'\n'}
                주 메뉴 : 제육볶음, 닭볶음
                </Text>
          </View>
        </View>
        
      </View>
      
      </ScrollView>
        

    )
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:5,
        
      },
      subContainerOne: {
        flex:5,
        backgroundColor:"#fff",
        
      },
      image:{
        width: 130,
        height: 150,
        resizeMode: "cover",
        margin:5
    },
    explanation:{
      padding:15,
      borderRadius:5,
    },
    starStyle:{
      width: 50,
      height: 50,
    }
    }
  )


export default ListScreen;


