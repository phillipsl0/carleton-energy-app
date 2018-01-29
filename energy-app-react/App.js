import React, { Component } from 'react';
import { Font, AppLoading, Asset } from 'expo';
import { Platform, StyleSheet, BackHandler  } from 'react-native';
import { TabNavigator, NavigationActions, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

import BuildingListView from './src/BuildingListView';
import HeatMapStack from './src/heatmap/HeatMapView'
import OverviewStack from './src/overview/OverviewListView';
import { GetStyle } from './src/styling/Themes'
import CurrTheme from './src/styling/CurrentTheme'
import CurrFont from './src/styling/CurrentFont';
import { handler, dataReducer, layoutReducer } from './src/helpers/ReduxHandler'
import { getCurrentGenerationGraphFormat, getCurrentConsumptionGraphFormat } from './src/helpers/ApiWrappers';

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

const navStyle = StyleSheet.create({
    header: {
        ...Platform.select({
           android: {
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

//for redux
const initialState = RootTabs.router.getStateForAction(RootTabs.router.getActionForPathAndParams('Overview'));

const navReducer = (state = initialState, action) => {
    const nextState = RootTabs.router.getStateForAction(action, state);

    return nextState || state;
}

const appReducer = combineReducers({
    nav: navReducer,
    data: dataReducer,
    ui: layoutReducer

});

const mapStateToProps = (state) => ({
    nav: state.nav,
    data: state.data,
    ui: state.layout,
});

class App extends Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }

        dispatch(NavigationActions.back());
        return true;
    };

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
        const { dispatch, nav, data, ui } = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            data,
            ui,
            state: nav
        });

        if (!this.state.isReady) {
            return(
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}/>
            );
        }

        return(
            <RootTabs navigation={navigation} />
        );

    }
}

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, {}, applyMiddleware(handler));
store.dispatch({type: 'GET_GRAPH_DATA'});
store.dispatch({type: 'GET_LAYOUT'});


export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}