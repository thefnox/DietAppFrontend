import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Container, Button, Header, Content, H1, H2, H3, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import styles from './Styles/SideBarStyle'

export default class SideBar extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  logout = async () => {
    const { navigate } = this.props.navigation
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    navigate('LoginScreen')
  }

  render () {
    const { navigate } = this.props.navigation

    return (
      <Container>
        <Grid>
          <Row style={{ height: 50 }}>
            <Col>
              <H1 style={{ textAlign: 'center' }}>Diet Schemer</H1>
            </Col>
          </Row>
          <Row style={{ height: 30 }}>
            <Col>
              <H2>Menu</H2>
            </Col>
          </Row>
          <Row style={{ height: 50 }}>
            <Button transparent dark onPress={() => navigate('EditMeScreen')}>
              <Text >Edit Profile</Text>
            </Button>
          </Row>
          <Row style={{ height: 50 }}>
            <Button transparent dark onPress={() => navigate('WeightProgressScreen')}>
              <Text >Weight Progress</Text>
            </Button>
          </Row>
          <Row style={{ height: 50 }}>
            <Button transparent dark onPress={() => this.logout()}>
              <Text>Logout</Text>
            </Button>
          </Row>
        </Grid>
      </Container>
    )
  }
}
