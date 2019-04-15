import React, { Component } from 'react'
import { Label, Text, Button, Icon, Container, Left, Body, Title, Header, Content, Form, Item, Input } from 'native-base';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditMeScreenStyle'

class EditMeScreen extends Component {
  state = {
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    sodium: 0,
    weight: 0,
    portions: 1
  }

  render () {
    const { state, props } = this

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add Food</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Daily Calorie Target</Label>
              <Input keyboardType={'numeric'} onChangeText={(calories) => this.setState({calories})} defaultValue={state.calories}/>
            </Item>
            <Item floatingLabel>
              <Label>Daily Carbs Target (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(carbs) => this.setState({carbs})} defaultValue={state.carbs}/>
            </Item>
            <Item floatingLabel>
              <Label>Daily Fat Target (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(fat) => this.setState({fat})} defaultValue={state.fat}/>
            </Item>
            <Item floatingLabel>
              <Label>Daily Protein Target (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(protein) => this.setState({protein})} defaultValue={state.protein}/>
            </Item>
            <Item floatingLabel>
              <Label>Weight (kg)</Label>
              <Input keyboardType={'numeric'} onChangeText={(weight) => this.setState({weight})} defaultValue={state.weight}/>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMeScreen)
