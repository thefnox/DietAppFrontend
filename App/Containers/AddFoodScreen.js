import React, { Component } from 'react'
import { Label, Text, Button, Icon, Container, Left, Body, Title, Header, Content, Form, Item, Input } from 'native-base';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddFoodScreenStyle'

class AddFoodScreen extends Component {

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

  onSubmit = () => {
    const { props, state } = this 
    const { navigation } = props
    const {
      name,
      calories,
      fat,
      carbs,
      protein,
      sodium,
      sugar,
      portions
    } = state
    const barcodes = navigation.getParam('barcodes', [])
    const barcode = barcodes[0]

    navigation.navigate('DiaryList')
  }

  render () {
    const { props, state } = this 
    const { navigation } = props
    const barcodes = navigation.getParam('barcodes', [])
    const barcode = barcodes[0]
    console.log(barcode)

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
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
              <Label>Barcode</Label>
              <Input disabled={true} defaultValue={ barcode ? barcode.data : '' } />
            </Item>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={(name) => this.setState({name})} defaultValue={state.name} />
            </Item>
            <Item floatingLabel>
            <Label>Calories</Label>
              <Input keyboardType={'numeric'} onChangeText={(calories) => this.setState({calories})} defaultValue={state.calories}/>
            </Item>
            <Item floatingLabel>
            <Label>Fat (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(fat) => this.setState({fat})} defaultValue={state.fat}/>
            </Item>
            <Item floatingLabel>
            <Label>Protein (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(protein) => this.setState({protein})} defaultValue={state.protein}/>
            </Item>
            <Item floatingLabel>
            <Label>Carbs (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(carbs) => this.setState({carbs})} defaultValue={state.carbs}/>
            </Item>
            <Item floatingLabel>
              <Label>Sodium (mg)</Label>
              <Input keyboardType={'numeric'} onChangeText={(sodium) => this.setState({sodium})} defaultValue={state.sodium}/>
            </Item>
            <Item floatingLabel>
              <Label>Sugar (g)</Label>
              <Input keyboardType={'numeric'} onChangeText={(sugar) => this.setState({sugar})} defaultValue={state.sugar}/>
            </Item>
            <Item floatingLabel>
              <Label>Portions</Label>
              <Input keyboardType={'numeric'} onChangeText={(portions) => this.setState({portions})} defaultValue={state.portions}/>
            </Item>
            <Item last>
              <Button onPress={() => this.onSubmit()}>
                <Text>
                  Add Food
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFoodScreen)
