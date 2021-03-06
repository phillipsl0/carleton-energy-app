/* App.js
 * Written by Liv Phillips, Veronica Child, and Martin Green for Energy App Comps, 2018
 * Top level detail of App, controls the tab view navigation.
 */
import React, { Component } from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { AsyncStorage, BackHandler, Platform, StatusBar, StyleSheet } from 'react-native';
import { addNavigationHelpers, NavigationActions, SafeAreaView, TabBarBottom, TabBarTop, TabNavigator } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import BuildingStack from './src/buildings/BuildingListView';
import EnergyMapViewStack from './src/energymap/EnergyMapView'
import OverviewStack from './src/overview/OverviewListView';
import { GetStyle } from './src/styling/Themes'
import { apiReducer, buildingDataReducer, dataReducer, handler, layoutReducer } from './src/helpers/ReduxHandler'
import SustainStack from './src/SustainView';
import IntroSlider from './src/intro/IntroSlider';
import { checkIfFirstLaunch } from './src/intro/checkIfFirstLaunch';

const apiGoogleKey = 'AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI';
const themeStyles = GetStyle();
const HAS_LAUNCHED = 'HAS_LAUNCHED';

if (Platform.OS === 'android') {
    SafeAreaView.setStatusBarHeight(0);
}

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

const navStyle = StyleSheet.create({
    label: {
        fontFamily: themeStyles.boldFont,
    },
    indicator: {
        backgroundColor: Platform.OS === 'ios' ? '#0B5091' : '#FFFFFF',
    }
});

const tabStyle = [];
tabStyle.tabColors = {
    tab0: '#6699cc',  // blue
    tab1: '#20cef5',  // light blue
    tab2: '#67b868',  // green
    tab3: '#a695c7'   // purple
};

tabStyle.tabStatusColors = {
    tab0: '#527aa3',
    tab1: '#1aa5c4',
    tab2: '#529353',
    tab3: '#85779f'
};


// Bottom tab navigation
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
        screen: BuildingStack,
        navigationOptions: {
            tabBarLabel: 'Buildings',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="building" size={20} color={focused ? "#0B5091" : "#d3d3d3"} />
            ),
        },
    },
    Sustain: {
        screen: SustainStack,
        navigationOptions: {
            tabBarLabel: 'Learn',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="graduation-cap" size={20} color={focused ? "#0B5091" : "#d3d3d3"} />
            ),
        },
    },
    EnergyMap: {
        screen: EnergyMapViewStack,
        navigationOptions: {
            tabBarLabel: 'Map',
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome name="map" size={20} color={focused ? "#0B5091" : "#d3d3d3"} />
            ),
        },
    }
},
{
    tabBarComponent: props => {
        const backgroundColor = props.position.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [
                tabStyle.tabColors.tab0,
                tabStyle.tabColors.tab1,
                tabStyle.tabColors.tab2,
                tabStyle.tabColors.tab3]
        });
        return (
            Platform.OS === 'ios'
                ? <TabBarBottom {...props} style={{ backgroundColor: '#e1e8ee' }} />
                : <TabBarTop {...props} style={{ backgroundColor: backgroundColor }} />
        );
    },
    tabBarOptions: {
        style: navStyle.header,
        labelStyle: navStyle.label,
        indicatorStyle: navStyle.indicator,
        activeTintColor: Platform.OS === 'ios' ? '#0B5091' : '#FFFFFF',
        inactiveTintColor: Platform.OS === 'ios' ? '#9E9E9E' : '#FFFFFF90',
        pressColor: '#DDD' // Android ripple color onPress
    },
    appStyle: {
        orientation: 'portrait',
    },
    navigationOptions: ({ navigation }) => ( {
        tabBarOnPress: (tab, jumpToIndex) => {
            tab.jumpToIndex(tab.scene.index);

            // resets stack in tabs if their icon is tapped while focused
            if (tab.scene.focused) {
                if (tab.scene.route.index !== 0) {
                    navigation.dispatch(NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: tab.scene.route.routes[0].routeName })
                        ]
                    }));
                }
            } else {
                tab.jumpToIndex(tab.scene.index);
            }
        }
    })
});

//for redux
const initialState = RootTabs.router.getStateForAction(
                      RootTabs.router.getActionForPathAndParams('Overview'));

const navReducer = (state = initialState, action) => {
    const nextState = RootTabs.router.getStateForAction(action, state);

    return nextState || state;
};

const appReducer = combineReducers({
    nav: navReducer,
    data: dataReducer,
    api: apiReducer,
    ui: layoutReducer,
    buildings: buildingDataReducer

});

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const addListener = createReduxBoundAddListener("root");

const mapStateToProps = (state) => ({
    nav: state.nav,
    data: state.data,
    ui: state.layout,
    api: state.api,
    buildings: state.buildings
});

class App extends Component {
  state = {
    isReady: false,
    isFirstLaunch: true,
    hasCheckedAsyncStorage: false,
  };

  /*
  Great info about components mounting:
  https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
  Put all data loading in component DID mount to avoid rerendering
  */
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

    try {
      const first = AsyncStorage.getItem(HAS_LAUNCHED);
      // Check if value present, if so not first launched
      if (first !== null) {
        this.setState({ isFirstLaunch: false, hasCheckedAsyncStorage: true });
        // console.log("INSIDE of async, first launch:", this.state.isFirstLaunch)
      } else {
        this.setState({ isFirstLaunch: true, hasCheckedAsyncStorage: true });
      }
      this.setState({ isFirstLaunch: true })
      AsyncStorage.setItem(HAS_LAUNCHED, 'true');
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    AsyncStorage.setItem(HAS_LAUNCHED, 'true');
  }

  onBackPress = () => {
      const { dispatch, nav } = this.props;
      if (nav.index === 0) {
          if (nav.routes[0].routes.length != 1) {
            dispatch(NavigationActions.back());
            return true;
          } else {
            return false;
          }
      }

      dispatch(NavigationActions.back());
      return true;
  };

  async _cacheResourcesAsync() {
    const fontAssets = cacheFonts([FontAwesome.font, MaterialCommunityIcons.font, Entypo.font,
        {'lato-regular': require('./src/assets/fonts/Lato/Lato-Regular.ttf'),},
        {'lato-bold': require('./src/assets/fonts/Lato/Lato-Bold.ttf'),}]);

    const imageAssets = cacheImages([require('./src/assets/images/windmillCard.png'),
        require('./src/assets/images/windmillHeader.png'), require('./src/assets/images/windmillFull.png')]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  // Closes intro screen when done button is pressed
  closeIntro = (onDonePress) => {
    if (onDonePress == true) {
      this.setState({ isFirstLaunch: false });
    };
  }


  render() {
    const { dispatch, nav, data, ui, api } = this.props;

    const navigation = addNavigationHelpers({
        dispatch,
        data,
        ui,
        state: nav,
        addListener,
    });

    StatusBar.setBarStyle('light-content', false);
    if (Platform.OS === 'android') {
      switch (this.props.nav.index){
         case 0: StatusBar.setBackgroundColor(tabStyle.tabStatusColors.tab0, true); break;
         case 1: StatusBar.setBackgroundColor(tabStyle.tabStatusColors.tab1, true); break;
         case 2: StatusBar.setBackgroundColor(tabStyle.tabStatusColors.tab2, true); break;
         case 3: StatusBar.setBackgroundColor(tabStyle.tabStatusColors.tab3, true); break;
      }
    }

    if (!this.state.isReady || !this.state.hasCheckedAsyncStorage || api.loading) {
      return(
        <AppLoading
            startAsync={this._cacheResourcesAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}/>
      );
    }
    
    if (this.state.isFirstLaunch) {
      return (
        <IntroSlider
          onDone={this.closeIntro}
        />
      );
    }
    
    return (
      <RootTabs navigation={navigation} />
    );
  }
}

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, {}, applyMiddleware(handler));
store.dispatch({type: 'GET_GRAPH_DATA'});
store.dispatch({type: 'GET_BUILDING_GRAPH_DATA'});
store.dispatch({type: 'GET_LAYOUT'});
store.dispatch({type: 'GET_TURBINE'});
store.dispatch({type: 'GET_SOLAR'});


export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
