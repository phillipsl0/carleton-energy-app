/* OverviewListView.js
 * Written by Liv Phillips for Energy App Comps, 2018
 * Manages first level detail for Overview page, as well as the Overview stack.
 */

import React, { Component } from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List } from 'react-native-elements'
import { connect } from 'react-redux';

import OverviewCards from './OverviewCards';
import OverviewListCard from './OverviewListCard';
import Turbine from './TurbineView';

import { overviewLabels } from './OverviewExampleData';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';

const theme = GetStyle(CurrTheme);

@connect(
    state => ({
        currentData: state.data.currentData,
        loading: state.data.loading,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_GRAPH_DATA'}),
    }),
)

class OverviewListView extends Component {
    render() {
        navigation = this.props.navigation;
        const { refresh, loading, currentData } = this.props;

        return (
           <List style={[styles.list, theme.list, theme.flex]}>

           <FlatList
            style={[theme.flex, styles.up]}
             data={overviewLabels}
             keyExtractor={item => item.title}
             onRefresh={refresh}
             refreshing={loading}

             renderItem={({ item }) => (
               <OverviewListCard
                   cardItem={item}
                   cardNavigation={navigation}/>
             )}
           />
           </List>
       );
    }
}

/* Function to prevent StackNavigator from navigating multiple times when navigate button is pressed in succession
 * (note that function also must be called below) */
const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;

    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state);
};

// StyleSheet for the navigator
const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
    headerTitle: {
        fontFamily: theme.font,
        fontWeight: 'normal'
    }
})

/* OverviewStack handles all navigation for the Overview screen
 * !!! VERY IMPORTANT NOTE !!!
 * Because navigation is global, all screen & navigation names must be unique
 * Ex: Another Screen should not be named 'Turbine'
 */
const OverviewStack = StackNavigator({
    OverviewListView: {
        screen: OverviewListView,

        navigationOptions: ({ navigation }) => ({
            title: 'Overview',
            ...Platform.select({
                android: { header: null }
            }),
            headerTintColor: 'white',
            headerStyle: navStyles.header,
            headerTitleStyle: navStyles.headerTitle,
            headerBackTitleStyle: navStyles.headerTitle,
            headerBackTitle: 'Back',
        }),
    },
    OverviewCardView: {
        path: 'OverviewCards/:title',
        screen: OverviewCards,

        navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.title}`,
              headerTintColor: 'white',
              headerStyle: navStyles.header,
              headerTitleStyle: navStyles.headerTitle,
              headerBackTitleStyle: navStyles.headerTitle,
              headerBackTitle: 'Back',
            }),
    },
    TurbineView: {
        screen: Turbine,

        navigationOptions: {
            title: 'Turbine Energy',
            headerTintColor: 'white',
            headerStyle: navStyles.header,
            headerTitleStyle: navStyles.headerTitle,
            headerBackTitleStyle: navStyles.headerTitle,
            headerBackTitle: 'Back',
        }
    }},
);

// Calls the function that prevents multiple navigations
OverviewStack.router.getStateForAction = navigateOnce(OverviewStack.router.getStateForAction);

const styles = StyleSheet.create({
  list: {
      marginLeft: '3%',
      marginRight: '3%',
  },

  up: {
    marginTop: '-1%'
  }
})

export default OverviewStack