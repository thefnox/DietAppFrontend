import React, { Component } from 'react'
import {
  Form,
  Button,
  Item,
  Label,
  Input,
  Container,
  Content,
  H1,
} from 'native-base';
import { Selectors } from '../Redux/DietPlannerRedux'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegisterScreenStyle'

class RegisterScreen extends Component {
  state = {
    email: '',
    username: '',
    password: ''
  }

  _register = () => {
    const { navigation, register } = this.props
    const { username, email, password } = this.state

    register(username, email, password)
  }

  render () {
    const {loggedIn, error, navigation} = this.props
    const {navigate, goBack} = navigation

    if (loggedIn) {
      navigate('DiaryList')
    }

    return (
      <Container>
        <Grid>
          <Row style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center'  }}>
            <H1 style={{ flex: 1, textAlign: 'center' }}>Diet Schemer</H1>
          </Row>
          <Row style={{height: 25}}>
            {
              error ? (
                <Text>{error}</Text>
              ) : null
            }
          </Row>
          <Row style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Form style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
            <Item style={{ width: 200 }} floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={(username) => this.setState({username})} />
              </Item>
              <Item style={{ width: 200 }} floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({email})} />
              </Item>
              <Item style={{ width: 200 }} floatingLabel>
                <Label>Password</Label>
                <Input style={{ width: 200 }} onChangeText={(password) => this.setState({password})} secureTextEntry={true}  />
              </Item>
              <Item style={{ width: 200 }}>
                <Button style={{ width: 200 }}  success onPress={() => this._register()}>
                  <Text >Register</Text>
                </Button>
              </Item>
              <Item last style={{ width: 200 }}>
                <Button  style={{ width: 200 }} info onPress={() => goBack()}>
                  <Text>Go Back</Text>
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
    register: (username, email, password) => dispatch({ type: 'REGISTER', username, email, password }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
