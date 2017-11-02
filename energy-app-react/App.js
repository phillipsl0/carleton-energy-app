import React from 'react';
import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Button, Card, ListItem } from 'react-native-elements';
import BuildingListView from './src/BuildingListView';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//import GoogleMapReact from 'google-map-react';
//import GoogleMap from 'react-google-map';
import MapView from 'react-native-maps';

/*
Google API Key:
AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI 
*/
const apiGoogleKey = 'AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI';

const OverviewScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Overview</Text>
  </View>
);

const BuildingsScreen = () => (
     <BuildingListView/>
);

/*
Using tutorial: https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
*/
const HeatMapScreen = () => (
  <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}

        initialRegion={{
          // latitude: 37.78825,
          // longitude: -122.4324,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
          // Carleton's coordinates
          latitude: 44.4613,
          longitude: -93.1561,
          latitudeDelta: 0.0072,
          longitudeDelta: 0.0051,
      }}
  />
  </View>
);

const RootTabs = TabNavigator(
  {
    Overview: {
      headerStyle: {
        height: 56 + StatusBar.currentHeight, // 56 = Header/Toolbar spec
        paddingTop: StatusBar.currentHeight, // StatusBar height
        backgroundColor: 'pink',
      },
      screen: OverviewScreen,
      navigationOptions: {
        tabBarLabel: 'Overview',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome name="tachometer" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
        ),
      },
    },
    Buildings: {
      screen: BuildingsScreen,
      navigationOptions: {
        tabBarLabel: 'Buildings',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome name="building" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
        ),
      },
    },
    HeatMap: {
        screen: HeatMapScreen,
        // navigationOptions: {
        //   tabBarLabel: 'Heat Map',
        //   // tabBarIcon: ({ tintColor, focused }) => (
        //   //   <FontAwesome name="fire" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
        //   // ),
        // },
      }
});

export default RootTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});