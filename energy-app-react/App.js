import React, { Component } from 'react';
import { Font, AppLoading, Asset } from 'expo';
import { Platform, StyleSheet  } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

import BuildingListView from './src/BuildingListView';
import HeatMapStack from './src/heatmap/HeatMapView'
import OverviewStack from './src/overview/OverviewListView';
import { GetStyle } from './src/styling/Themes'
import CurrTheme from './src/styling/CurrentTheme'
import CurrFont from './src/styling/CurrentFont';

const defaultFont = CurrFont+'-regular';
const defaultFontBold = CurrFont+'-bold';
const apiGoogleKey = 'AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}


export default class App extends Component {

    state = {
        isReady: false,
    };

    async _cacheResourcesAsync() {
        const fontAssets = cacheFonts([FontAwesome.font,
            {'lato-regular': require('./src/assets/fonts/Lato/Lato-Regular.ttf'),},
            {'lato-bold': require('./src/assets/fonts/Lato/Lato-Bold.ttf'),}]);
        const imageAssets = cacheImages([require('./src/assets/windmill.png'),
            require('./src/assets/windmillHeader.png')]);

        await Promise.all([...imageAssets, ...fontAssets]);
    }

    render() {
        if ( !this.state.isReady) {
            return(
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}/>
            );
        }

        return(
            <RootTabs/>
        );

    }
}

const navStyle = StyleSheet.create({
    header: {
        ...Platform.select({
           android: {
           marginTop: 24,
           backgroundColor: '#e1e8ee',
           }
        })
    },
    label: {
        fontFamily: defaultFont,
    },

    indicator: {
        backgroundColor: '#0B5091'
    }
})

const RootTabs = TabNavigator({
    Overview: {
      screen: OverviewStack,
      navigationOptions: {
        tabBarLabel: 'Overview',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome name="tachometer" size={20} color={focused ? "#0B5091" : "#d3d3d3"} />
        ),
      },
    },
    Buildings: {
      screen: BuildingListView,
      navigationOptions: {
        tabBarLabel: 'Buildings',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome name="building" size={20} color={focused ? "#0B5091" : "#d3d3d3"} />
        ),
      },
    },
    HeatMap: {
        screen: HeatMapStack,
        navigationOptions: {
          tabBarLabel: 'Heat Map',
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name="fire" size={20} color={focused ? "#0B5091" : "#d3d3d3"} />
          ),
        },
      }
  },
   { tabBarOptions:
        // fixes top margin error in android
        { style: navStyle.header,
          labelStyle: navStyle.label,
          indicatorStyle: navStyle.indicator,
          activeTintColor: '#0B5091',
          inactiveTintColor: '#9E9E9E',},
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