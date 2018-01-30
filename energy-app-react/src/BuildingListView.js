import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, View, Text, Image, WebView, TouchableOpacity } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import buildings from './Buildings';
import IndividualBuilding from './IndividualBuilding';


class BuildingListView extends Component {
    static navigationOptions = {
        title: 'Buildings'
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
         // <List>
          <FlatList
              data={buildings}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <ListItem
                    style={styles.listItem}
                    title={item.name}
                    subtitle={<View style={styles.subtitleView}>
                              <Text>{item.buildingID}</Text></View>}
                    avatar={<Avatar
                              style={styles.listImg}
                              source={ { uri: item.avatar }}
                              containerStyle={{alignSelf: 'stretch'}} />}
                    onPress={() => this.props.navigation.navigate('CardView', {item:item})}
                />
             )}
           />
         // </List> 
       );
     }
}


const BuildingStack = StackNavigator({
    Buildings: {
        screen: BuildingListView,
    },
    CardView: {
        screen: IndividualBuilding,
        path: 'buildings/:name',
        navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.item.name}`,
              headerTintColor: 'white',
              headerStyle: navStyles.header,
            }),

    },
    // CardView: {
    //   screen: IndividualBuilding,
    //   // navigationOptions: 
    // },
});

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    }
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
    alignSelf: 'center',
    marginLeft: 5, 
    fontSize: 18,
  },
  listItem: {
    height: 80,
    backgroundColor: 'aqua',
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    width: 300,
    alignSelf: 'center',
    paddingTop: 15,
    paddingRight: 15,
    // paddingBottom: 55,
  },
  subtitleView: {
    paddingTop: 5,
    paddingRight: 40,
    paddingLeft: 20
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
  view: {
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  img: {
    alignSelf: 'stretch',
    height: 100,
  },
})

export default BuildingStack;