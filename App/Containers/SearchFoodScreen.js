import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { List, ListItem, Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import { connect } from 'react-redux'
import { Selectors } from '../Redux/DietPlannerRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SearchFoodScreenStyle'

class SearchFoodScreen extends Component {
  
  state = {
    searchList: [
      {id: 1, name: 'First Title', description: 'First Description'},
      {id: 2, name: 'Second Title', description: 'Second Description'},
      {id: 3, name: 'Third Title', description: 'Third Description'},
      {id: 4, name: 'Fourth Title', description: 'Fourth Description'},
      {id: 5, name: 'Fifth Title', description: 'Fifth Description'},
      {id: 6, name: 'Sixth Title', description: 'Sixth Description'},
      {id: 7, name: 'Seventh Title', description: 'Seventh Description'}
    ]
  }

  render () {
    const { props } = this
    const { search, searchList, searchString, navigation, setFood } = props
    const { navigate } = navigation
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input  onChangeText={text => search(text)}/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <List>
          {
            searchList.length > 0 ?
              searchList.map(entry => (
                <ListItem onPress={ () => {
                  navigate('AddEntryScreen')
                  setFood(entry)
                }} key={ entry.id }>
                  <Text>{ entry.name }</Text>
                </ListItem>
              ))
            : (
              <Text>No results</Text>
            )
          }
        </List>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchList: Selectors.selectSearchResults(state),
    searchString: Selectors.selectSearchString(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (name) => dispatch({ type: 'SEARCH_NAME', name }),
    setFood: (food) => dispatch({type: 'SET_CURRENT_FOOD', food })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFoodScreen)
