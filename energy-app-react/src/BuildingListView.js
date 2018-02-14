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

class BuildingListView extends Component {

    renderHeader = (headerItem) => {
        return <Text style={styles.header}>{headerItem.section.name}</Text>
    }

    renderItem = (item) => {
        return <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'black',
        borderBottomWidth: 1}}>
            <Image
            style={{alignItems:'center', width:60, paddingBottom:"10%"}} source={{uri: item.item.avatar}}/>
            <View style={{flex: 1, flexDirection: 'column', paddingTop:'2%'}}>
                <Text style={styles.text}>Electricity: {item.item.electricity}</Text>
                <Text style={styles.text}>Water: {item.item.water}</Text>
                <Text style={styles.text}>Heat: {item.item.heat}</Text>
            </View>
            <Button
                rightIcon={{name: "angle-right", type: 'font-awesome', size: 20}}
                fontSize={14}
                title='More Info'
                style={{paddingBottom:20}}
                containerViewStyle={styles.button}
                backgroundColor='#0B5091'
                onPress={() => this.props.navigation.navigate('CardView', {item:item.item})}/>
        </View>
    }
    

    render() {
        const {navigate} = this.props.navigation;

        return (
            <List>
                <SectionList
                    sections = {buildings}
                    renderSectionHeader={this.renderHeader}
                    renderItem={this.renderItem}
                    keyExtractor = {(item) => item.name}
                />
            </List>
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


// styles.listItem
// styles.text
// styles.subtitleText
// styles.listImg
// navStyles.header
// navStyles.header
// navStyles.headerTitle
// navStyles.headerTitle

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
    fontSize: 12,
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
      backgroundColor:'#f4f8ff',
      fontSize: 20,
      paddingLeft: 5,
      paddingTop: 5
  }
})

export default BuildingStack;
