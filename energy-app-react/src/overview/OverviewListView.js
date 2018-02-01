import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, FlatList, StyleSheet, 
    View, Text, Image, Dimensions, Platform, ScrollView } from 'react-native'
import { AppLoading } from 'expo';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, Card, Button } from 'react-native-elements'
import { VictoryContainer, VictoryChart, VictoryTheme } from "victory-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import OverviewCards from './OverviewCards'
import Turbine from './TurbineView'
import ExampleData from './OverviewExampleData'
import Graph from './../visualizations/Graph'
import { GetStyle } from './../styling/Themes'
import { getCurrentGenerationGraphFormat, 
    getCurrentConsumptionGraphFormat } from './../helpers/ApiWrappers';

const themeStyles = GetStyle();

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
    returnScreen = ( item, navigation ) => {
        if (item.title == "Turbine Energy") {
            navigation.navigate('TurbineView',
                {graphType:item.graphType, data:item.data, title: item.title})
        } else if (item.title == "Energy Use") {
            navigation.navigate('OverviewCardView',
                {graphType:item.graphType, data:item.data, title: item.title, card: 1})
        } else if (item.title == "Energy Generation") {
            navigation.navigate('OverviewCardView',
                {graphType:item.graphType, data:item.data, title: item.title, card: 2})
        } else {
            navigation.navigate('OverviewCardView',
                {graphType:item.graphType, data:item.data, title: item.title})
        }
    };

    render() {
        navigation = this.props.navigation;
        const { refresh, loading, currentData } = this.props;

        return (
          <ScrollView>
           <FlatList
             data={ExampleData}
             keyExtractor={item => item.title}
             onRefresh={refresh}
             refreshing={loading}

             renderItem={({ item }) => (
               <Card
                 containerStyle={[themeStyles.card, themeStyles.flex]}
                 title={item.title}
                 titleStyle={themeStyles.title}>
                 <View pointerEvents="none" 
                    style={[themeStyles.container, themeStyles.flex, themeStyles.centered]}>
                 {!currentData && <ActivityIndicator
                                                 animating={loading}
                                                 size="large"/>}
                 {item.title == "Turbine Energy" &&
                        <Graph
                            type={item.graphType}
                            theme={VictoryTheme.grayscale}
                            graphData={currentData.turbine}/>}
                 {item.title != "Turbine Energy" &&
                        <Graph pointerEvents="none"
                        type={item.graphType}
                        theme={VictoryTheme.grayscale}
                        graphData={item.title == "Energy Use" ? currentData.usage :
                            currentData.generation}/>}

                 </View>
                 <Button
                    small
                    rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                    fontFamily={themeStyles.font}
                    fontSize={20}
                    title='More'
                    containerViewStyle={themeStyles.button}
                    backgroundColor='#0B5091'
                    onPress={() => this.returnScreen(item, navigation)}/>
               </Card>
             )}
           />
         </ScrollView>
       );
    }
}

const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;

    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state);
};

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
    headerTitle: {
        fontFamily: themeStyles.font,
    }
})

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

OverviewStack.router.getStateForAction = navigateOnce(OverviewStack.router.getStateForAction);

export default OverviewStack