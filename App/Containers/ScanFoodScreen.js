import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'
import { Selectors } from '../Redux/DietPlannerRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ScanFoodScreenStyle'

class ScanFoodScreen extends Component {

  state = {
    found: false,
    barcodes: []
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }


  render () {
    const { found, barcodes } = this.state
    const { food, fetching, navigation, search } = this.props
    const { navigate } = navigation

    if (!fetching && found) {
      console.log(food)
      if (food['barcode']) {
        navigate('AddEntryScreen')
      } else {
        navigate('AddFoodScreen', {barcodes})
      }
    }

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes)
            if (barcodes.length > 0) {
              if (!found && !fetching) {
                this.setState({ found: true, barcodes })
                search(barcodes[0].data)
              }
            }
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: Selectors.fetching(state),
    food: Selectors.selectCurrentFood(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (barcode) => dispatch({ type: 'SEARCH_BARCODE', barcode }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanFoodScreen)
