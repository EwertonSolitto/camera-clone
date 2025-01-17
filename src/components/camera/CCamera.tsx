import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import { styles } from './styles';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';

export function CCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      requestPermission()
    })()
  }, [])

  if (!permission) {
    
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <CameraView style={styles.camera} facing={facing}>


    </CameraView>
  );
}