import React, { Component } from 'react';
import { Font, AppLoading, Asset } from 'expo';
import { Platform, StyleSheet, BackHandler, View, StatusBar, AsyncStorage} from 'react-native';
import { TabNavigator, TabBarTop, TabBarBottom, 
  NavigationActions, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import BuildingStack from './src/BuildingListView';
import EnergyMapViewStack from './src/energymap/EnergyMapView'
import OverviewStack from './src/overview/OverviewListView';
import { GetStyle } from './src/styling/Themes'
import CurrTheme from './src/styling/CurrentTheme'
import { handler, dataReducer, layoutReducer } from './src/helpers/ReduxHandler'
import { getCurrentGenerationGraphFormat, getCurrentConsumptionGraphFormat } from './src/helpers/ApiWrappers';
import SustainStack from './src/SustainView';
import IntroSlider from './src/IntroSlider';
import { checkIfFirstLaunch } from './src/checkIfFirstLaunch';

// const defaultFont = CurrFont+'-regular';
// const defaultFontBold = CurrFont+'-bold';

const apiGoogleKey = 'AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI';
const themeStyles = GetStyle();

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
})

const tabStyle = [];
tabStyle.tabColors = {
        tab0: '#6699cc',  // blue
        tab1: '#20cef5',  // light blue
        tab2: '#67b868',  // green
        tab3: '#a695c7'   // purple
    }

tabStyle.tabStatusColors = {
        tab0: '#527aa3',
        tab1: '#1aa5c4',
        tab2: '#529353',
        tab3: '#85779f'
    }


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
          <FontAwesome name="bolt" size={20} color={focused ? "#0B5091" : "#d3d3d3"} />
        ),
      },
    },
    EnergyMap: {
        screen: EnergyMapViewStack,
        navigationOptions: {
          tabBarLabel: 'Map',
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome name="fire" size={20} color={focused ? "#0B5091" : "#d3d3d3"} />
          ),
        },
      }
  },
   { 
    tabBarComponent: props => {
      const backgroundColor = props.position.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: [tabStyle.tabColors.tab0, 
                      tabStyle.tabColors.tab1, 
                      tabStyle.tabColors.tab2, 
                      tabStyle.tabColors.tab3]
      })
      return (
        Platform.OS === 'ios'
        ? <TabBarBottom {...props} style={{ backgroundColor: '#e1e8ee' }} />
        : <TabBarTop {...props} style={{ backgroundColor: backgroundColor }} />
      );
    },
    // animationEnabled: false,
    // lazy: true,
    tabBarOptions:
        { style: navStyle.header,
          labelStyle: navStyle.label,
          indicatorStyle: navStyle.indicator,
          // showIcon: true, //this is default false on Android
          // showLabel: true,
          activeTintColor: Platform.OS === 'ios' ? '#0B5091' : '#FFFFFF', 
          inactiveTintColor: Platform.OS === 'ios' ? '#9E9E9E' : '#FFFFFF90', 
          pressColor: '#DDD' // Android ripple color onPress
        },
     navigationOptions: ({ navigation }) => ( {
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
const initialState = RootTabs.router.getStateForAction(
                      RootTabs.router.getActionForPathAndParams('Overview'));

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
    state = {
    isReady: false,
    isFirstLaunch: false,
    hasCheckedAsyncStorage: false,
  };
  
  // componentWillMount() {
  //   AsyncStorage.getItem('RANDOM2')
  //     .then(res => {
  //       if (res !== null) {
  //         console.log("Not null random2");
  //       } else {
  //         this.isFirstLaunch = true;
  //         console.log("Null random2");
  //         console.log("Result: ", res)
  //         AsyncStorage.setItem('RANDOM2', 'true');
  //       }
  //     })
  //     .catch(err => alert("App mounting error: ", err));
  //   console.log(this.state.isFirstLaunch);
  //   if (this.state.isFirstLaunch == true) {
  //     console.log('setting random2 to true');
  //     AsyncStorage.setItem('RANDOM2', 'true');
  //   }
  // }
  // Checks AsyncStorage to see if app has been launched already
  /*
  Great info about components mounting:
  https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
  Put all data loading in component DID mount to avoid rerendering
  */
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    // checkIfFirstLaunch()
    //   .then(res => this.setState({ isFirstLaunch: res, hasCheckedAsyncStorage: true }))
    //   .catch(err => alert("An error occurred with async: ", err));
    
    try {
      // AsyncStorage.getItem('RANDOM')
      //   .then(res => {
      //     if (res !== null) {
      //       console.log("Not null random");
      //       this.isFirstLaunch = false;
      //     } else {
      //       console.log("Null random");
      //       this.isFirstLaunch = true;
      //       console.log("Result: ", res)
      //       AsyncStorage.setItem('RANDOM', 'true');
      //       console.log("INSIDE of async, first launch:", this.state.isFirstLaunch);
      //     }
      //   })
      //   .catch(err => alert("App mounting error: ", err));
      const first = AsyncStorage.getItem('RANDOM');
      if (first !== null) {
        // console.log("We have data!")
        this.setState({ hasCheckedAsyncStorage: true })
        // console.log("INSIDE of async, first launch:", this.state.isFirstLaunch)
      } else {
        // console.log("First launch, random!")
        this.state.isFirstLaunch = true;
        this.setState({ isFirstLaunch: true, hasCheckedAsyncStorage: true })
      }
      // console.log("OUTSIDE of async, first launch:", this.state.isFirstLaunch);
      AsyncStorage.setItem('RANDOM', 'true');
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
      AsyncStorage.setItem('RANDOM', 'true');
  }

  onBackPress = () => {
      const { dispatch, nav } = this.props;
      if (nav.index === 0) {
          return false;
      }

      dispatch(NavigationActions.back());
      return true;
  };

  async _cacheResourcesAsync() {
    const fontAssets = cacheFonts([FontAwesome.font,
        {'lato-regular': require('./src/assets/fonts/Lato/Lato-Regular.ttf'),},
        {'lato-bold': require('./src/assets/fonts/Lato/Lato-Bold.ttf'),}]);
    const imageAssets = cacheImages([require('./src/assets/windmill.png'),
        require('./src/assets/windmillHeader.png')]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }
      
  // Closes intro screen when done button is pressed
  closeIntro = (onDonePress) => {
    if (onDonePress == true) {
      this.setState({ isFirstLaunch: false });
    };
  }  


  render() {
    const { dispatch, nav, data, ui } = this.props;
    const navigation = addNavigationHelpers({
        dispatch,
        data,
        ui,
        state: nav
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

    if (!this.state.isReady || !this.state.hasCheckedAsyncStorage) {
      return(
        <AppLoading
            startAsync={this._cacheResourcesAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}/>
      );
    }

    // if (!this.state.hasCheckedAsyncStorage) {
    //   return( null )
    // }

    //Check if app has been launched for the first time
    // console.log("Before first launch return, isFirstLaunch: ", this.state.isFirstLaunch);
    // console.log("Before first launch return, checked Async: ", this.state.hasCheckedAsyncStorage)
    // if (this.state.isFirstLaunch == true && this.state.hasCheckedAsyncStorage) {
    //   // console.log("In first launch return, isFirstLaunch: ", this.state.isFirstLaunch);
    //   // console.log("In first launch return, checked Async: ", this.state.hasCheckedAsyncStorage)
    //   return (
    //     <IntroSlider
    //       onDone={this.closeIntro}
    //     />
    //   );
    // }

    return (
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