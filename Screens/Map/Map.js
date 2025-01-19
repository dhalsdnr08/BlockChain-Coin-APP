import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';

const GoogleMap = () => {
 
  return(
  <View style={styles.screen}>
  	  <MapView // 셀프클로징해도 되지만 후의 마커를 위해서
		    style={styles.map}
		    initialRegion={{
        latitude: 34.780952,
        longitude: 126.383010,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
        }}
        provider={PROVIDER_GOOGLE}> 
    	
      
      <Marker
          coordinate={{latitude: 34.780952, longitude: 126.383010}}
          title="목포 항구축제"
          description="10월14일 ~ 10월16일"
        />
    
      </MapView>
  </View>
  )
  
}

export default GoogleMap

const styles = StyleSheet.create({
	screen:{
      flex:1
    },
  	map:{
	  width: "100%",
  	  height : "100%"
	}
})