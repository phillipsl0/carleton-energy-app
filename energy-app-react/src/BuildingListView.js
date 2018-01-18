import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, View, Text, Image, WebView, TouchableOpacity } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import buildings from './Buildings';

import { getCurrentBuildingUtilityConsumption } from './helpers/ApiWrappers.js'



class BuildingListView extends Component {
    static navigationOptions = {
        title: 'Buildings'
    }

    render() {
        const {navigate} = this.props.navigation;

       return (
         <List>
           <FlatList
             data={buildings}
             keyExtractor={item => item.name}
             renderItem={({ item }) => (
               <ListItem
                    style={styles.listItem}
                 onPress={() => this.props.navigation.navigate('IndividualBuilding', {item:item})}
                 title={item.name}
                 avatar={<Avatar
                            style={styles.listImg}
                            source={ { uri: item.avatar }}
                            containerStyle={{alignSelf: 'stretch'}}
                            />}
               />
             )}
           />
         </List>
       );
     }
}

class IndividualBuilding extends Component {
    render() {
        const {state} = this.props.navigation;
        const tableHead = [' ','Electric', 'Water', 'Gas'];
        
        const test = []
        for (var key in this.props.navigation.state.params.item) { 
          if (Array.isArray(this.props.navigation.state.params.item[key])) {
            test.push(this.props.navigation.state.params.item[key])
          }
          
        }
        const num = (test.length - 1)
        const tableData = [,
        test[0], 
        test[1], 
        test[2],
        test[3],
        test[4],
        test[5],
        test[6],


        ];


        var consumption = (getCurrentBuildingUtilityConsumption("Burton", "water")/15).toFixed(2);

        return (
            <View style={styles.view}>
                <Text style = {styles.bigyellow}>{this.props.navigation.state.params.item.name}</Text>
                <Image
                style = {styles.img}
                source={{ uri: this.props.navigation.state.params.item.avatar }} />

                <Text style={{fontSize: 70}}>{ consumption }<Text style={{fontSize: 20}}>{'gal/min '}</Text></Text> 

                <Text style={styles.bigyellow}> GRAPH HERE </Text>



              {/*
              <Table style={styles.table}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
              </Table>
            */}
                
            </View>
        );
    }
}

const BuildingStack = StackNavigator({
    Buildings: {
        screen: BuildingListView,
    },
    IndividualBuilding: {
        path: 'buildings/:name',
        screen: IndividualBuilding,
    },
});

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
    height: 50,
    backgroundColor: 'aqua',
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    width: 300,
    alignSelf: 'center',
    paddingTop: 35,
    paddingRight: 15,
    paddingBottom: 55,

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