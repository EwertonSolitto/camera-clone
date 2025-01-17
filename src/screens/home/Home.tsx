import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { Camera } from 'expo-camera';
import { CCamera } from '../../components/camera/CCamera';

export function Home() {
  return (
    <View style={styles.container}>
      <CCamera />
    </View>
  );
}