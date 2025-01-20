import React, { useEffect, useRef, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { CMessage } from '../message/CMessage';
import { styles } from './styles';

export function CCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
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

  return (
    <CameraView style={styles.camera} facing={facing} ref={camRef}>

      <TouchableHighlight style={styles.playButton} onPress={takePicture}>
        <FontAwesome6 name="dot-circle" size={80} color="white" />
      </TouchableHighlight>

      <View style={styles.bottomContainer}>
        <TouchableHighlight onPress={toggleCameraFacing} style={styles.bottomButton}>
          <FontAwesome6 name="camera-rotate" size={56} color="white" />
        </TouchableHighlight>
      </View>

    </CameraView>
  );
}