import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

import BuildingListView from './src/BuildingListView';
import HeatMapView from './src/HeatMapView'
import OverviewStack from './src/OverviewListView';

const apiGoogleKey = 'AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI';


//
//export default StackNavigator({
//    SplashScreen: {
//        screen: SplashScreen,
//    },
//    MainNavigator: {
//        screen: RootTabs,
//    }
//})

const RootTabs = TabNavigator(
  { Overview: {
      screen: OverviewStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Overview',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome name="tachometer" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
        ),
      }),
    },
    Buildings: {
      screen: BuildingListView,
      navigationOptions: {
        tabBarLabel: 'Buildings',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome name="building" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
        ),
      },
    },
    HeatMap: {
        screen: HeatMapView,
        navigationOptions: {
          tabBarLabel: 'Heat Map',
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name="fire" size={20} color={focused ? "#4F8EF7" : "#d3d3d3"} />
          ),
        },
      }
  },
   { tabBarOptions:
        // fixes top margin error in android
        { style:
          Platform.select({
           android: {
           marginTop: 24
           }
         })
         },
     navigationOptions: ({ navigation }) => ({
         tabBarOnPress: (tab, jumpToIndex) => {
           // resets stack in tabs if their icon is tapped while focused
           if (tab.focused && (tab.index === 0 || tab.index === 1)) {
             if (tab.route.index !== 0) {
               navigation.dispatch(NavigationActions.reset({
                 index: 0,
                 actions: [
                   NavigationActions.navigate({ routeName: tab.route.routes[0].routeName })
                 ]
               }))
             }
           } else {
             jumpToIndex(tab.index)
           }
         }
       })
});


export default RootTabs;