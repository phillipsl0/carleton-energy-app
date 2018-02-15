import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, Dimensions,
  View, Text, Image, WebView, TouchableOpacity, Platform } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar, Header } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import buildings from './Buildings';
import IndividualBuilding from './IndividualBuilding';
import BuildingComparison from './BuildingComparison';
import OverviewCards from './overview/OverviewCards';
import { getCurrentBuildingUtilityConsumption } from './helpers/ApiWrappers.js';
import  ComparisonPage from './ComparisonPage';
import { scale, moderateScale, verticalScale} from './helpers/Scaling';

class BuildingListView extends Component {

    renderItem = (item) => {
        return <View style={{marginTop:7, marginLeft: 7, marginRight: 7, borderWidth: 1, borderColor:'#cbd2d9', borderRadius:3, backgroundColor:'white',}}>
            <Text style={styles.header}>{item.item.name}</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white',}}>
                <Image
                style={{alignItems:'center', width:75, borderColor:'white', borderWidth:1, marginBottom:3, marginLeft:3}} source={{uri: item.item.avatar}}/>
                <View style={{flex: 1, flexDirection: 'column', paddingTop:'2%'}}>
                    <Text style={styles.text}>Electricity: {item.item.electricity}</Text>
                    <Text style={styles.text}>Water: {item.item.water}</Text>
                    <Text style={styles.text}>Heat: {item.item.heat}</Text>
                </View>
                <Button
                    rightIcon={{name: "angle-right", type: 'font-awesome', size: moderateScale(20)}}
                    fontSize={moderateScale(14)}
                    title='More Info'
                    style={{paddingBottom:20}}
                    containerViewStyle={styles.button}
                    backgroundColor='#0B5091'
                    onPress={() => this.props.navigation.navigate('CardView', {item:item.item})}/>
            </View>
        </View>
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
                <FlatList
                    data = {buildings}
                    renderItem={this.renderItem}
                    keyExtractor = {(item) => item.name}
                />
       );
    }
}


const BuildingStack = StackNavigator({
    Buildings: {
        screen: BuildingListView,
        navigationOptions: ({ navigation }) => ({
            title: 'Buildings',
            ...Platform.select({
                android: { header: null }
            }),
            headerTintColor: 'white',
            headerStyle: navStyles.header,
        }),
    },

    CardView: {
      screen: IndividualBuilding,
      path: 'buildings/:name',
      navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.item.name}`,
              headerTintColor: 'white',
              headerStyle: navStyles.header,
              headerTitleStyle: navStyles.headerTitle,
              headerBackTitleStyle: navStyles.headerTitle,
              headerBackTitle: 'Back',
            }),
    },
    Comparison: {
        screen: BuildingComparison,
        navigationOptions: ({ navigation }) => ({
            title: 'Building Comparison',
            ...Platform.select({
                android: { header: null }
            }),
            headerTintColor: 'white',
            headerStyle: navStyles.header,
        }),
    },
    ComparisonPage: {
        screen: ComparisonPage,
        navigationOptions: ({ navigation }) => ({
            title: 'Compare',
            ...Platform.select({
                android: { header: null }
            }),
            headerTintColor: 'white',
            headerStyle: navStyles.header,
        }),
    },
});

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
})

const styles = StyleSheet.create({
  card: {
    paddingTop: 20,
  },
  bigyellow: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 30
    },
  blue: {
    color: 'blue',
    fontWeight: 'bold',
    },
    head: {
      backgroundColor: 'grey',
    },
  table: {
    width: 250,
    marginLeft: 5,

  },
  text: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: moderateScale(16),
    color: 'darkslategrey',
  },
  listItem: {
    height: 50,
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width - 0, //300,
    marginLeft: '25%',
    marginRight: '25%',
    alignSelf: 'center',
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 20,
    // color: 'silver'
    // paddingBottom: 55,
  },
  subtitleText: {
    paddingTop: 5,
    paddingRight: 40,
    paddingLeft: 20,
    color: 'silver',
    fontSize: 15
  },
  listImg: {
    height: 30,
    alignSelf: 'stretch',
  },
  listText: {
    paddingLeft: 30,
    marginLeft: 30,
    fontSize: 24,
  },
  row: {
    backgroundColor: 'orange',
  },
  button: {
    marginTop: '3%',

  },
  view: {
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  img: {
    alignSelf: 'stretch',
    height: 100,
  },
  header: {
      fontSize: moderateScale(18),
      color:'darkslategrey',
      paddingLeft: 3,
      backgroundColor: 'white',
      fontWeight: 'bold',
      alignSelf: 'flex-start',
  }
})

export default BuildingStack;
