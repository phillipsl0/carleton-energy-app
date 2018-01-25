import React, { Component } from 'react';
import { AsyncStorage, FlatList, StyleSheet, View, Text, Image, Dimensions, Platform } from 'react-native'
import { AppLoading } from 'expo';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, Card, Button } from 'react-native-elements'
import { VictoryContainer, VictoryChart, VictoryTheme } from "victory-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import OverviewCards from './OverviewCards'
import Turbine from './TurbineView'
import ExampleData from './OverviewExampleData'
import Graph from './../visualizations/Graph'
import { GetStyle } from './../styling/Themes'
import CurrTheme from './../styling/CurrentTheme'
import CurrFont from './../styling/CurrentFont';
import { getCurrentGenerationGraphFormat, getCurrentConsumptionGraphFormat } from './../helpers/ApiWrappers';

const defaultFont = CurrFont+'-regular';
const defaultFontBold = CurrFont+'-bold';

class OverviewListView extends Component {
     constructor(props) {
        super(props);
        var consumptionPlaceholder = new Array(3);
        var generationPlaceholder = new Array(3);
        var turbinePlaceholder = new Array(2);

        consumptionPlaceholder[0] = {"x": "Water", "y": 1000};
        consumptionPlaceholder[1] = {"x": "Electricity", "y": 2500};
        consumptionPlaceholder[2] = {"x": "Total", "y": 3500};

        generationPlaceholder[0] = {"x": "Solar", "y": 1000};
        generationPlaceholder[1] = {"x": "Wind", "y": 2500};
        generationPlaceholder[2] = {"x": "Geothermal", "y": 90};

        turbinePlaceholder[0] = {"x": "Turbine 1", "y": 10000};
        turbinePlaceholder[1] = {"x": "Turbine 2", "y": 600};

        this.state = {
                    currentUse: consumptionPlaceholder,
                    currentGeneration: generationPlaceholder,
                    turbinePower: turbinePlaceholder,
                    isReady: false,
        };

        this.getData();
     }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        try {
          const currUse = await AsyncStorage.getItem('currUse');
          currUse = await JSON.parse(currUse);

          const currGeneration = await AsyncStorage.getItem('currGeneration');
          currGeneration = await JSON.parse(currGeneration);
//          console.log("current gen: ");
//          console.log(currGeneration);

          if (currUse !== null && currGeneration !== null){
            // We have data!!
            await this.setState({ currentUse: currUse, currentGeneration: currGeneration,
                isReady: true});
//            console.log("Got it: ");
//            console.log(currGeneration);
          }
        } catch (error) {
          // Error retrieving data
          console.warn("noooooo");
        }
    }

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

    getEnergyUsed() {
        currUse = getCurrentConsumptionGraphFormat();

        this.setState({
            currentUse: currUse
        });
    }

    getEnergyProduced() {
        currGeneration = getCurrentGenerationGraphFormat();

        this.setState({
            currentGeneration: currGeneration
        });
    }

    render() {
        navigation = this.props.navigation;
        const themeStyles = GetStyle(CurrTheme);

        return (
         <List
           style={[styles.list, themeStyles.list, themeStyles.flex]}>
           <FlatList
             data={ExampleData}
             keyExtractor={item => item.title}
             renderItem={({ item }) => (
               <Card
                 containerStyle={[styles.card, themeStyles.card, themeStyles.flex]}
                 title={item.title}
                 titleStyle={styles.title}>
                 <View style={[themeStyles.container, themeStyles.flex, themeStyles.centered]}>
                 {item.title == "Turbine Energy" &&
                    <Graph
                        type={item.graphType}
                        theme={VictoryTheme.grayscale}
                        graphData={this.state.turbinePower}/>}
                 {item.title != "Turbine Energy" &&
                    <Graph
                    type={item.graphType}
                    theme={VictoryTheme.grayscale}
                    graphData={item.title == "Energy Use" ? this.state.currentUse :
                        this.state.currentGeneration}/>}
                 </View>
                 <Button
                    rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                    fontFamily={defaultFont}
                    fontSize={20}
                    title='More'
                    containerViewStyle={styles.button}
                    backgroundColor='#0B5091'
                    onPress={() => this.returnScreen(item, navigation)}/>
               </Card>
             )}
           />
         </List>
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
        fontFamily: defaultFontBold,
    }
})

const OverviewStack = StackNavigator({
    OverviewListView: {
        screen: OverviewListView,
        navigationOptions: ({ navigation }) => ({
            title: 'Overview',
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
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  list: {
      marginLeft: '3%',
      marginRight: '3%',
  },
  button: {
    marginTop: '3%',
  },
})

export default OverviewStack