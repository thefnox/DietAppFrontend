import React, { Component } from 'react'
import {
  Container,
  H1,
} from 'native-base';
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {

  state = {
    isSigninInProgress: false,
  }

  async componentDidMount() {
    const {navigate} = this.props.navigation
    GoogleSignin.configure({
      scopes:['https://dietschemer.com/auth/google/callback'],
      webClientId: '746283349516-bkipp3emlc25doop2ddps10r7objsr6f.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false,
    });
    const signedIn = await GoogleSignin.isSignedIn()
    console.log(signedIn)
    if (!signedIn) {
      navigate('LoginScreen');
    } else {
      const currentUser = await GoogleSignin.getCurrentUser()
      console.log(currentUser)
      navigate('DiaryList');
    }
  }

  render () {
    return (
      <Container>
        <Grid>
          <Row style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
            <H1 style={{ flex: 1, textAlign: 'center' }}>Diet Schemer</H1>
          </Row>
        </Grid>
      </Container>
    )
  }
}
