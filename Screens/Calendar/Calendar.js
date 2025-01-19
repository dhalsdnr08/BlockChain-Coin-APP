import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { format } from "date-fns";
import { useNavigation } from '@react-navigation/native';


function CalendarScreen() {
  
  const markedDates = ((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

  const navigation = useNavigation();

  return (
    
    <SafeAreaView style={styles.container}>
      <Agenda
        markedDates={markedSelectedDates}
        theme={{
          selectedDayBackgroundColor: '#009688',
          arrowColor: '#009688',
          dotColor: '#009688',
          todayTextColor: '#009688',
        }} 
        onDayPress={(day) => {
          setSelectedDate(day.dateString)
        }} 
        items={{
          '2023-05-01': [{name: '목포 항구축제' }],
          '2023-05-08': [{name: '목포대학교 체육대회'}],
          '2023-05-09': [{name: '목포 항구축제' }],
        }}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Event1')}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  }
});

export default CalendarScreen;