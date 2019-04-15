import React, { Component } from 'react'
import {
  Container,
  Content,
  H1,
} from 'native-base';
import { ScrollView, Text, View, KeyboardAvoidingView } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  state = {
    isSigninInProgress: false,
  }

  _signIn = async () => {
    const {navigate} = this.props.navigation
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      console.log({ userInfo })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      }
      console.warn(error)
      console.log(error.code)
    }
    navigate('DiaryList');
    console.log('lmao!')
  }

  render () {
    return (
      <Container>
        <Grid>
          <Row style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
            <H1 style={{ flex: 1, textAlign: 'center' }}>Diet Schemer</H1>
          </Row>
          <Row style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GoogleSigninButton
                  style={{ width: 192, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={() => this._signIn()}
                  disabled={this.state.isSigninInProgress} />
          </Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
