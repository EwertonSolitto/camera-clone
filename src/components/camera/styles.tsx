import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  bottomContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "#121212",
    position: "absolute",
    bottom: 0,
    paddingInline: 16,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  bottomButton: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  }
});