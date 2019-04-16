import React, { Component } from 'react'
import { Label, Text, Button, Icon, Container, Left, Body, Title, Header, Content, Form, Item, Input } from 'native-base';
import { connect } from 'react-redux'
import { Selectors } from '../Redux/DietPlannerRedux'
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

  onSubmit = () => {
    const { props, state } = this 
    const { navigation, entry, editEntry } = props
    const {
      portions
    } = state
    console.log(entry)
    const {
      id,
      diary,
      food
    } = entry

    editEntry(id, { portions })
    navigation.navigate('DiaryList')
  }

  render () {
    const { state, props } = this
    const { entry } = props

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
              <Input disabled={true} value={`${ entry.food.barcode || '' }`} />
            </Item>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input disabled={true} value={`${entry.food.name}`} />
            </Item>
            <Item floatingLabel>
            <Label>Calories</Label>
              <Input disabled={true} value={`${entry.food.calories}`}/>
            </Item>
            <Item floatingLabel>
            <Label>Fat (g)</Label>
              <Input disabled={true} value={`${entry.food.fat}`}/>
            </Item>
            <Item floatingLabel>
            <Label>Protein (g)</Label>
              <Input disabled={true} value={`${entry.food.protein}`}/>
            </Item>
            <Item floatingLabel>
            <Label>Carbs (g)</Label>
              <Input disabled={true} value={`${entry.food.carbs}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Sodium (mg)</Label>
              <Input disabled={true} value={`${entry.food.sodium}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Sugar (g)</Label>
              <Input disabled={true} value={`${entry.food.sugar}`}/>
            </Item>
            <Item floatingLabel>
              <Label>Portions</Label>
              <Input keyboardType={'numeric'} onChangeText={(portions) => this.setState({portions})} placeholder={`${entry.portions}`}/>
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
    entry: Selectors.selectCurrentEntry(state),
    diary: Selectors.selectCurrentDiary(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editEntry: (id, entry) => dispatch({ type: 'EDIT_ENTRY', id, entry})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEntryScreen)
