import React, { Component } from 'react';
import { FlatList, AppRegistry, SectionList, StyleSheet, View, Text, Image, WebView, Picker } from 'react-native'
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import buildings from './buildings/Buildings';
import IndividualBuiding from './buildings/IndividualBuilding';
import { GetStyle } from './styling/Themes';
import CurrTheme from './styling/CurrentTheme';
import BuildingComparison from './BuildingComparison';
import { getCurrentBuildingUtilityConsumption, getUtilitiesList, getCurrentBuildingUtilityConsumptionGraphFormat} from './helpers/ApiWrappers.js';
import Graph from './visualizations/Graph';
import { default as CustomThemes } from './visualizations/GraphThemes';

class ComparisonPage extends Component {
  static navigationOptions = {
        title: 'Comparison'
    }
  
  constructor(props){
      super(props);
}

  render() {
    const themeStyles = GetStyle(CurrTheme);

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F3B61D',
        paddingTop: 20,
      }}>
      <View style={{
        flex: 1,
        flexDirection: 'row',
      }}>
         <Card
      containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
        <View style={{width: 120, height: 100, alignSelf: 'center'}}>
        <Image style={styles.listImg}
          source={{ uri: 'https://i.pinimg.com/originals/5f/08/83/5f08832ee298016cb9baa79e2a44d0c0.jpg'}} />
        </View>
        </Card>
         <Card
      containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
        <View style={{width: 120, height: 100, alignSelf: 'center'}}>
        <Image style={styles.listImg}
          source={{ uri: 'https://apps.carleton.edu/reason_package/reason_4.0/www/sized_images_local/set110/488110/a39b9465187c3a6c5255046bc6381f74.jpg'}} />
        </View>
        </Card>
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'row',
      }}>
        <View style={{width: 130, height: 225}}>
        <Card
        containerStyle={[styles.cards, themeStyles.card, themeStyles.flex]}>
        <Text style={styles.htext}> {this.props.navigation.state.params.building1} </Text>
        <Text style={styles.text}> Electric: </Text>
         <Text style={styles.text}> {Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building1,'Electric'))} kWh </Text>
        <Text style={styles.text}> Water: </Text>
        <Text style={styles.text}> {Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building1,'Water'))} gal</Text>
        <Text style={styles.text}> Gas: </Text>
        <Text style={styles.text}> {Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building1,'Gas'))} kBTU</Text>
        </Card>
        </View>
        <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F3B61D',
      }}>
         <Card
      containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
        <View style={{width: 150, height: 40, alignSelf: 'center'}}>
        <Graph
            style = {styles.img}
            type= 'pie'
            theme={CustomThemes.carleton}
            graphData={getCurrentBuildingUtilityConsumptionGraphFormat(this.props.navigation.state.params.building1, this.props.navigation.state.params.building2, 'Electric')} />
        </View>
        </Card>
         <Card
      containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
        <View style={{width: 150, height: 40, alignSelf: 'center'}}>
       <Graph
          type= 'pie'
          theme={CustomThemes.carleton}
          graphData={getCurrentBuildingUtilityConsumptionGraphFormat(this.props.navigation.state.params.building1, this.props.navigation.state.params.building2, 'Water')} />
        </View>
        </Card>
        <Card
      containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}>
        <View style={{width: 150, height: 40, alignSelf: 'center', paddingBottom: 10}}>
      <Graph
        type= 'pie'
        theme={CustomThemes.carleton}
        graphData={getCurrentBuildingUtilityConsumptionGraphFormat(this.props.navigation.state.params.building1, this.props.navigation.state.params.building2, 'Gas')} />
      </View>
      </Card>
        </View>
        <View style={{width: 130, height: 225,}}>
        <Card
      containerStyle={[styles.cards, themeStyles.card, themeStyles.flex]}>
            <Text style={styles.htext}> {this.props.navigation.state.params.building2} </Text>
            <Text style={styles.text}> Electric: </Text>
            <Text style={styles.text}> {Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building2,'Electric'))} kWh</Text>
            <Text style={styles.text}> Water: </Text>
            <Text style={styles.text}> {Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building2,'Water'))} gal</Text>
            <Text style={styles.text}> Gas: </Text>
            <Text style={styles.text}> {Math.round(getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.building2,'Gas'))} kBTU</Text>
          </Card>
        </View>
      </View>
    </View>
    );
  }
};

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
})

// const Building_Comparison = StackNavigator({
//     Buildings: {
//         screen: ComparisonPage,
//     },
// });

const styles = StyleSheet.create({
  card: {
    paddingTop: 20,
  },
  cards: {
    alignSelf: 'center',
    width: 100,
    height: 300,
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
  button: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 200,
  },
  table: { 
    width: 250,
    marginLeft: 5, 
    
  },
  htext: { 
    alignSelf: 'center',
    marginLeft: 5, 
    fontSize: 15,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  text: { 
    alignSelf: 'center',
    marginLeft: 5, 
    fontSize: 14,
    paddingBottom: 5,
  },
  listItem: {
    height: 50,
    backgroundColor: 'aqua',
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    width: 190,
    paddingTop: 35,
    paddingRight: 15,
    paddingBottom: 55,

  },
  listItem2: {
    height: 50,
    backgroundColor: 'yellow',
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    width: 190,
    paddingTop: 35,
    paddingRight: 15,
    paddingBottom: 55,

  },
  listImg: {
    height: 180,
    width: 120,
    alignSelf: 'center',
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
    alignSelf: 'center',
    height: 30,
    width: 30,
  },
})


export default ComparisonPage;