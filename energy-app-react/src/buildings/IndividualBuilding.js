import { List, Card, Button, Avatar } from 'react-native-elements';
import React, { Component } from 'react';
import { Platform, AppRegistry, SectionList, StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

// import { getAllCurrentBuildingGraphData } from './../helpers/ApiWrappers';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import GraphDetail from './../overview/GraphDetailCard';
import Utilities from './../overview/UtilitiesMiniCards';
import ComparisonPage from './ComparisonPage';
import { moderateScale, verticalScale } from './../helpers/Scaling';
import BuildingComparison from './BuildingComparison';

// @connect(
//     state => ({
//         historicalData: state.data.historicalData,
//         currentData: state.data.currentData,
//     }),
//     dispatch => ({
//         refresh: () => dispatch({type: 'GET_GRAPH_DATA'}),
//     }),
// )

@connect(
    state => ({
        historicalBuildingData: state.buildings.historicalBuildingData,
        currentBuildingData: state.buildings.currentBuildingData,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_BUILDING_GRAPH_DATA'}),
    }),
)
export default class IndividualBuilding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buildingName: this.props.navigation.state.params.item.name,
            selectedUtility: 1, // index for utility card - itialized to gas
            selectedTime: 1, // index for time card - intialized to day
            view: 'day',
        }
    }

    // This function gets called immediately after the component is mounted
    componentDidMount() {
        this.getUtility(); // get utility from energy map selection, if present
    }

    // Get utility selected from stack navigation
    getUtility() {
        utilitySelected = this.props.navigation.state.params.selected;
        // If comes from map, utilitySelected specified upon navigation
        if (utilitySelected !== undefined) {
            this.setState({ selectedUtility:utilitySelected })
        }
    }

    // Decide what units to render based on utility and time
    getBuildingUnits(utility, time) {
        var units = ""
        if (utility == 1) { // total
          units = "BTU"
        } else if (utility == 2) { // heat
          units = "kBTU"
        } else if (utility == 3) { // electricity
          units = "kWh"
        } else if (utility == 4) { // water
          units = "gal"
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
        return (units + timePeriod)
    }

    // Displays header showing current usage
    getHeader = (currentData) => {
        // Array of API data ['data']['usage']: [gas, electiricy, heat, water]
        const theme = GetStyle(CurrTheme);
        const { width, height } = Dimensions.get('window');        
        try {
            headerText = this.numberWithCommas((this.getHeaderText(currentData, this.state.selectedUtility)).toFixed(0));
            subheaderText = this.getBuildingUnits(this.state.selectedUtility, this.state.selectedTime)
        } catch (error) {
            console.log("Error in displaying IndividualBuilding header: ", error)
            headerText = "N/A"
            subheaderText = ""
        }

        if (height < 600) {
            return (
                <View style={[styles.textContainer, theme.centered, {paddingBottom: '3%'}]}>
                    <Text style={[styles.smallNumber, theme.translucentText, theme.fontBold]}>
                        {headerText}
                    </Text>
                    <View style={theme.flexboxRow}>
                        <Text style={[styles.smallWords, styles.highlight]}>
                            {subheaderText}
                        </Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[styles.textContainer, theme.centered, {paddingBottom: '3%'}]}>
                    <Text style={[styles.number, theme.translucentText, theme.fontBold]}>
                        {headerText}
                    </Text>
                    <View style={theme.flexboxRow}>
                        <Text style={[styles.words, styles.highlight]}>
                            {subheaderText}
                        </Text>
                    </View>
                </View>
            );
        }
    }

    // Helper function to add commas to large numbers
    numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Maps utility name to its respective API placement
    getHeaderText(currentData, utilityIndex) {
        if (utilityIndex == 1) {
          // total
          return (currentData["total"]);
        }
        else if (utilityIndex == 2) {
          // heat
          return (currentData['data'][2]["y"]);
        }
        else if (utilityIndex == 3) {
          // electric
          return (currentData['data'][1]["y"]);
        }
        else if (utilityIndex == 4) {
          // water
          return (currentData['data'][3]["y"]);
        }
        return (currentData["total"]);
    };

    mapUtilityIndexToAPIName(utilityIndex) {
        if (utilityIndex == 2) {
          // heat
          return ("heat");
        }
        else if (utilityIndex == 3) {
          // electric
          return ("electricity");
        }
        else if (utilityIndex == 4) {
          // water
          return ("water");
        }
        return ("electricity");
    };

    // Returns data to be displayed in graph following redux format
    getGraphScope = (data) => {
        if (this.state.selectedUtility == 1) {
            if (this.state.view == 'day') {
                return data["dayUsage"]["total"];
            } else if (this.state.view == 'week') {
                return data["weekUsage"]["total"];
            } else if (this.state.view == 'month') {
                return data["monthUsage"]["total"];
            } else if (this.state.view == 'year') {
                return data["yearUsage"]["total"];
            }
        } else {
            utilityName = this.mapUtilityIndexToAPIName(this.state.selectedUtility)
            if (this.state.view == 'day') {
                return data["dayUsage"]["data"][utilityName];
            } else if (this.state.view == 'week') {
                return data["weekUsage"]["data"][utilityName];
            } else if (this.state.view == 'month') {
                return data["monthUsage"]["data"][utilityName];
            } else if (this.state.view == 'year') {
                return data["yearUsage"]["data"][utilityName];
            }
        };
    }

    // Gets data from time denominator buttons for graph
    scopeCallbackGraph = ( buttonView, buttonComparator, buttonIndex ) => {
        this.setState({ view: buttonView,
            viewNumber: buttonComparator,
            selectedTime: buttonIndex
        });
    }

    // Gets data from utility button
    scopeCallbackUtilities = ( buttonIndex ) => {
        this.setState({ selectedUtility: buttonIndex});
    }

    render() {
        const theme = GetStyle(CurrTheme);
        const { width, height } = Dimensions.get('window');
        const { refresh, historicalBuildingData, currentBuildingData } = this.props; // redux
        var utilities = ["Gas", "Electric", "Heat", "Water"];

        graphData = this.getGraphScope(historicalBuildingData[this.state.buildingName])
        header = this.getHeader(currentBuildingData[this.state.buildingName]);

        if (height < 600) {
            return (
                <View style={[theme.lightBlueBackground, {position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}]}>
                    <View style={[{width:width+5}, styles.smallHeight, theme.centered]}>
                        <Image
                            resizeMode="cover"
                            style={[styles.head, {width:width+5}, styles.smallHeight]}
                            source={{ uri: this.props.navigation.state.params.item.avatar }} />
                        <View style={[{width:width+5}, styles.head, styles.smallHeight, theme.carletonBlueBackground]}/>
                        {header}
                    </View>
                    <GraphDetail data={graphData}
                        utilityCallback={this.scopeCallbackUtilities}
                        graphCallback={this.scopeCallbackGraph}
                        timeSelected={this.state.selectedTime}
                        utilitySelected={this.state.selectedUtility}
                        type={1} // indicates energy usage, 2 is generation
                    />
                </View>

            );
        } else {
            return (
                <View style={[theme.lightBlueBackground, {position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}]}>
                    <View style={[theme.centered, styles.height]}>
                        <Image
                            resizeMode="cover"
                            source={{ uri: this.props.navigation.state.params.item.avatar }} 
                            style={[styles.head, {width:width+5}, styles.height]} />
                        <View style={[{width:width+5}, styles.head, styles.height, theme.carletonBlueBackground]}/>
                        {header}
                    </View>
                    <GraphDetail data={graphData}
                        utilityCallback={this.scopeCallbackUtilities}
                        graphCallback={this.scopeCallbackGraph}
                        timeSelected={this.state.selectedTime}
                        utilitySelected={this.state.selectedUtility}
                        type={1} // indicates energy usage, 2 is generation
                    />
                </View>
            );
        }
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
    highlight: {
        color: '#F3B61D',
        backgroundColor: 'transparent'
    },
    img: {
        alignSelf: 'stretch',
        height: 100,
    },
    number: {
        fontSize: moderateScale(75),
    },
    textContainer: {
        marginBottom: '2%',
        marginTop: '2%'
    },
    words: {
        fontSize: moderateScale(16),
    },
    head: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        opacity: 0.5,
    },

    height: {
         height: moderateScale(125),
         ...Platform.select({
            android: {
                height: moderateScale(105)
            }
         })
    },

    smallNumber: {
        fontSize: moderateScale(65)
    },

    smallHeight: {
        height: moderateScale(90),
    },

    smallWords: {
        fontSize: moderateScale(14),
    }
})