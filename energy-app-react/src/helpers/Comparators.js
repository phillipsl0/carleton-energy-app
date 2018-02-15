import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { moderateScale, verticalScale } from './../helpers/Scaling';
import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';

// all equivalencies from https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator
/*
1 Megawatt Hour (MWh) = 1,000 Kilowatt Hours (KWh)
1 Kilowatt Hour = 3,413 British Thermal Units (BTUs)
1 Metric Tonne = 2,204.6 Pounds
1 Pound = 0.00045 Metric Tonnes
1 Short Ton = 2,000 Pounds
1 Short Ton = 0.90719 Metric Tonnes
1 Therm = 100 Cubic Feet
1 CCF = Abbreviation for 100 Cubic Feet
1 CCF = 1.024 Therms
*/
// 1 hamburger is 27 lbs of carbon aka 30 miles driven
// https://www.nytimes.com/2014/07/16/opinion/the-true-cost-of-a-burger.html
// 1 kwh ~= 1 lb co2

var comparisons = ["cars driven for 1 year", "miles driven by an average car", "tons of waste recycled instead of landfilled",
    "trucks of waste recycled instead of landfilled", "gallons of gasoline consumed", "lbs of coal burned",
    "tanker trucks worth of gasoline", "homes energy use for one year", "wind turbines running for a year",
    "homes electricity use for one year", "railcars worth of coal burned", "incandescent lamps switched to LEDs",
    "barrels of oil consumed", "propane cylinders used", "tree seedlings grown for 10 years",
    "hamburgers eaten"];

var icons = ["car", "car", "delete-empty", "delete-empty", "gas-station", "fire", "truck", "home-modern", "weather-windy",
    "home-modern", "train", "lightbulb-on-outline", "barrel", "gas-cylinder", "tree", "hamburger"];

// 1000 thms equivalent to ->
var thmComparison = [1.1, 12995, 1.8, 0.264, 597, 5801, 0.07, 0.573, 0.001, 0.795,
    0.029, 177, 12.3, 217, 137, 407];

// 1000 kWh equivalent to ->
var kWhComparison = [0.16, 1824, 0.259, 0.037, 83.7, 814, 0.01, 0.08, 0.0002, 0.112,
    0.004, 24.9, 1.7, 30.4, 19.3, 37];

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min
}

export default class Comparator extends Component {
    roundNumber = (num) => {
        return (Math.round((num + 0.00001) * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    getComparison = (data, unit) => {
        var styles = GetStyle(CurrTheme);

        var comparators = new Array(3);
        dataNumber = 0;

        for (var index=0; index<data.length; index++){
            dataNumber += data[index]["y"];
        }

        dataNumber = dataNumber/1000;

        for (var i=0; i<3; i++) {
            temp = getRandom(0, thmComparison.length);

            while (comparators.includes(temp)) {
                temp = getRandom(0, thmComparison.length);
            }

            comparators[i] = temp;
        }

        if (this.props.number == 3) {
            if (unit === "thm") {
                return (
                <View style={{ flex: 1, width: this.props.width, height: this.props.height }}>
                <View style={[ styles.flexboxRow, { width: this.props.width, height: this.props.height } ]}>
                  <MaterialCommunityIcons color="#0B5091" name={icons[comparators[0]]}/>
                  <Text style={{ fontSize: moderateScale(12), flexWrap: 'wrap' } }>
                    {thmComparison[comparators[0]]*dataNumber} + " " + {comparisons[comparators[0]]}
                  </Text>
                </View>
                <View style={[ styles.flexboxRow ]}>
                  <MaterialCommunityIcons color="#0B5091" name={icons[comparators[1]]}/>
                  <Text style={{ fontSize: moderateScale(12), flexWrap: 'wrap' } }>
                  {thmComparison[comparators[1]]*dataNumber} + " " + {comparisons[comparators[1]]}
                  </Text>
                </View>
                <View style={[ styles.flexboxRow ]}>
                  <MaterialCommunityIcons color="#0B5091" name={icons[comparators[2]]}/>
                  <Text style={{ fontSize: moderateScale(12), flexWrap: 'wrap' } }>
                  {thmComparison[comparators[2]]*dataNumber} + " " + {comparisons[comparators[2]]}
                  </Text>
                </View>
                </View>
                );
            } else if (unit === "kWh") {
                return(
                <View style={{ flex: 1, width: this.props.width, height: this.props.height, paddingLeft: '5%', paddingRight: '3%' }}>
                <View style={[ styles.flexboxRow]}>
                  <MaterialCommunityIcons color="#0B5091" size={20} name={icons[comparators[0]]}/>
                  <Text style={{ fontSize: moderateScale(12), flexWrap: 'wrap', padding: '5%', color: '#647C92' } }>
                  {this.roundNumber(kWhComparison[comparators[0]]*dataNumber)} {comparisons[comparators[0]]}
                  </Text>
                </View>
                <View style={[ styles.flexboxRow ]}>
                  <MaterialCommunityIcons color="#0B5091" size={20} name={icons[comparators[1]]}/>
                  <Text style={{ fontSize: moderateScale(12), flexWrap: 'wrap', padding: '5%', color: '#647C92' } }>
                  {this.roundNumber(kWhComparison[comparators[1]]*dataNumber)} {comparisons[comparators[1]]}
                  </Text>
                </View>
                <View style={[ styles.flexboxRow ]}>
                  <MaterialCommunityIcons color="#0B5091" size={20} name={icons[comparators[2]] }/>
                  <Text style={{ fontSize: moderateScale(12), flexWrap: 'wrap', padding: '5%', color: '#647C92' } }>
                  {this.roundNumber(kWhComparison[comparators[2]]*dataNumber)} {comparisons[comparators[2]]}
                  </Text>
                </View>
                </View>
                );
            }
         } else if (this.props.number == 1) {
            if (unit === "thm") {
                return(
                <View style={[ styles.flexboxRow ]}>
                  <MaterialCommunityIcons color="#0B5091" size={20} name={icons[comparators[0]]}/>
                  <Text style={{ fontSize: moderateScale(12), flexWrap: 'wrap', padding: '3%', color: '#647C92' } }>
                  {this.roundNumber(thmComparison[comparators[0]]*dataNumber)} {comparisons[comparators[0]]}
                  </Text>
                </View>
                );
            } else if (unit === "kWh"){
            return(
                <View style={[{backgroundColor: '#F5FCFF', paddingTop: '1%'}]}>
                <View style={[{borderTopColor: '#d3d3d3', borderTopWidth: 1, marginLeft: '5%', marginRight: '5%'}]}>
                </View>
                <View style={[styles.centered, {padding: '2%'}]}>
                <Text style={[ styles.fontBold ]}> Compare to... </Text>
                <View style={[ styles.flexboxRow ]}>
                  <MaterialCommunityIcons color="#0B5091" size={20} name={icons[comparators[0]]}/>
                  <Text style={{ fontSize: moderateScale(12), padding: '3%', color: '#647C92' } }>
                  {this.roundNumber(kWhComparison[comparators[0]]*dataNumber)} {comparisons[comparators[0]]}
                  </Text>
                </View>
                </View>
                </View>
                );
            }
         }
    }

    render() {
        comparison = this.getComparison(this.props.data, this.props.unit);

        return(
            <View>
            {comparison}
            </View>
        );
    }
}