import React from 'react';
import { Button, Text, View } from 'react-native';

import { styles } from './styles';
import { PermissionResponse } from 'expo-camera';

export function CMessage({permission}: {permission: () => Promise<PermissionResponse>}) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>We need your permission to show the camera</Text>
      <Button onPress={permission} title="grant permission" />
    </View>
);
}