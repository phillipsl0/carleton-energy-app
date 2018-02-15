import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { moderateScale, verticalScale } from './../helpers/Scaling';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import {roundNumber, convertGallons, convertKbtus, convertThms, getSpecificRandom, combineData } from './General';

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

export default class Comparator extends Component {
    convertData = (data) => {
        var newData = {};
        var comparators = new Array(3);
        var dataNumber = combineData(data);

        dataNumber = dataNumber/1000;
        newData["total"] = dataNumber;

        for (var i=0; i<3; i++) {
            temp = getSpecificRandom(0, kWhComparison.length, 1, 1);

            while (comparators.includes(temp)) {
                temp = getSpecificRandom(0, kWhComparison.length, 1, 1);
            }

            comparators[i] = temp;
        }

        newData["comparators"] = comparators;
        return newData;
    }

    getComparison = (data, cardType) => {
        var theme = GetStyle(CurrTheme);
        var converted = this.convertData(data);

        if (this.props.number == 3) {
                return(
                <View style={ styles.threeContainer }>
                <View style={ theme.flexboxRow }>

                  <MaterialCommunityIcons color="#0B5091" size={20} name={icons[converted["comparators"][0]]}/>
                  <Text style={ styles.threeFont }>
                  {roundNumber(kWhComparison[converted["comparators"][0]]* converted["total"])} {comparisons[converted["comparators"][0]]}
                  </Text>

                </View>
                <View style={[ theme.flexboxRow ]}>

                  <MaterialCommunityIcons color="#0B5091" size={20} name={icons[converted["comparators"][1]]}/>
                  <Text style={ styles.threeFont }>
                  {roundNumber(kWhComparison[converted["comparators"][1]]* converted["total"])} {comparisons[converted["comparators"][1]]}
                  </Text>

                </View>
                <View style={[ theme.flexboxRow ]}>

                  <MaterialCommunityIcons color="#0B5091" size={20} name={icons[converted["comparators"][2]] }/>
                  <Text style={ styles.threeFont }>
                  {roundNumber(kWhComparison[converted["comparators"][2]]* converted["total"])} {comparisons[converted["comparators"][2]]}
                  </Text>

                </View>
                </View>
                );
         } else if (this.props.number == 1) {
                if (cardType === "use") {
                    return(
                        <View style={ styles.oneContainer }>

                        <View style={ styles.divider }></View>

                        <View style={[theme.centered, {padding: '2%'}]}>

                        <Text style={[ theme.fontBold ]}> Total: </Text>
                        <Text style={ styles.oneFont }>
                            {roundNumber(converted["total"])} MWh in the last hour
                        </Text>
                        <Text style={[ theme.fontBold ]}> Compare to... </Text>

                        <View style={[ theme.flexboxRow ]}>

                          <MaterialCommunityIcons color="#0B5091" size={20} name={icons[converted["comparators"][0]]}/>
                          <Text style={ styles.oneFont }>
                          {roundNumber(kWhComparison[converted["comparators"][0]]* converted["total"])} {comparisons[converted["comparators"][0]]}
                          </Text>

                        </View>
                        </View>
                        </View>
                        );
                } else {
                    return(
                        <View style={ styles.oneContainer }>
                        <View style={ styles.divider }>
                        </View>
                        <View style={[theme.centered, {padding: '2%'}]}>

                        <Text style={[ theme.fontBold ]}> Compare to... </Text>

                        <View style={[ theme.flexboxRow ]}>

                          <MaterialCommunityIcons color="#0B5091" size={20} name={icons[converted["comparators"][0]]}/>
                          <Text style={ styles.oneFont }>
                          {roundNumber(kWhComparison[converted["comparators"][0]]* converted["total"])} {comparisons[converted["comparators"][0]]}
                          </Text>

                        </View>
                        </View>
                        </View>
                        );
                }
            }
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
//        width: moderateScale(300),
//        height: moderateScale(40)
    },

    oneFont: {
        fontSize: moderateScale(12),
        padding: '3%',
        color: '#647C92',
    },

    threeContainer: {
        flex: 1,
        width: moderateScale(255),
        height: moderateScale(50 * 3),
        paddingLeft: '5%',
        paddingRight: '3%'
    },

    threeFont: {
        fontSize: moderateScale(12),
        flexWrap: 'wrap',
        padding: '5%',
        color: '#647C92'
    },
})