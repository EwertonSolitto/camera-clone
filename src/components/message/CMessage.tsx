import React from 'react';
import { Button, Text, View } from 'react-native';

import { styles } from './styles';
import { PermissionResponse } from 'expo-camera';

export function CMessage({permission, message}: {
  permission: () => Promise<PermissionResponse>, 
  message: string
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={permission} title="grant permission" />
    </View>
);
}