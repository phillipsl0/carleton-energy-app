import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {GetStyle} from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';

// Timestamp for EnergyMap's Update
export default class EnergyMapTimestamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currDate: new Date()
    }
  }

  // Returns time in string format
  getTime() {
    var currDate = new Date();
    var currTime = currDate.getHours() + ":"
      + currDate.getMinutes() + ":"
      + currDate.getSeconds() + ", "
      + (currDate.getMonth()+1) + "/"
      + currDate.getDate() + "/"
      + currDate.getFullYear();
    return currTime
  }

  render() {
    var themeStyles = GetStyle(CurrTheme);

    return (
      <View style={styles.container}>
      <Text style={styles.text}>
        Last updated: {this.getTime()}
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      position: "absolute",
      bottom: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      color: "black",
      fontSize: 15,
      alignSelf: 'center',
      padding: 5,
    }
})