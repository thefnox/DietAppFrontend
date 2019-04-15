import React from 'react'
import { ListView } from 'react-native';
import {
  Body,
  Title,
  Drawer,
  Left,
  DatePicker,
  Fab,
  Button,
  Icon,
  View,
  Container,
  Right,
  Header,
  Content,
  List,
  ListItem,
  Text 
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SideBar from '../Components/SideBar'
import { connect } from 'react-redux'

import styles from './Styles/DiaryListStyle'

class DiaryList extends React.PureComponent {
  state = {
    diaryEntries: [
      {id: 1, name: 'First Title', calories: 100, carbs: 100, fat: 100, protein: 100},
      {id: 2, name: 'Second Title', calories: 234, carbs: 100, fat: 100, protein: 100},
      {id: 3, name: 'Third Title', calories: 123, carbs: 100, fat: 100, protein: 100},
      {id: 4, name: 'Fourth Title', calories: 523, carbs: 100, fat: 100, protein: 100},
      {id: 5, name: 'Fifth Title', calories: 521, carbs: 100, fat: 100, protein: 100},
      {id: 6, name: 'Sixth Title', calories: 123, carbs: 100, fat: 100, protein: 100},
      {id: 7, name: 'Seventh Title', calories: 412, carbs: 100, fat: 100, protein: 100},
      {id: 11, name: 'First Title', calories: 100, carbs: 100, fat: 100, protein: 100},
      {id: 12, name: 'Second Title', calories: 234, carbs: 100, fat: 100, protein: 100},
      {id: 13, name: 'Third Title', calories: 123, carbs: 100, fat: 100, protein: 100},
      {id: 14, name: 'Fourth Title', calories: 523, carbs: 100, fat: 100, protein: 100},
      {id: 15, name: 'Fifth Title', calories: 521, carbs: 100, fat: 100, protein: 100},
      {id: 16, name: 'Sixth Title', calories: 123, carbs: 100, fat: 100, protein: 100},
      {id: 17, name: 'Seventh Title', calories: 412, carbs: 100, fat: 100, protein: 100}
    ],
    active: false
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => {
    this.drawer._root.open()
  }

  render () {
    const { diaryEntries } = this.state
    const { navigate } = this.props.navigation
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <Drawer
        ref={(ref) => { this.drawer = ref }}
        content={<SideBar navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()}>
        <Container>
          <Header span>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Grid style={{ width: 250 }}>
                <Row style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch' }}>
                  <DatePicker
                    style={{ width: 200 }}
                    defaultDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    textStyle={{ color: "white" }}
                    placeHolderTextStyle={{ color: "#ffffff" }}
                    onDateChange={this.setDate}
                    disabled={false}
                    />
                </Row>
                <Row>
                  <Col>
                    <Text style={{ flex: 1, color: "#ffffff", textAlign: 'center' }}>{ `Calories\n${diaryEntries.reduce((sum, entry) => (sum + parseInt(entry.calories)), 0)}`} </Text>
                  </Col>
                  <Col>
                  < Text style={{ flex: 1, color: "#ffffff", textAlign: 'center' }}>{ `Carbs\n${diaryEntries.reduce((sum, entry) => (sum + parseInt(entry.carbs)), 0)}g`} </Text>
                  </Col>
                  <Col>
                    <Text style={{ flex: 1, color: "#ffffff", textAlign: 'center' }}>{ `Fat\n${diaryEntries.reduce((sum, entry) => (sum + parseInt(entry.fat)), 0)}g`} </Text>
                  </Col>
                  <Col>
                    <Text style={{ flex: 1, color: "#ffffff", textAlign: 'center' }}>{ `Protein\n${diaryEntries.reduce((sum, entry) => (sum + parseInt(entry.protein)), 0)}g`} </Text>
                  </Col>
                </Row>
              </Grid>
            </Body>
            <Right />
          </Header>
          <Content>
            <List
              leftOpenValue={75}
              rightOpenValue={-75}
              dataSource={this.ds.cloneWithRows( diaryEntries )}
              renderRow={data =>
                <ListItem>
                  <Text>{ `${data.name} (${data.calories})` }</Text>
                </ListItem>}
              renderLeftHiddenRow={data =>
                <Button full onPress={() => navigate('EditEntryScreen', { entry: data }) }>
                  <Icon active name="create" />
                </Button>}
              renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                  <Icon active name="trash" />
                </Button>}
            />
          </Content>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="add" />
            <Button style={{ backgroundColor: '#44DD51' }} onPress={() => navigate('AddFoodScreen') }>
              <Icon name="add" />
            </Button>
            <Button style={{ backgroundColor: '#DD5144' }} onPress={() => navigate('ScanFoodScreen') }>
              <Icon name="barcode" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={ () => navigate('SearchFoodScreen') }>
              <Icon name="search" />
            </Button>
          </Fab>
        </Container>
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryList)
