import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export default function CameraExample() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState('');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPreviewVisible(true);
      setCapturedImage(data);
      const fileName = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: data.uri, to: fileName });
      setCapturedImageUri(fileName);
    }
  };

  const savePicture = async () => {
    try {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos', { intermediates: true });
      const fileName = `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`;
      await FileSystem.moveAsync({ from: capturedImageUri, to: fileName });
      alert('Saved photo to ' + fileName);
      setPreviewVisible(false);
      setCapturedImage(null);
      setCapturedImageUri('');
    } catch (e) {
      console.log(e);
      alert('Error saving photo');
    }
  };

  // const switchCamera = () => {
  //   if (cameraType === Camera.Constants.Type.back) {
  //     setCameraType(Camera.Constants.Type.front);
  //   } else {
  //     setCameraType(Camera.Constants.Type.back);
  //   }
  // };

  const retakePicture = () => {
    setCapturedImage(null);
    setCapturedImageUri('');
    setPreviewVisible(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button} onPress={switchCamera}>
            <Text style={styles.buttonText}>Switch camera</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>사진 찍기</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {previewVisible && capturedImage ? (
        <View style={styles.preview}>
          <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancel} onPress={retakePicture}>
              <Text style={styles.cancelText}>다시 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.save} onPress={savePicture}>
              <Text style={styles.saveText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
      }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "black",
    },
    camera: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      marginBottom: 36,
      marginHorizontal: 20,
      alignSelf: "center",
    },
    button: {
      width: 80,
      height: 80,
      backgroundColor: "#ffffff",
      borderRadius: 40,
      alignSelf: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      marginBottom: 20,
    },
    buttonText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
    preview: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    previewImage: {
      width: "100%",
      height: "80%",
      borderRadius: 20,
    },
    cancel: {
      width: 80,
      height: 80,
      backgroundColor: "#ff0000",
      borderRadius: 40,
      alignSelf: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      marginBottom: 20,
    },
    cancelText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: "#ffffff",
    },
    save: {
      width: 80,
      height: 80,
      backgroundColor: "#008000",
      borderRadius: 40,
      alignSelf: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      marginBottom: 20,
    },
    saveText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: "#ffffff",
    },
  });
  