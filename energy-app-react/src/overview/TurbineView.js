import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';


import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';

@connect(
    state => ({
        layout: state.ui.layout,
        currentData: state.data.currentData,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_LAYOUT'}),
    }),
)

export default class Windmill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currImage: 0,
            pause: 0,
        };

    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        const { layout, currentData } = this.props;
        var turbineTotal = Math.round(currentData.turbine[0]["y"]+currentData.turbine[1]["y"]);

        return (
            <View style={[themeStyles.flex, styles.main]}>
                <Image source={require('./../assets/windmill.png')}
                    style={[themeStyles.header, styles.image]}/>
                <View style={styles.textContainer}>
                <Text style={[styles.units, themeStyles.fontRegular]}>
                    Currently generating
                </Text>
                <Text style={[styles.number, themeStyles.fontBold]}>
                    {turbineTotal}
                </Text>
                <Text style={[styles.units, themeStyles.fontRegular]}>
                    kW/h
                </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        marginLeft: '2%',
        marginTop: '15%',
        width: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        fontSize: 75,
        backgroundColor: 'transparent',
        color: 'white',
    },
    units: {
        fontSize: 20,
        backgroundColor: 'transparent',
        color: 'white',
    },
    image: {
        height: 300,
        left: -2,
        opacity: 0.9,
        ...Platform.select({
            android: {
                width: 415,
                height: 350,
            }
        }),
    },
    main: {
        alignItems: 'center',
        backgroundColor: '#E1E8EE',
    }
})