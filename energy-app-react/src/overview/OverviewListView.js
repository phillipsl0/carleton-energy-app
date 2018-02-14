import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, FlatList, StyleSheet, View, Text, Image, Dimensions, 
        Platform, TouchableHighlight, Scrollview } from 'react-native'
import { AppLoading } from 'expo';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, Card, Button } from 'react-native-elements'
import { VictoryContainer, VictoryChart, VictoryTheme } from "victory-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import OverviewCards from './OverviewCards'
import Turbine from './TurbineView'
import ExampleData from './OverviewExampleData'
import Graph from './../visualizations/Graph'
import { GetStyle } from './../styling/Themes'
import CurrTheme from './../styling/CurrentTheme'
import CurrFont from './../styling/CurrentFont';
import { getCurrentGenerationGraphFormat, getCurrentConsumptionGraphFormat } from './../helpers/ApiWrappers';
import { default as CustomThemes } from './../visualizations/GraphThemes';
import { scale, moderateScale, verticalScale} from './../helpers/Scaling';
import Comparator from './../helpers/Comparators';

const themeStyles = GetStyle();

@connect(
    state => ({
        currentData: state.data.currentData,
        loading: state.data.loading,
        layout: state.ui.layout,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_GRAPH_DATA'}),
    }),
)

class OverviewListView extends Component {
    returnScreen = ( item, navigation ) => {
        if (item.title == "Wind Turbine Energy") {
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
        const themeStyles = GetStyle(CurrTheme);
        const { refresh, loading, currentData, layout } = this.props;

        return (
           <List
            style={[styles.list, themeStyles.list, themeStyles.flex]}>
           <FlatList
            style={[themeStyles.flex, styles.up]}
             data={ExampleData}
             keyExtractor={item => item.title}
             onRefresh={refresh}
             refreshing={loading}

             renderItem={({ item }) => (
               <Card
                 containerStyle={[themeStyles.card, themeStyles.flex]}
                 title={item.title}
                 titleStyle={styles.title}
//                  titleStyle={themeStyles.title}>
                 dividerStyle={styles.divider}>
                 <TouchableHighlight
                    onPress={() => this.returnScreen(item, navigation)}
                    underlayColor="transparent">
                 <View pointerEvents="none" style={[themeStyles.container, themeStyles.flexboxRow]}>
                 {!currentData &&
                  <ActivityIndicator
                    animating={loading}
                    size="large"/>}

                 {item.title == "Wind Turbine Energy" &&
                  <Comparator
                       width={moderateScale(255)}
                       height={moderateScale(50 * 3)}
                       data={currentData.turbine}
                       unit={'kWh'}
                       number={3}/>
                    }

                 {item.title == "Energy Use"  &&
                  <Graph
                    type={item.graphType}
                    legend={true}
                    theme={CustomThemes.carleton}
                    graphData={item.title == "Energy Use" ? currentData.usage :
                        currentData.generation}/>
                  }

                  {item.title == "Energy Generation"  &&
                    <Graph
                      type={item.graphType}
                      legend={true}
                      theme={CustomThemes.carleton}
                      graphData={currentData.generation}/>
                    }

                 <TouchableHighlight
                    onPress={() => this.returnScreen(item, navigation)}
                    underlayColor="transparent"
                    style={[styles.button, {position: 'absolute', right: 0}]}>
                    <FontAwesome name="angle-right" size={moderateScale(40)} color="#0B5091" />
                 </TouchableHighlight>

                  </View>
                 </TouchableHighlight>
                {item.title == "Energy Use"  &&
                  <Comparator
                     width={moderateScale(300)}
                     height={moderateScale(40)}
                     data={currentData.usage}
                     unit={'kWh'}
                     number={1}/>
                  }
               </Card>
             )}
           />
           </List>
       );
    }
}

//<Comparator
//                    data={currentData.turbine}
//                    unit={"kWh"}/>
//                  <View style={[themeStyles.flexboxRow]}>
//                    <MaterialCommunityIcons name=
//{(item.title != "Wind Turbine Energy"  &&
//                  <Graph
//                    type={item.graphType}
//                    theme={CustomThemes.carleton}
//                    graphData={item.title == "Energy Use" ? currentData.usage :
//                        currentData.generation}/>}
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

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    marginTop: 10,
    marginBottom: 0,
  },
  list: {
      marginLeft: '3%',
      marginRight: '3%',
  },
  button: {
    marginRight: '3%',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  title: {
    fontSize: 14,
    marginBottom: 10
  },
  divider: {
    marginBottom: 5,
  },
  up: {
    marginTop: '-1%'
  }
})

export default OverviewStack