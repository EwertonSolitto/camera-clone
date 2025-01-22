import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center"
  },
  bottomContainer: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    paddingInline: 16,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: 'row'
  },
  bottomButton: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99
  },
  playButton: {
    position: "absolute",
    bottom: "9%",
    zIndex: 100
  },
  sliderContainer: {
    width: 600,
    height: 56,
    left: "39%",
    top: "45%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
    transform: [{rotate: '90deg'}]
  },
  slider: {
    height: 10,
    width: 524,
    transform: [{rotate: '180deg'}]
  }
});