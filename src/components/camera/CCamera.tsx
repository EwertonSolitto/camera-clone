import React, { useEffect, useRef, useState } from 'react';
import { TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, CameraView, FlashMode, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { CMessage } from '../message/CMessage';
import { styles } from './styles';
import Slider from '@react-native-community/slider';

export function CCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [zoom, setZoom] = useState<number>(0)
  const [showZoom, setShowZoom] = useState<boolean>(false)
  const [flash, setFlash] = useState<boolean>(false)

  const camRef = useRef<CameraView | null>(null)

  const [cameraPermission, cameraRequestPermission] = useCameraPermissions();
  const [mediaPermission, mediaRequestPermission] = MediaLibrary.usePermissions();


  useEffect(() => {
    (async () => {
      cameraRequestPermission()
    })();

    (async () => {
      mediaRequestPermission()
    })();
  }, [])

  if (!cameraPermission?.granted) {
    return <CMessage permission={cameraRequestPermission} message="We need your permission to show the camera."/>
  }

  if (!mediaPermission?.granted) {
    return <CMessage permission={mediaRequestPermission} message="We need your permission to use your media."/>
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    const picture = await camRef.current?.takePictureAsync()

    if(picture) {
      MediaLibrary.createAssetAsync(picture.uri)
    }
  }

  function toggleShowZoom() {
    setShowZoom(!showZoom)
  }

  function toggleFlash() {
    setFlash(!flash)
  }

  return (
    <CameraView 
      style={styles.camera} 
      facing={facing} 
      ref={camRef}
      zoom={zoom}
      enableTorch={flash}
    >

      <View style={styles.sliderContainer}>
        <Slider
          value={zoom}
          onValueChange={value => setZoom(value)}
          style={showZoom ? styles.slider : { display: 'none' }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#505050"
          thumbTintColor="cyan"
        />
        <TouchableOpacity onPress={toggleShowZoom}>
          <FontAwesome6 name="magnifying-glass" size={48} color={showZoom ? "white" : "#121212"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.playButton} onPress={takePicture}>
        <FontAwesome6 name="dot-circle" size={80} color="white" />
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
       <TouchableOpacity onPress={toggleFlash} style={[styles.bottomButton]}>
          <FontAwesome6 name="lightbulb" size={48} color={flash ? "white" : "#121212"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleCameraFacing} style={styles.bottomButton}>
          <FontAwesome6 name="camera-rotate" size={48} color="white" />
        </TouchableOpacity>
      </View>

    </CameraView>
  );
}