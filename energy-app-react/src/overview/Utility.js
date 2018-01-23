import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';

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
                                 themeStyles.shadowed, themeStyles.centered] :
                                [styles.card, themeStyles.card,
                                 themeStyles.shadowed, themeStyles.centered]}>

                    <FontAwesome name={this.props.icon} size={50} style={styles.icon}
                        color={this.props.selected == this.props.index ? "white" : "#0B5091"}/>

                    <Text style={this.props.selected == this.props.index ?
                                 styles.textFocused : styles.text}>
                        {this.props.utilityType}
                    </Text>

                    <Text style={this.props.selected == this.props.index ?
                                 styles.subFocused : styles.sub}>
                        {this.props.number}
                        {this.props.unit}
                    </Text>

                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: 125,
        height: 125,
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },

    icon: {
        marginTop: '10%',
        marginBottom: '10%',
    },

    sub: {
        color: '#9E9E9E',
        fontWeight: 'bold',
        fontSize: 12,
    },

    subFocused: {
        color: 'white',
        fontSize: 12,
    },

    text: {
        color: '#0B5091',
        fontSize: 15,
    },

    textFocused: {
        color: 'white',
        fontSize: 15,
    },
})