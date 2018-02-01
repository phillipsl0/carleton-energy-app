import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, Dimensions,
  View, Text, Image, WebView, TouchableOpacity, Platform } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import buildings from './Buildings';
import OverviewCards from './overview/OverviewCards';
import { getCurrentBuildingUtilityConsumption } from './helpers/ApiWrappers.js';


class BuildingListView extends Component {

    render() {
        const {navigate} = this.props.navigation;

        // console.log(this.props);
        // console.log(Dimensions.get('window').width)

        return (
          <FlatList
              data={buildings}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <ListItem
                    style={styles.listItem}
                    title={item.name}
                    titleStyle={styles.text}
                    subtitle={<View><Text style={styles.subtitleText}>
                                {getCurrentBuildingUtilityConsumption(item.name, "water").toFixed(1)}
                                &nbsp;gallons per hour</Text></View>}
                    avatar={<Avatar
                              style={styles.listImg}
                              source={{ uri: item.avatar }}
                              containerStyle={{alignSelf: 'stretch'}} />}
                    onPress={() => this.props.navigation.navigate('CardView', {item:item})}
                />
             )}
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
      screen: OverviewCards,
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
  // card: {
  //   paddingTop: 20,
  // },
  // bigyellow: {
  //   color: 'green',
  //   fontWeight: 'bold',
  //   fontSize: 30
  //   },
  // blue: {
  //   color: 'blue',
  //   fontWeight: 'bold',
  //   },
  //   head: {
  //     backgroundColor: 'grey',
  //   },
  // table: { 
  //   // width: 250,
  //   marginLeft: 5, 
    
  // },
  text: { 
    // alignSelf: 'center',
    marginLeft: 15, 
    fontSize: 18,
    color: 'white'
  },
  listItem: {
    height: 80,
    backgroundColor: '#0B5091',
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
  // row: {
  //   backgroundColor: 'orange',
  // },
  // view: {
  //   alignItems: 'center',
  //   backgroundColor: 'yellow'
  // },
  // img: {
  //   alignSelf: 'stretch',
  //   height: 100,
  // },
})

export default BuildingStack;