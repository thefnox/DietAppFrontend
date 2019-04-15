import React, { Component } from 'react'
import { Label, Text, Button, Icon, Container, Left, Body, Title, Header, Content, Form, Item, Input } from 'native-base';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditEntryScreenStyle'

class EditEntryScreen extends Component {
  state = {
    barcode: null,
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    sodium: 0,
    sugar: 0,
    portions: 1
  }


  render () {
    const { state } = this

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Edit Entry</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Barcode</Label>
              <Input disabled={true} defaultValue={ barcode ? barcode.data : '' } />
            </Item>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input disabled={true} defaultValue={state.name} />
            </Item>
            <Item floatingLabel>
            <Label>Calories</Label>
              <Input disabled={true} defaultValue={state.calories}/>
            </Item>
            <Item floatingLabel>
            <Label>Fat (g)</Label>
              <Input disabled={true} defaultValue={state.fat}/>
            </Item>
            <Item floatingLabel>
            <Label>Protein (g)</Label>
              <Input disabled={true} defaultValue={state.protein}/>
            </Item>
            <Item floatingLabel>
            <Label>Carbs (g)</Label>
              <Input disabled={true} defaultValue={state.carbs}/>
            </Item>
            <Item floatingLabel>
              <Label>Sodium (mg)</Label>
              <Input disabled={true} defaultValue={state.sodium}/>
            </Item>
            <Item floatingLabel>
              <Label>Sugar (g)</Label>
              <Input disabled={true} defaultValue={state.sugar}/>
            </Item>
            <Item floatingLabel>
              <Label>Portions</Label>
              <Input keyboardType={'numeric'} onChangeText={(portions) => this.setState({portions})} defaultValue={state.portions}/>
            </Item>
            <Item last>
              <Button onPress={() => this.onSubmit()}>
                <Text>
                  Edit Entry
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEntryScreen)
