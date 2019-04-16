import React, { Component } from 'react'
import { Label, Text, Button, Icon, Container, Left, Body, Title, Header, Content, Form, Item, Input } from 'native-base';
import { connect } from 'react-redux'
import { Selectors } from '../Redux/DietPlannerRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditMeScreenStyle'

class EditMeScreen extends Component {
  state = {
    name: '',
    calorieTarget: 0,
    fatTarget: 0,
    carbTarget: 0,
    proteinTarget: 0,
    sodium: 0,
    weight: 0,
    portions: 1
  }
  
  changeWeight = () => {

  }

  onSubmit = () => {
    const { calorieTarget, fatTarget, carbTarget, proteinTarget } = this.state
    const { editMe, navigation } = this.props
    editMe({ calorieTarget, fatTarget, carbTarget, proteinTarget })
    navigation.goBack()
  }

  render () {
    const { state, props } = this
    const { me } = props

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>My Profile</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Daily Calorie Target</Label>
              <Input keyboardType={'numeric'} onChangeText={(calorieTarget) => this.setState({calorieTarget})} defaultValue={`${me.calorieTarget}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Daily Carbs Target (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(carbTarget) => this.setState({carbTarget})} defaultValue={`${me.carbTarget}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Daily Fat Target (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(fatTarget) => this.setState({fatTarget})} defaultValue={`${me.fatTarget}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Daily Protein Target (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(proteinTarget) => this.setState({proteinTarget})} defaultValue={`${me.proteinTarget}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Weight (kg)</Label>
              <Input keyboardType={'numeric'} onChangeText={(weight) => this.setState({weight})} defaultValue={`${me.weight}`}/>
            </Item>
            <Item last>
              <Button onPress={() => this.changeWeight()}>
                <Text>
                  Change Weight
                </Text>
              </Button>
            </Item>
            <Item last>
              <Button onPress={() => this.onSubmit()}>
                <Text>
                  Submit
                </Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    me: Selectors.selectMe(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editMe: (body) => dispatch({ type: 'UPDATE_MY_INFO', body})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMeScreen)
