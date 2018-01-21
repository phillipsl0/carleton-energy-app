import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform, ScrollView } from 'react-native';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import GraphDetail from './GraphDetailCard';
import Utilities from './UtilitiesMiniCards';


export default class OverviewCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'day',
            viewNumber: 7,
            selectedCard: 1,
        };
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
            return graphData.day.graph;
        } else if (this.state.view == 'week') {
            return graphData.week.graph;
        } else if (this.state.view == 'month') {
            return graphData.month.graph;
        } else if (this.state.view == 'year') {
             return graphData.year.graph;
        }
    }

    getRanking = () => {
        graphData = navigation.state.params.data.comparison;

        if (this.state.view == 'day') {
            return graphData.day.ranking;
        } else if (this.state.view == 'week') {
            return graphData.week.ranking;
        } else if (this.state.view == 'month') {
            return graphData.month.ranking;
        } else if (this.state.view == 'year') {
             return graphData.year.ranking;
        }
    }

    getHeader = () => {
        const themeStyles = GetStyle(CurrTheme);

        if (this.state.selectedCard <= 4) {
            headerText = this.getRanking();
            viewNumber = this.state.viewNumber;
            view = this.state.view;
            subheaderText = "in energy use compared to the past " + viewNumber
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
             <Text style={[styles.number, themeStyles.translucentText]}>
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

            <Image source={require('./../assets/noskyWindmill.png')}
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
