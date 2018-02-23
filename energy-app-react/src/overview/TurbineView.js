/* TurbineView.js
 * Written by Liv Phillips for Energy App Comps, 2018
 * Second level detail for Turbine, provides data on how much the turbine is currently generating, the percent of overall
 * energy that is, how much energy the turbine is consuming, and the weekly high for turbine energy production.
 */

import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Platform, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';


import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import { turbineLabels } from './OverviewExampleData'
import { moderateScale, verticalScale, roundNumber, getSpecificRandom } from './../helpers/General';
import CurrFont from './../styling/CurrentFont';

const defaultFont = CurrFont+'-regular';
const defaultFontBold = CurrFont+'-bold';
const theme = GetStyle(CurrTheme);

@connect(
    state => ({
        currentData: state.data.currentData,
        totals: state.data.currentTotals,
        windSpeed: state.data.windSpeed,
        windRatio: state.data.windRatio,
        loading: state.loading,
        turbine: state.api.turbineData,
        solar: state.api.solarData,
        ui: state.ui,
    }),
)

export default class Windmill extends Component {
    constructor(props) {
        super(props);
    }

    /* Returns the titles for the turbine view, based on current information */
    fetchData = (low) => {
        var rightTitles = new Array(4);
        rightTitles[0] = this.props.windRatio["percentage"] + "%";
        rightTitles[1] = this.props.windSpeed + " mps";
        rightTitles[2] = roundNumber(getSpecificRandom(2, low, 1, 1)) + " kW";
        rightTitles[3] = roundNumber(getSpecificRandom(low+132, low+1000, 1, 1)) + " kW";
        return rightTitles;
    }

    render() {
        const { currentData, totals, windSpeed, windRatio, turbine, ui, solar } = this.props;
        const { width, height } = ui.layout;
        var rightTitles = this.fetchData(turbine);

        var padding = '5%';
        if (height < 600) {
            padding = '4%';
        }

        return (
            <View style={[styles.main, { position: 'absolute', bottom: 0}]}>
                <ImageBackground source={require('./../assets/images/windmillFull.png')}
                    resizeMode="cover"
                    style={[{ width: width + 5, height: width*.8}, styles.image, styles.head]}>
                <Text style={[styles.units, theme.fontRegular]}>
                    Currently generating
                </Text>
                <Text style={[styles.number, theme.fontBold]}>
                    {roundNumber(turbine)}
                </Text>
                <Text style={[styles.units, theme.fontRegular]}>
                    kW
                </Text>
                </ImageBackground>
                <List style={[styles.list]}>
                  {
                    turbineLabels.map((item, i) => (
                      <ListItem
                        containerStyle={[ styles.listItem, { paddingTop: padding, paddingBottom: padding }]}
                        key={i}
                        title={item.title}
                        rightTitle={rightTitles[item.index]}
                        rightTitleStyle={{ color: '#647C92' }}
                        rightTitleContainerStyle={{ flex: 0.75 }}
                        hideChevron={true}
                        fontFamily={defaultFontBold}
                        leftIcon={{name: item.icon, type: item.type, color: '#647C92'}}
                      />
                    ))
                  }
                </List>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        marginLeft: '2%',
        marginTop: '15%',
        width: moderateScale(320),
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        fontSize: moderateScale(70),
        backgroundColor: 'transparent',
        color: 'white',
    },
    units: {
        fontSize: moderateScale(20),
        backgroundColor: 'transparent',
        color: 'white',
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        left: '-1%',
        top: '-3%'
    },

    main: {
        backgroundColor: '#E1E8EE',
    },
    head: {
        ...Platform.select({
            android: {
                height: verticalScale(290),
                top: '-5%'
            }
        })
    },
    list: {
        marginTop: '-3%',
        backgroundColor: '#E1E8EE',
        ...Platform.select({
            ios: {
                paddingTop: '0%',
            }
        })
    },

    listItem: {
        backgroundColor: '#E1E8EE',
        paddingTop: '4%',
        paddingBottom: '4%',
        paddingRight: '4%',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,

    },

})