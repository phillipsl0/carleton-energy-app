import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

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
    return (
      <Text style={navStyles.subTitleText}>
      Last updated: {this.getTime()}
      </Text>
    );
  }
}

const navStyles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#0B5091',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
      color: "white",
      //fontWeight: "bold",
      fontSize: 17,
      alignSelf: 'center',
    },
    subTitleText: {
      color: "white",
      fontSize: 15,
    }
})