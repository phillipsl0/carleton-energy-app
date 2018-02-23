/* OverviewCards.js
 * Written by Liv Phillips for Energy App Comps, 2018
 * Second level detail cards for Overview page, containing header & graph card.
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Svg } from 'react-native-svg';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import GraphDetail from './GraphDetailCard';
import { moderateScale, verticalScale, roundNumber } from './../helpers/General';

const USAGE_CARD = 1;

const DAY = 1;
const WEEK = 2;
const MONTH = 3;
const YEAR = 4;

const TOTAL = 1;

const GAS = 2;
const ELECTRIC = 3;
const WATER = 4;

const WIND = 2;
const SOLAR = 3;
const GEO = 4;

@connect(
    state => ({
        historicalData: state.data.historicalData,
        currentData: state.data.currentData,
        loading: state.data.loading,
        ui: state.ui,
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
            selectedTime: 1,
            selectedUtility: 1,
            graphData: null,
        };
    }

    scopeCallbackGraph = ( buttonView, buttonComparator, buttonIndex ) => {
        this.setState({ view: buttonView,
            viewNumber: buttonComparator,
            selectedTime: buttonIndex});
    }

    scopeCallbackUtilities = ( buttonIndex ) => {
        this.setState({ selectedUtility: buttonIndex});
    }

    getGraphScope = (data, cardType) => {
        var indexData = this.getIndices();
        var firstIndex = indexData["indices"][0];
        var secondIndex = indexData["indices"][1];
        var thirdIndex = indexData["indices"][2];

        if (indexData["three"]){
            return this.props.historicalData[firstIndex][secondIndex][thirdIndex];

        } else {
            return this.props.historicalData[firstIndex][secondIndex];
        }

    }

    getUnits = (indexData) => {
        if (indexData["three"]){
            switch(indexData["indices"][2]){
                case "gas":
                    return "BTU";
                    break;

                case "water":
                    return "gal";
                    break;

                default:
                    return "kWh";
                    break;
            }
        } else {
            return "kWh";
        }
    }

    /* Indexes into the full data object to get the specific numbers necessary for the current view */
    getIndices = () => {
        var data = {};
        var indices = new Array(3);

        switch(this.state.selectedTime) {
            case 1:
                if (cardType == 1){
                    indices[0] = 'dayUsage';
                } else {
                    indices[0] = 'dayGeneration';
                }

                break;

            case 2:
                if (cardType == 1){
                    indices[0] = 'weekUsage';
                } else {
                    indices[0] = 'weekGeneration';
                }

                break;

            case 3:
                if (cardType == 1){
                    indices[0] = 'monthUsage';
                } else {
                    indices[0] = 'monthGeneration';
                }

                break;

            case 4:
                if (cardType == 1){
                    indices[0] = 'yearUsage';
                } else {
                    indices[0] = 'yearGeneration';
                }

                break;
        }

        if (this.state.selectedUtility != 1) {
            data["three"] = true;
        } else {
            data["three"] = false;
        }

        switch (this.state.selectedUtility) {
            case 1:
                indices[1] = 'total';
                break;

            case 2:
                indices[1] = 'data';

                if (cardType == USAGE_CARD) {
                    indices[2] = 'gas';

                } else {
                    indices[2] = 'wind';
                }
                break;

            case 3:
                indices[1] = 'data';

                if (cardType == USAGE_CARD) {
                    indices[2] = 'electricity';

                } else {
                    indices[2] = 'solar';

                }
                break;

            case 4:
                indices[1] = 'data';

                if (cardType == USAGE_CARD) {
                    indices[2] = 'water';
                } else {
                    indices[2] = 'geo';
                }
                break;
           }

            data["indices"] = indices;

            return data;
    }

    /* Returns the correct header based on the current view */
    getHeader = (historicalData, cardType, currentData) => {
        const theme = GetStyle(CurrTheme);
        const { ui } = this.props;
        const { width, height } = ui.layout;
        var units = ["thm", "kWh", "kBTU", "gal"];

        var indexData = this.getIndices();
        var firstIndex = indexData["indices"][0];
        var secondIndex = indexData["indices"][1];
        var thirdIndex = indexData["indices"][2];
        var index;

        if (indexData["three"]){
            index = historicalData[firstIndex][secondIndex][thirdIndex].length-1;
            headerText = roundNumber(historicalData[firstIndex][secondIndex][thirdIndex][index]["y"]);
            subheaderText = this.getUnits(indexData) + " in the past ";
            subheaderHighlight = this.state.view;

        } else {
            index = historicalData[firstIndex][secondIndex].length-1;
            headerText = roundNumber(historicalData[firstIndex][secondIndex][index]["y"]);
            subheaderText = this.getUnits(indexData) + " in the past ";
            subheaderHighlight = this.state.view;
        }

      /* Small phones defy all styling tricks, so they need special help */
      if (height < 600) {
        return (
          <View style={[styles.textContainer, theme.centered, {paddingBottom: '3%'}]}>

            <Text style={[styles.smallNumber, theme.translucentText, theme.fontBold]}>
                {headerText}
            </Text>
            <View style={theme.flexboxRow}>
            <Text style={[styles.smallWords, theme.translucentText]}>
                {subheaderText}
             </Text>
             <Text style={[styles.smallWords, styles.highlight]}>
             {subheaderHighlight}
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
                <Text style={[styles.words, theme.translucentText]}>
                    {subheaderText}
                 </Text>
                 <Text style={[styles.words, styles.highlight]}>
                 {subheaderHighlight}
                 </Text>
                 </View>
              </View>
          );
      }
    }



    render() {
        const { ui } = this.props;
        const { width, height } = ui.layout;
        const theme = GetStyle(CurrTheme);
        const { refresh, loading, historicalData, currentData } = this.props;

        cardType = this.props.navigation.state.params.card;
        currData = this.getGraphScope(historicalData, cardType);
        header = this.getHeader(historicalData, cardType, currentData);

        if (height < 600) {
            return(
                <View style={[theme.lightBlueBackground, {position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}]}>
                <View style={[{width:width+5}, styles.smallHeight, theme.centered]}>
                <Image source={require('./../assets/windmillHeader.png')}
                    style={[styles.head, {width:width+5}, styles.smallHeight,]}
                    resizeMode="cover"/>
                <View style={[{width:width+5}, styles.head, styles.smallHeight, theme.carletonBlueBackground]}/>
                {header}
                </View>
                    <GraphDetail data={currData}
                        utilityCallback={this.scopeCallbackUtilities}
                        graphCallback={this.scopeCallbackGraph}
                        timeSelected={this.state.selectedTime}
                        utilitySelected={this.state.selectedUtility}
                        type={cardType}/>
                </View>

            );
        } else {
            return (
                    <View style={[theme.lightBlueBackground, {position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}]}>
                    <View style={[{width:width+5}, theme.centered, styles.height]}>
                    <Image source={require('./../assets/windmillHeader.png')}
                        style={[styles.head, {width:width+5}, styles.height]}
                        resizeMode="cover"/>
                    <View style={[{width:width+5}, styles.head, styles.height, theme.carletonBlueBackground]}/>
                    {header}
                    </View>
                    <GraphDetail data={currData}
                        utilityCallback={this.scopeCallbackUtilities}
                        graphCallback={this.scopeCallbackGraph}
                        timeSelected={this.state.selectedTime}
                        utilitySelected={this.state.selectedUtility}
                        type={cardType}/>
                    </View>

                );
        }
    }
}

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
    },
    head : {
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
