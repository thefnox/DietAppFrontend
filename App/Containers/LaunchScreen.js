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
      scopes: ['https://dietschemer.com'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: ' 236698486388-lfrk1c89cccgiqk7km5ah831gaqcu5um.apps.googleusercontent.com ', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
    });
    const signedIn = await GoogleSignin.isSignedIn()
    console.log(signedIn)
    if (!signedIn) {
      navigate('LoginScreen');
    } else {
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
