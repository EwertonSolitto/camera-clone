import React from 'react';
import { Pressable, Text } from 'react-native';

import { styles } from './styles';

type TButton = {
  text: string,
  func: () => void,
  active: boolean
}

export function CButton({text, func, active}: TButton) {
  return (
    <Pressable onPress={func} disabled={active}>
      <Text style={[styles.text, active && styles.actived]}>{text}</Text>
    </Pressable>
  );
}