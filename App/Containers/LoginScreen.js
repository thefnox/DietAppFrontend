import React, { Component } from 'react'
import {
  Form,
  Button,
  Text,
  Item,
  Label,
  Input,
  Container,
  Content,
  H1,
} from 'native-base';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Selectors } from '../Redux/DietPlannerRedux'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux'
import { authorize } from 'react-native-app-auth';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  state = {
    isSigninInProgress: false,
    username: '',
    password: ''
  }

  _signIn = async () => {
    const { navigation, login } = this.props
    const {navigate} = navigation
    
    login(this.state.username, this.state.password)
    //navigate('DiaryList');
    console.log('lmao!')
  }

  render () {
    const {loggedIn, error, navigation} = this.props
    const {navigate} = navigation

    if (loggedIn) {
      navigate('DiaryList')
    }

    return (
      <Container>
        <Grid>
          <Row style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
            <H1 style={{ flex: 1, textAlign: 'center' }}>Diet Schemer</H1>
          </Row>
          <Row style={{height: 50}}>
            {
              error ? (
                <Text>{error}</Text>
              ) : null
            }
          </Row>
          <Row style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Form style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
              <Item style={{ width: 200 }} floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={(username) => this.setState({username})} />
              </Item>
              <Item style={{ width: 200 }} floatingLabel>
                <Label>Password</Label>
                <Input style={{ width: 200 }} onChangeText={(password) => this.setState({password})} secureTextEntry={true}  />
              </Item>
              <Item style={{ width: 200 }}>
                <Button style={{ width: 200 }}  success onPress={() => this._signIn()}>
                  <Text >Log In</Text>
                </Button>
              </Item>
              <Item last style={{ width: 200 }}>
                <Button  style={{ width: 200 }} info onPress={() => navigate('RegisterScreen')}>
                  <Text>Register</Text>
                </Button>
              </Item>
            </Form>
          </Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: Selectors.getError(state),
    loggedIn: Selectors.authed(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch({ type: 'LOGIN', username, password }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
