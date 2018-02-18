import { List, Card, Button, Avatar } from 'react-native-elements';
import React, { Component } from 'react';
import { Platform, AppRegistry, SectionList, StyleSheet, View, Text, Image, WebView, ScrollView } from 'react-native'
import { StackNavigator } from 'react-navigation';

import { getCurrentBuildingUtilityConsumption, getTotalConsumptionGraphFormat, getTotalGenerationGraphFormat } from './helpers/ApiWrappers';
import { GetStyle } from './styling/Themes';
import CurrTheme from './styling/CurrentTheme';
import GraphDetail from './overview/GraphDetailCard';
import Utilities from './overview/UtilitiesMiniCards';
import ComparisonPage from './ComparisonPage';
import { connect } from 'react-redux';
import { moderateScale, verticalScale } from './helpers/Scaling';
import BuildingComparison from './BuildingComparison';

@connect(
    state => ({
        historicalData: state.data.historicalData,
        currentData: state.data.currentData,
        loading: state.data.loading,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_GRAPH_DATA'}),
    }),
)

export default class IndividualBuilding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUtilityCard: 5, // index for utility card - itialized to gas
            selectedTimeCard: 1, // index for time card - intialized to day
            view: 'day',
        }
    }

    // This function gets called immediately after the component is mounted
    componentDidMount() {
        // currDate = new Date();
        
        // this.updateDay(currDate);
        // this.updateWeek(currDate);
        // this.updateMonth(currDate);
        // this.updateYear(currDate);

        this.getUtility(); // get utility from energy map selection, if present
    }

    // Get utility selected from stack navigation
    getUtility() {
        utilitySelected = this.props.navigation.state.params.selected;
        // If comes from map, utilitySelected specified upon navigation
        if (utilitySelected !== undefined) {
            this.setState({ selectedUtilityCard:utilitySelected })
        }
    }

    // updateDay = ( currDate ) => {
    //     comparisonDate = new Date();
    //     comparisonDate.setDate(currDate.getDate()-7);
        
    //     // if (this.props.navigation.state.params.card == 1) {
    //     //     updatedDay = getTotalConsumptionGraphFormat(comparisonDate, currDate, 1440);
    //     // } else {
    //     //     updatedDay = getTotalGenerationGraphFormat(comparisonDate, currDate, 1440);
    //     // }

    //     updatedDay = getTotalConsumptionGraphFormat(comparisonDate, currDate, 1440);
        
    //     this.setState({ dayData: updatedDay });
    // }

    // updateWeek = ( currDate ) => {
    //     comparisonDate = new Date();
    //     comparisonDate.setDate(currDate.getDate()-28);
        
    //     // if (this.props.navigation.state.params.card == 1) {
    //     //     updatedWeek = getTotalConsumptionGraphFormat(comparisonDate, currDate, 10080);
    //     // } else {
    //     //     updatedWeek = getTotalGenerationGraphFormat(comparisonDate, currDate, 10080);
    //     // }
    //     updatedWeek = getTotalConsumptionGraphFormat(comparisonDate, currDate, 10080);

    //     this.setState({ weekData: updatedWeek });
    // }

    // updateMonth = ( currDate ) => {
    //     comparisonDate = new Date();
    //     comparisonDate.setMonth(currDate.getMonth()-11);

    //     // if (this.props.navigation.state.params.card == 1) {
    //     //     updatedMonth = getTotalConsumptionGraphFormat(comparisonDate, currDate, 41760);
    //     // } else {
    //     //     updatedMonth = getTotalGenerationGraphFormat(comparisonDate, currDate, 41760);
    //     // }

    //     updatedMonth = getTotalConsumptionGraphFormat(comparisonDate, currDate, 41760);

    //     this.setState({ monthData: updatedMonth });
    // }

    // updateYear = ( currDate ) => {
    //     comparisonDate = new Date();
    //     comparisonDate.setYear(currDate.getFullYear()-5);

    //     // if (this.props.navigation.state.params.card == 1) {
    //     //     updatedYear = getTotalConsumptionGraphFormat(comparisonDate, currDate, 525600);
    //     // } else {
    //     //     updatedYear = getTotalGenerationGraphFormat(comparisonDate, currDate, 525600);
    //     // }

    //     updatedYear = getTotalConsumptionGraphFormat(comparisonDate, currDate, 525600);        

    //     this.setState({ yearData: updatedYear });
    // }

    // Decide what units to render based on utility and time
    getBuildingUnits(utility, time) {
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
        // REMOVING TIMEPERIOD
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
        return (units + timePeriod)
    }

    // Displays header showing current usage
    getHeader = (currentData) => {
        // Array of API data: [gas, electricity, heat, water]
        const themeStyles = GetStyle(CurrTheme);
        try {
            console.log("SelectedUtilityCard", this.state.selectedUtilityCard)
            //headerText = this.numberWithCommas((getCurrentBuildingUtilityConsumption(this.props.navigation.state.params.item.name, this.mapUtilityNameToIndex(this.state.selectedUtilityCard))).toFixed(0))
            // shows value (hence "y", "x" would show label) of current data usage
            headerText = this.numberWithCommas((currentData["usage"][this.state.selectedUtilityCard-5]["y"]).toFixed(0));
            subheaderText = this.getBuildingUnits(this.state.selectedUtilityCard, this.state.selectedTimeCard)
        } catch (error) {
            console.log("Error in displaying IndividualBuilding header: ", error)
            headerText = "N/A"
            subheaderText = ""
        }

      return (
        <View style={[styles.textContainer, themeStyles.centered]}>
            <Text style={[styles.number, themeStyles.translucentText]}>
                {headerText}
            </Text>
            <View style={themeStyles.flexboxRow}>
                <Text style={[styles.subHeader, themeStyles.translucentText]}>
                    {subheaderText}
                 </Text>
            </View>
        </View>
      );
    }

    // Returns data to be displayed
    getGraphScope = (data) => {
        // if (this.state.view == 'day') {
        //     return this.state.dayData["data"];
        // } else if (this.state.view == 'week') {
        //     return this.state.weekData["data"];
        // } else if (this.state.view == 'month') {
        //     return this.state.monthData["data"];
        // } else if (this.state.view == 'year') {
        //      return this.state.yearData["data"];
        // }
        // Updated redux data
        if (this.state.view == 'day') {
            return data["dayUsage"].data;
        } else if (this.state.view == 'week') {
            return data["weekUsage"].data;
        } else if (this.state.view == 'month') {
            return data["monthUsage"].data;
        } else if (this.state.view == 'year') {
            return data["yearUsage"].data;
        }
    }

    // Gets data from time denominator buttons for graph
    scopeCallbackGraph = ( buttonView, buttonComparator, buttonIndex ) => {
        this.setState({ view: buttonView,
            viewNumber: buttonComparator,
            selectedTimeCard: buttonIndex});
    }

    // Gets data from utility button
    scopeCallbackUtilities = ( buttonIndex ) => {
        this.setState({ selectedUtilityCard: buttonIndex});
    }

    // Helper function to add commas to large numbers
    numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        var utilities = ["Gas", "Electric", "Heat", "Water"];
        const { refresh, loading, historicalData, currentData } = this.props; // redux
        currData = this.getGraphScope(historicalData);
        header = this.getHeader(currentData);

        return (
            <View style={[themeStyles.flex, themeStyles.list]}>
                <View
                    // controls height of header
                    style={{ height: verticalScale(110) }}>
                    <Image
                        style={themeStyles.header} 
                        source={{ uri: this.props.navigation.state.params.item.avatar }} />
                    <View style={[themeStyles.header, themeStyles.carletonBlueBackground]}/>
                    {header}
                </View>

                <ScrollView style={themeStyles.lightBlueBackground}>
                    <GraphDetail data={currData} // was graphData
                        callback={this.scopeCallbackGraph}
                        selected={this.state.selectedTimeCard} // button index must match selected
                        type={1} // indicates energy usage, 2 is generation
                    />                    
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
    button: {
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 100,
    },
    img: {
        alignSelf: 'stretch',
        height: 100,
    },
    number: {
        fontSize: moderateScale(70),
    },
    textContainer: {
        // marginBottom: '5%',
        marginBottom: '2%',
        marginTop: '2%'
    },
    subHeader: {
        //fontSize: 20,
        // marginTop: '-2%',
        fontSize: moderateScale(16),
    }
})