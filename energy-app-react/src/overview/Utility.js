import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import CurrFont from './../styling/CurrentFont';
import { moderateScale } from './../helpers/Scaling';
const defaultFont = CurrFont+'-regular';
const defaultFontBold = CurrFont+'-bold';

export default class Utility extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);

        return (
             <TouchableHighlight
                underlayColor="transparent"
                onPress={()=> this.props.callback(this.props.index)}>

                <View style={this.props.selected == this.props.index ?
                                [styles.card, themeStyles.carletonBlueBackground,
                                    themeStyles.centered] :
                                [styles.card, themeStyles.centered, {backgroundColor: 'white',
                                                                             borderColor: '#e1e8ee',}]}>

                    <FontAwesome name={this.props.icon} size={moderateScale(14)} style={styles.icon}
                        color={this.props.selected == this.props.index ? "white" : "#0B5091"}/>

                    <Text style={this.props.selected == this.props.index ?
                                 styles.textFocused : styles.text}>
                        {this.props.utilityType}
                    </Text>

                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderWidth: 1,
        borderRadius: 10,
        padding: moderateScale(12),
        margin: moderateScale(15),
        marginTop: moderateScale(10),
        marginBottom: 0,
    },

    icon: {
        marginTop: '10%',
        marginBottom: '10%',
    },

    text: {
        color: '#0B5091',
        fontFamily: defaultFont,
        fontSize: moderateScale(10),
    },

    textFocused: {
        color: 'white',
        fontFamily: defaultFont,
        fontSize: moderateScale(10),
    },
})