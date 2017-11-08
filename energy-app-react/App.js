import React from 'react';
import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Button, Card, ListItem } from 'react-native-elements';
import BuildingListView from './src/BuildingListView';
import HeatMapView from './src/HeatMapView'
import OverviewListView from './src/OverviewListView';
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
  <OverviewListView/>
);

const BuildingsScreen = () => (
     <BuildingListView/>
);

const HeatMapScreen = () => (
  <HeatMapView/>
);



const RootTabs = TabNavigator(
  { Overview: {
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
        navigationOptions: {
          tabBarLabel: 'Heat Map',
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name="fire" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
          ),
        },
      }
  },
   { tabBarOptions:
        { style:
            Platform.select({
                android: {
                    marginTop: 24
                }
            })}});

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
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default RootTabs;