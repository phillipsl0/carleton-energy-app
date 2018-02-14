import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import GraphDetail from './GraphDetailCard';
import Utilities from './UtilitiesMiniCards';
import { getTotalConsumptionGraphFormat, getTotalGenerationGraphFormat } from './../helpers/ApiWrappers';
import { moderateScale, verticalScale } from './../helpers/Scaling';

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

export default class OverviewCards extends Component {
    constructor(props) {
        super(props);
        //TODO: add when lastupdated

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

    numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getGraphScope = (data, cardType) => {
        if (cardType == 1) {
            if (this.state.view == 'day') {
                return data["dayUsage"].data;
            } else if (this.state.view == 'week') {
                return data["weekUsage"].data;
            } else if (this.state.view == 'month') {
                return data["monthUsage"].data;
            } else if (this.state.view == 'year') {
                return data["yearUsage"].data;
            }
        } else {
            if (this.state.view == 'day') {
                return data["dayGeneration"].data;
            } else if (this.state.view == 'week') {
                return data["weekGeneration"].data;
            } else if (this.state.view == 'month') {
                return data["monthGeneration"].data;
            } else if (this.state.view == 'year') {
                return data["yearGeneration"].data;
            }
        }

    }

    getRanking = (data, cardType) => {
        if (this.state.view == 'day') {
            return data["dayUsage"].rank;
        } else if (this.state.view == 'week') {
            return data["weekUsage"].rank;
        } else if (this.state.view == 'month') {
            return data["monthUsage"].rank;
        } else if (this.state.view == 'year') {
             return data["yearUsage"].rank;
        }
    }

    getHeader = (historicalData, cardType, currentData) => {
        const themeStyles = GetStyle(CurrTheme);
        var units = ["thm", "kWh", "kBTU", "gal"];

        if (this.state.selectedCard <= 4) {
            headerText = this.getRanking(historicalData, cardType);
            viewNumber = this.state.viewNumber;
            view = this.state.view;

            if (cardType == 1) {
                verb = 'use';
            } else {
                verb = 'generation';
            }

            subheaderText = "in " + verb + " compared to the past ";
            subheaderHighlight = viewNumber + " " + view + "s";
            highlight = true;

        } else {
            if (cardType == 1) {
                verb = 'usage';
            } else {
                verb = 'generation';
            }

            headerText = this.numberWithCommas(currentData["usage"][this.state.selectedCard - 5]["y"]);

//            headerText = Number(currentData["usage"][this.state.selectedCard - 5]["y"]).toLocaleString();
            subheaderText = units[this.state.selectedCard - 5];
            highlight = false;
        }


      return (
          <View style={[styles.textContainer, themeStyles.centered]}>

            <Text style={[styles.number, themeStyles.translucentText, themeStyles.fontBold]}>
                {headerText}
            </Text>
            <View style={themeStyles.flexboxRow}>
            <Text style={[styles.words, themeStyles.translucentText]}>
                {subheaderText}
             </Text>
             {highlight && <Text style={[styles.words, styles.highlight]}>
             {subheaderHighlight}
             </Text>}
             </View>
          </View>
      );
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        const { refresh, loading, historicalData, currentData } = this.props;
        var utilities = ["Gas", "Electric", "Heat", "Water"];
        var generators = ["Wind", "Solar", "Geothermal"]

        cardType = this.props.navigation.state.params.card;
        currData = this.getGraphScope(historicalData, cardType);
        header = this.getHeader(historicalData, cardType, currentData);

        return (
            <View style={[themeStyles.flex, themeStyles.list]}>
            <View style={{ height: verticalScale(130) }}>
            <Image source={require('./../assets/windmillHeader.png')}
                style={themeStyles.header}/>
            <View style={[themeStyles.header, themeStyles.carletonBlueBackground]}/>
            {header}
            </View>

             <ScrollView style={themeStyles.lightBlueBackground}>
                <GraphDetail data={currData}
                    callback={this.scopeCallbackGraph}
                    selected={this.state.selectedCard}
                    type={cardType}/>
             </ScrollView>
             </View>

            );
    }
}
// <Utilities callback={this.scopeCallbackUtilities}
////              cards={cardType == 1 ? utilities : generators}
//                cardType={cardType}
//              selected={this.state.selectedCard}/>
const styles = StyleSheet.create({
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
    highlight: {
        color: '#F3B61D',
        backgroundColor: 'transparent'
    }
})
