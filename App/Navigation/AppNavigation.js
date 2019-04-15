import { createStackNavigator, createAppContainer } from 'react-navigation'
import WeightProgressScreen from '../Containers/WeightProgressScreen'
import SearchFoodScreen from '../Containers/SearchFoodScreen'
import ScanFoodScreen from '../Containers/ScanFoodScreen'
import EditMeScreen from '../Containers/EditMeScreen'
import AddFoodScreen from '../Containers/AddFoodScreen'
import EditEntryScreen from '../Containers/EditEntryScreen'
import DiaryList from '../Containers/DiaryList'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  WeightProgressScreen: { screen: WeightProgressScreen },
  SearchFoodScreen: { screen: SearchFoodScreen },
  ScanFoodScreen: { screen: ScanFoodScreen },
  EditMeScreen: { screen: EditMeScreen },
  AddFoodScreen: { screen: AddFoodScreen },
  EditEntryScreen: { screen: EditEntryScreen },
  DiaryList: { screen: DiaryList },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
