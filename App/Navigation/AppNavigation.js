import { createStackNavigator, createAppContainer } from 'react-navigation'
import AddWeightEntryScreen from '../Containers/AddWeightEntryScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import AddEntryScreen from '../Containers/AddEntryScreen'
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
  AddWeightEntryScreen: { screen: AddWeightEntryScreen },
  RegisterScreen: { screen: RegisterScreen },
  AddEntryScreen: { screen: AddEntryScreen },
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
