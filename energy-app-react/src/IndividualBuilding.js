import BuildingComparison from './BuildingComparison';
import { List, Card, ListItem, Button, Avatar } from 'react-native-elements';
import React, { Component } from 'react';
import { getCurrentBuildingUtilityConsumption, getTotalConsumptionGraphFormat, getTotalGenerationGraphFormat } from './helpers/ApiWrappers';
import { Platform, AppRegistry, SectionList, StyleSheet, View, Text, Image, WebView, ScrollView } from 'react-native'
import { GetStyle } from './styling/Themes';
import CurrTheme from './styling/CurrentTheme';
import GraphDetail from './overview/GraphDetailCard';
import Utilities from './overview/UtilitiesMiniCards';
import { StackNavigator, SafeAreaView } from 'react-navigation';
import ComparisonPage from './ComparisonPage';

export default class IndividualBuilding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUtilityCard: 1, // index for utility card
            selectedTimeCard: 1, // index for time card - intialized to day
            view: 'day',
            // graphData = 
            // buildingName = props.navigation.state.params.item.name;
            // curConsumption = (getCurrentBuildingUtilityConsumption("Burton", "water")/15).toFixed(2);
        }
    }

    // This function gets called immediately after the component is mounted
    componentDidMount() {
        currDate = new Date();
        
        this.updateDay(currDate);
        this.updateWeek(currDate);
        this.updateMonth(currDate);
        this.updateYear(currDate);

        this.getUtility(); // get utility from energy map selection, if present
    }

    getUtility() {
        utilitySelected = this.props.navigation.state.params.selected;
        if (utilitySelected !== null) {
            this.setState({ selectedUtilityCard:utilitySelected })
        }
    }

    updateDay = ( currDate ) => {
        comparisonDate = new Date();
        comparisonDate.setDate(currDate.getDate()-7);
        
        if (this.props.navigation.state.params.card == 1) {
            updatedDay = getTotalConsumptionGraphFormat(comparisonDate, currDate, 1440);
        } else {
            updatedDay = getTotalGenerationGraphFormat(comparisonDate, currDate, 1440);
        }
        
        this.setState({ dayData: updatedDay });
    }

    updateWeek = ( currDate ) => {
        comparisonDate = new Date();
        comparisonDate.setDate(currDate.getDate()-28);
        
        if (this.props.navigation.state.params.card == 1) {
            updatedWeek = getTotalConsumptionGraphFormat(comparisonDate, currDate, 10080);
        } else {
            updatedWeek = getTotalGenerationGraphFormat(comparisonDate, currDate, 10080);
        }
        
        this.setState({ weekData: updatedWeek });
    }

    updateMonth = ( currDate ) => {
        comparisonDate = new Date();
        comparisonDate.setMonth(currDate.getMonth()-11);

        if (this.props.navigation.state.params.card == 1) {
            updatedMonth = getTotalConsumptionGraphFormat(comparisonDate, currDate, 41760);
        } else {
            updatedMonth = getTotalGenerationGraphFormat(comparisonDate, currDate, 41760);
        }

        this.setState({ monthData: updatedMonth });
    }

    updateYear = ( currDate ) => {
        comparisonDate = new Date();
        comparisonDate.setYear(currDate.getFullYear()-5);

        if (this.props.navigation.state.params.card == 1) {
            updatedYear = getTotalConsumptionGraphFormat(comparisonDate, currDate, 525600);
        } else {
            updatedYear = getTotalGenerationGraphFormat(comparisonDate, currDate, 525600);
        }

        this.setState({ yearData: updatedYear });
    }

    // Decide what units to render based on utility and time
    getUnits(utility, time) {
        var units = ""
        if (utility == 6) { // electric
          units = "kWh"
        } else if (utility == 8) { // water
          units = "gal"
        } else if (utility == 5) { // gas
          units = "kBTU"
        } else if (utility == 7) { // heat
          units = "thm"
        }

        var timePeriod = ""
        if (time == 1) {
            timePeriod = "/day"
        } else if (time == 2) {
            timePeriod = "/week"
        } else if (time == 3) {
            timePeriod = "/month"
        } else if (time == 4) {
            timePeriod = "/year"
        }
        return (units+timePeriod)
    }

    getHeader = () => {
        const themeStyles = GetStyle(CurrTheme);
        try {
            headerText = (getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.item.name, this.mapUtilityNameToIndex(this.state.selectedUtilityCard))/15).toFixed(1);
            subheaderText = this.getUnits(this.state.selectedUtilityCard, this.state.selectedTimeCard)
        } catch (error) {
            console.log("Error in displaying IndividualBuilding header: ", error)
            headerText = "N/A"
            subheaderText = ""
        }

      return (
          <View style={[styles.textContainer, themeStyles.centered]}>
             <Text style={[styles.number, themeStyles.translucentText]}>
                {headerText}
                <Text style={[styles.words, themeStyles.translucentText]}>
                    {subheaderText}
                 </Text>
             </Text>
          </View>
      );
    }

    getGraphScope = () => {
        // graphData = navigation.data.comparison;
        if (this.state.view == 'day') {
            return this.state.dayData["data"];
        } else if (this.state.view == 'week') {
            return this.state.weekData["data"];
        } else if (this.state.view == 'month') {
            return this.state.monthData["data"];
        } else if (this.state.view == 'year') {
             return this.state.yearData["data"];
        }
    }

    // Handles time denominator buttons for graph
    scopeCallbackGraph = ( buttonView, buttonComparator, buttonIndex ) => {
        this.setState({ view: buttonView,
            viewNumber: buttonComparator,
            selectedTimeCard: buttonIndex});
    }

    // Handles utilitie buttons
    scopeCallbackUtilities = ( buttonIndex ) => {
        this.setState({ selectedUtilityCard: buttonIndex});
    }

    // Maps utility name to its respective utility mini card index
    mapUtilityNameToIndex(utilityName) {
        if (utilityName == 'gas') {
          return (5);
        }
        else if (utilityName == 'electric') {
          return (6);
        }
        else if (utilityName == 'heat') {
          return (7);
        }
        else if (utilityName == 'water') {
          return (8);
        }
        return (1);
    };


    render() {
        const themeStyles = GetStyle(CurrTheme);
        header = this.getHeader();  
        var utilities = ["Gas", "Electric", "Heat", "Water"];
        
        const test = []
        for (var key in this.props.navigation.state.params.item) { 
          if (Array.isArray(this.props.navigation.state.params.item[key])) {
            test.push(this.props.navigation.state.params.item[key])
          }
          
        }
        const num = (test.length - 1)
        const tableData = [,
        test[0], 
        test[1], 
        test[2],
        test[3],
        test[4],
        test[5],
        test[6],
        ];

        return (
            <View style={[themeStyles.flex, themeStyles.list]}>
                <Image style={themeStyles.header} 
                    source={{ uri: this.props.navigation.state.params.item.avatar }} />

                <View style={[themeStyles.header, themeStyles.carletonBlueBackground]}/>
                {header}

                <ScrollView style={themeStyles.lightBlueBackground}>
                    <GraphDetail data={this.graphData}
                        callback={this.scopeCallbackGraph}
                        selected={this.state.selectedTimeCard} // button index must match selected
                        type={1}/>                    
                    <Button
                        rightIcon={{name: "angle-right", type: 'font-awesome', size: 24}}
                        fontSize={20}
                        title='Compare'
                        containerViewStyle={styles.button}
                        backgroundColor='#0B5091'
                        onPress={() => this.props.navigation.navigate("Comparison")}/>
                </ScrollView>
                <Utilities callback={this.scopeCallbackUtilities}
                    cardType={1}
                    selected={this.state.selectedUtilityCard}
                    //selected={5}
                />
            </View>
        );
    }
}

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    },
})

const styles = StyleSheet.create({
    card: {
        paddingTop: 20,
    },
    blue: {
        color: 'blue',
        fontWeight: 'bold',
    },
    head: {
      backgroundColor: 'grey',
    },
    button: {
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 100,
    },
    table: { 
        width: 250,
        marginLeft: 5, 
    },
    text: { 
        alignSelf: 'center',
        marginLeft: 5, 
        fontSize: 18,
    },
    listItem: {
        height: 50,
        backgroundColor: 'aqua',
        borderBottomColor: '#c8c7cc',
        borderBottomWidth: 0.5,
        width: 300,
        alignSelf: 'center',
        paddingTop: 35,
        paddingRight: 15,
        paddingBottom: 55,
    },
    listImg: {
        height: 30,
        alignSelf: 'stretch',
    },
    listText: {
        paddingLeft: 30,
        marginLeft: 30,
        fontSize: 24,
    },
    row: {
        backgroundColor: 'orange',
    },
    view: {
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    img: {
        alignSelf: 'stretch',
        height: 100,
    },
    number: {
        fontSize: 80,
    },
    textContainer: {
        marginBottom: '5%',
    },
    words: {
        fontSize: 20,
        marginTop: '-2%',
    }
})