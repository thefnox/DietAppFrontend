import React, { Component } from 'react'
import { Label, Text, Button, Icon, Container, Left, Body, Title, Header, Content, Form, Item, Input } from 'native-base';
import { connect } from 'react-redux'
import { Selectors } from '../Redux/DietPlannerRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddEntryScreenStyle'

class AddEntryScreen extends Component {
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
    const { navigation, food, diary, addEntry } = props
    const {
      portions
    } = state

    addEntry({ food: food.id, diary: diary.id, portions })
    navigation.navigate('DiaryList')
  }


  render () {
    const { state, props } = this
    const { food } = props

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
              <Input disabled={true} value={`${ food.barcode || '' }`} />
            </Item>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input disabled={true} value={`${food.name || ''}`} />
            </Item>
            <Item floatingLabel>
            <Label>Calories</Label>
              <Input disabled={true} value={`${food.calories || 0}`}/>
            </Item>
            <Item floatingLabel>
            <Label>Fat (g)</Label>
              <Input disabled={true} value={`${food.fat || 0}`}/>
            </Item>
            <Item floatingLabel>
            <Label>Protein (g)</Label>
              <Input disabled={true} value={`${food.protein || 0}`}/>
            </Item>
            <Item floatingLabel>
            <Label>Carbs (g)</Label>
              <Input disabled={true} value={`${food.carbs || 0}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Sodium (mg)</Label>
              <Input disabled={true} value={`${food.sodium || 0}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Sugar (g)</Label>
              <Input disabled={true} value={`${food.sugar || 0}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Portions</Label>
              <Input keyboardType={'numeric'} onChangeText={(portions) => this.setState({portions})} value={'1'}/>
            </Item>
            <Item last>
              <Button onPress={() => this.onSubmit()}>
                <Text>
                  Add Entry
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
    food: Selectors.selectCurrentFood(state),
    diary: Selectors.selectCurrentDiary(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEntry: (entry) => dispatch({ type: 'CREATE_ENTRY', entry}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEntryScreen)
