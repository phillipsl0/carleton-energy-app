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

    getHeader = (historicalData, cardType) => {
        const themeStyles = GetStyle(CurrTheme);

        if (this.state.selectedCard <= 4) {
            headerText = this.getRanking(historicalData, cardType);
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
        const { refresh, loading, historicalData } = this.props;

        cardType = this.props.navigation.state.params.card;
        currData = this.getGraphScope(historicalData, cardType);
        header = this.getHeader(historicalData, cardType);

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
        fontSize: verticalScale(100),
    },

    textContainer: {
        marginBottom: '2%',
        marginTop: '-2%'
    },

    words: {
        fontSize: verticalScale(16),
        marginTop: '-3%',
    },
})
