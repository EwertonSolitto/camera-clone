import React, { useEffect, useState } from 'react';

import { styles } from './styles';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { CMessage } from '../message/CMessage';

export function CCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      requestPermission()
    })()
  }, [])

  if (!permission) {
    return <CMessage permission={requestPermission} />
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <CameraView style={styles.camera} facing={facing}>


    </CameraView>
  );
}