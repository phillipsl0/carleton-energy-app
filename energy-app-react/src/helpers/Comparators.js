import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { moderateScale, verticalScale } from './../helpers/Scaling';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import {roundNumber, getSpecificRandom, combineData } from './General';

// all equivalencies from https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator

// 1000 kWh equivalent to -> kWhComparison[i] + comparisons[i]
var kWhComparison = [0.16, 1824, 0.259, 0.037, 83.7, 814, 0.01, 0.08, 0.0002, 0.112,
    0.004, 24.9, 1.7, 30.4, 19.3, 37];

var comparisons = ["cars driven for 1 year", "miles driven by an average car", "tons of waste recycled instead of landfilled",
    "trucks of waste recycled instead of landfilled", "gallons of gasoline consumed", "lbs of coal burned",
    "tanker trucks worth of gasoline", "homes energy use for one year", "wind turbines running for a year",
    "homes electricity use for one year", "railcars worth of coal burned", "incandescent lamps switched to LEDs",
    "barrels of oil consumed", "propane cylinders used", "tree seedlings grown for 10 years",
    "hamburgers eaten"];

var icons = ["car", "car", "delete-empty", "delete-empty", "gas-station", "fire", "truck", "home-modern", "weather-windy",
    "home-modern", "train", "lightbulb-on-outline", "barrel", "gas-cylinder", "tree", "hamburger"];

@connect(
    state => ({
        ui: state.ui
    }),
)
export default class Comparator extends Component {
    // combine the data into one total, and get random comparators
    convertData = (data) => {
        var newData = {};
        var comparators = new Array(3);
        var dataNumber = this.props.total;

        dataNumber = dataNumber/1000;
        newData["total"] = dataNumber;
        newData["fontSmaller"] = false;

        for (var i=0; i<3; i++) {
            temp = getSpecificRandom(0, kWhComparison.length, 1, 1);

            while (comparators.includes(temp)) {
                temp = getSpecificRandom(0, kWhComparison.length, 1, 1);
            }

            // these three are too long, so we want them to be smaller fonts
            if (temp == 2 || temp == 3 || temp == 11) {
                newData["font"] = true;
            }

            comparators[i] = temp;
        }

        newData["comparators"] = comparators;
        return newData;
    }

    // grab the correct number of comparators
    getComparison = (data, cardType) => {
        var theme = GetStyle(CurrTheme);
        var font = 12;
        var icon = 20;

        const { ui } = this.props;
        const { width, height } = ui.layout;

        if (width < 350) {
            font = 10;
        }

        var converted = this.convertData(data);

        if (converted["comparators"][0] == 2 || converted["comparators"][0] == 3
            || converted["comparators"][0] == 11) {
            font = 11;
            icon = 18;
        }

        return(
            <View style={ styles.oneContainer }>

            <View style={ styles.divider }></View>

            <View style={[theme.centered, {paddingTop: '2%', flex: 1, width: moderateScale(300)}]}>

            <Text style={[ theme.fontBold ]}> Total: </Text>
            <Text style={ [styles.oneFont, { fontSize: font, flex: 1 }]}>
                {roundNumber(converted["total"])} MWh in the last hour
            </Text>
            </View>
            <View style={[theme.centered, {paddingTop: '2%', flex: 1, width: moderateScale(300)}]}>
            <Text style={[ theme.fontBold ]}> Compare to... </Text>

            <View style={[ theme.flexboxRow ]}>

              <MaterialCommunityIcons color="#0B5091" size={moderateScale(icon)} name={icons[converted["comparators"][0]]}/>
              <Text style={[ styles.oneFont, { fontSize: moderateScale(font) }] }>
              {roundNumber(kWhComparison[converted["comparators"][0]]* converted["total"])} {comparisons[converted["comparators"][0]]}
              </Text>

            </View>
            </View>
            </View>
        );

    }

    render() {
        comparison = this.getComparison(this.props.data, this.props.cardType);

        return(
            <View>
                {comparison}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    divider: {
        borderTopColor: '#d3d3d3',
        borderTopWidth: 1,
        marginLeft: '5%',
        marginRight: '5%'
    },

    oneContainer: {
        backgroundColor: '#F5FCFF',
        paddingTop: '1%',
        flex: 1
    },

    oneFont: {
        fontSize: moderateScale(12),
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '2%',
        paddingRight: '3%',
        color: '#647C92',
    },
})