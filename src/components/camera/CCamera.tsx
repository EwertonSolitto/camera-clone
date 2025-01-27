import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Camera, CameraMode, CameraType, CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { CMessage } from '../message/CMessage';
import { styles } from './styles';
import Slider from '@react-native-community/slider';
import { CButton } from '../button/CButton';

export function CCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [zoom, setZoom] = useState<number>(0)
  const [showZoom, setShowZoom] = useState<boolean>(false)
  const [flash, setFlash] = useState<boolean>(false)
  const [mode, setMode] = useState<CameraMode>("picture")
  const [recording, setRecording] = useState(false);

  const camRef = useRef<CameraView | null>(null)

  const [cameraPermission, cameraRequestPermission] = useCameraPermissions();
  const [mediaPermission, mediaRequestPermission] = MediaLibrary.usePermissions();
  const [microphonePermission, microphoneRequestPermission] = useMicrophonePermissions()

  useEffect(() => {
    if(mode === 'video') {
      setShowZoom(false)
      setZoom(0)
    }
  }, [mode])

  useEffect(() => {
    (async () => {
      cameraRequestPermission()
    })();

    (async () => {
      mediaRequestPermission()
    })();

    (async () => {
      microphoneRequestPermission()
    })
  }, [])

  if (!cameraPermission?.granted) {
    return <CMessage permission={cameraRequestPermission} message="We need your permission to show the camera."/>
  }

  if (!mediaPermission?.granted) {
    return <CMessage permission={mediaRequestPermission} message="We need your permission to use your media."/>
  }

  if (!microphonePermission?.granted) {
    return <CMessage permission={microphoneRequestPermission} message="We need your permission to use your microphone."/>
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

  async function takeVideo() {
    setRecording(true)
    camRef.current?.recordAsync({
      maxDuration: 10
    }).then((data) => {
      if(data) {
        MediaLibrary.saveToLibraryAsync(data.uri)
      }
      setRecording(false)
    }).catch((error) => {
      setRecording(false)
      console.log(error)
    })
  }

  function stopVideo() {
    camRef.current?.stopRecording()
    setRecording(false)
  }
  

  function pressButton() {
    if(mode === 'picture') {
      takePicture()
    } else if(mode === 'video') {
      if(!recording) {
        takeVideo()
      } else if(recording) {
        stopVideo()
      }
    }
  }

  function toggleShowZoom() {
    setShowZoom(!showZoom)
  }

  function toggleFlash() {
    setFlash(!flash)
  }

  return (
    <CameraView 
      style={styles.camera} 
      facing={facing} 
      ref={camRef}
      zoom={zoom}
      enableTorch={flash}
      mode={mode}
      videoQuality='1080p'
      ratio='16:9'
    >
      <View style={styles.cameraModeChangerContainer}>
        <CButton text='Photo' func={() => setMode('picture')} active={mode === 'picture'}/>
        <CButton text='Video' func={() => setMode('video')} active={mode === 'video'}/>
      </View>

      <View style={styles.scopeContainer}>
        <View style={styles.scope}></View>
      </View>
      
      <View style={[styles.sliderContainer, mode === 'video' && {display: 'none'}]}>
        <Slider
          value={zoom}
          onValueChange={value => setZoom(value)}
          style={showZoom ? styles.slider : { display: 'none' }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#505050"
          thumbTintColor="cyan"
        />
        <TouchableOpacity onPress={toggleShowZoom}>
          <FontAwesome6 name="magnifying-glass" size={48} color={showZoom ? "white" : "#121212"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.playButton} onPress={pressButton}>
        <FontAwesome6 name="dot-circle" size={80} color={recording ? 'red' : "white"} />
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
       <TouchableOpacity onPress={toggleFlash} style={[styles.bottomButton]}>
          <FontAwesome6 name="lightbulb" size={48} color={flash ? "white" : "#121212"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleCameraFacing} style={styles.bottomButton}>
          <FontAwesome6 name="camera-rotate" size={48} color="white" />
        </TouchableOpacity>
      </View>

    </CameraView>
  );
}