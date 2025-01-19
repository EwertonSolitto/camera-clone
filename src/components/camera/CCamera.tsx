import React, { useEffect, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { CMessage } from '../message/CMessage';
import { styles } from './styles';

export function CCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      requestPermission()
    })()
  }, [])

  if (!permission?.granted) {
    return <CMessage permission={requestPermission} />
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <CameraView style={styles.camera} facing={facing}>

      <View style={styles.bottomContainer}>
        <TouchableHighlight onPress={toggleCameraFacing} style={styles.bottomButton}>
          <FontAwesome6 name="camera-rotate" size={56} color="white" />
        </TouchableHighlight>
      </View>
    </CameraView>
  );
}