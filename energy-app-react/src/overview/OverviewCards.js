import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Svg } from 'react-native-svg';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import GraphDetail from './GraphDetailCard';
import Utilities from './UtilitiesMiniCards';
import { moderateScale, verticalScale, roundNumber } from './../helpers/General';

const USAGE_CARD = 1;

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

    getGraphScope = (data, cardType) => {
        if (cardType == USAGE_CARD) {
            switch (this.state.view) {
                case "day":
                    return data["dayUsage"].data;

                case "week":
                    return data["weekUsage"].data;

                case "month":
                    return data["monthUsage"].data;

                case "year":
                    return data["yearUsage"].data;
            }

        } else {
            switch (this.state.view) {
                case "day":
                    return data["dayGeneration"].data;

                case "week":
                    return data["weekGeneration"].data;

                case "month":
                    return data["monthGeneration"].data;

                case "year":
                    return data["yearGeneration"].data;
            }
        }

    }

    getRanking = (data, cardType) => {
        if (cardType == USAGE_CARD) {
            switch (this.state.view) {
                case "day":
                    return data["dayUsage"].rank;

                case "week":
                    return data["weekUsage"].rank;

                case "month":
                    return data["monthUsage"].rank;

                case "year":
                    return data["yearUsage"].rank;
            }
        } else {
            switch (this.state.view) {
                case "day":
                    return data["dayGeneration"].rank;

                case "week":
                    return data["weekGeneration"].rank;

                case "month":
                    return data["monthGeneration"].rank;

                case "year":
                    return data["yearGeneration"].rank;
            }
        }
    }

    getHeader = (historicalData, cardType, currentData) => {
        const theme = GetStyle(CurrTheme);
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

            headerText = roundNumber(currentData["usage"][this.state.selectedCard - 5]["y"]);
            console.log(roundNumber(105005960.96978705));

            subheaderText = units[this.state.selectedCard - 5];
            highlight = false;
        }


      return (
          <View style={[styles.textContainer, theme.centered, {paddingBottom: '3%'}]}>

            <Text style={[styles.number, theme.translucentText, theme.fontBold]}>
                {headerText}
            </Text>
            <View style={theme.flexboxRow}>
            <Text style={[styles.words, theme.translucentText]}>
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
        const { width, height } = Dimensions.get('window');
        const theme = GetStyle(CurrTheme);
        const { refresh, loading, historicalData, currentData } = this.props;
        var utilities = ["Gas", "Electric", "Heat", "Water"];
        var generators = ["Wind", "Solar", "Geothermal"]

        cardType = this.props.navigation.state.params.card;
        currData = this.getGraphScope(historicalData, cardType);
        header = this.getHeader(historicalData, cardType, currentData);

        return (
            <View style={[theme.lightBlueBackground, {position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}]}>
            <View style={[{width:width+5}, theme.centered, styles.height]}>
            <Image source={require('./../assets/windmillHeader.png')}
                style={[styles.head, {width:width+5}, styles.height]}
                resizeMode="cover"/>
            <View style={[{width:width+5}, styles.head, styles.height, theme.carletonBlueBackground]}/>
            {header}
            </View>
             <ScrollView style={[theme.lightBlueBackground]}>
                <GraphDetail data={currData}
                    callback={this.scopeCallbackGraph}
                    selected={this.state.selectedCard}
                    type={cardType}/>
             </ScrollView>
            <Utilities callback={this.scopeCallbackUtilities}
               cards={cardType == 1 ? utilities : generators}
               cardType={cardType}
               selected={this.state.selectedCard}/>
             </View>

            );
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
    }
})
