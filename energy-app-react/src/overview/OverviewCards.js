import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform, ScrollView } from 'react-native';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import GraphDetail from './GraphDetailCard';
import Utilities from './UtilitiesMiniCards';
import { getTotalConsumptionGraphFormat, getTotalGenerationGraphFormat } from './../helpers/ApiWrappers';


export default class OverviewCards extends Component {
    constructor(props) {
        super(props);
        data = this.props.navigation.state.params.data.comparison;
        //TODO: add when lastupdated

        this.state = {
            view: 'day',
            viewNumber: 7,
            selectedCard: 1,
            dayData: data.day.graph,
            weekData: data.week.graph,
            monthData: data.month.graph,
            yearData: data.year.graph,
        };
    }

    componentDidMount() {
        currDate = new Date();
        
        this.updateDay(currDate);
        this.updateWeek(currDate);
        this.updateMonth(currDate);
        this.updateYear(currDate);
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

    scopeCallbackGraph = ( buttonView, buttonComparator, buttonIndex ) => {
        this.setState({ view: buttonView,
            viewNumber: buttonComparator,
            selectedCard: buttonIndex});
    }

    scopeCallbackUtilities = ( buttonIndex ) => {
        this.setState({ selectedCard: buttonIndex});
    }

    getGraphScope = () => {
        graphData = navigation.state.params.data.comparison;

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

    getRanking = () => {
        graphData = navigation.state.params.data.comparison;

        if (this.state.view == 'day') {
            return this.state.dayData["rank"];
        } else if (this.state.view == 'week') {
            return this.state.weekData["rank"];
        } else if (this.state.view == 'month') {
            return this.state.monthData["rank"];;
        } else if (this.state.view == 'year') {
             return this.state.yearData["rank"];;
        }
    }

    getHeader = () => {
        const themeStyles = GetStyle(CurrTheme);

        if (this.state.selectedCard <= 4) {
            headerText = this.getRanking();
            viewNumber = this.state.viewNumber;
            view = this.state.view;

            if (this.props.navigation.state.params.card == 1) {
                verb = 'use';
            } else {
                verb = 'generation';
            }

            subheaderText = "in " + verb + " compared to the past " + viewNumber
                + " " + view + "s";

        } else if (this.state.selectedCard == 5) {
            headerText = "!!!";
            subheaderText = "testing";

        } else if (this.state.selectedCard == 6) {
            headerText = "???";
            subheaderText = "testing";

        } else if (this.state.selectedCard == 7) {
            headerText = "Wow";
            subheaderText = "testing";

      } else if (this.state.selectedCard == 8) {
            headerText = "test";
            subheaderText = "testing";
      }

      return (
          <View style={[styles.textContainer, themeStyles.centered]}>
             <Text style={[styles.number, themeStyles.translucentText, themeStyles.fontBold]}>
                {headerText}
             </Text>

             <Text style={[styles.words, themeStyles.translucentText]}>
                {subheaderText}
             </Text>
          </View>
      );
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        navigation = this.props.navigation;
        currData = this.getGraphScope();
        header = this.getHeader();

        return (
            <View style={[themeStyles.flex, themeStyles.list]}>

            <Image source={require('./../assets/windmillHeader.png')}
                style={themeStyles.header}/>
            <View style={[themeStyles.header, themeStyles.carletonBlueBackground]}/>
            {header}

             <ScrollView style={themeStyles.lightBlueBackground}>
                    <GraphDetail data={currData}
                        callback={this.scopeCallbackGraph}
                        selected={this.state.selectedCard}/>

                    <Utilities callback={this.scopeCallbackUtilities}
                        selected={this.state.selectedCard}/>
             </ScrollView>
             </View>

            );
    }
}

const styles = StyleSheet.create({
    number: {
        fontSize: 100,
    },

    textContainer: {
        marginBottom: '5%',
    },

    words: {
        fontSize: 16,
        marginTop: '-3%',
    },
})
