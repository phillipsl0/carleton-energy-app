import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

// Special header for HeatMap's StackNavigator
export default class HeatMapHeader extends Component {
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
      + currDate.getDate() + "/"
      + (currDate.getMonth()+1) + "/"
      + currDate.getFullYear();
    return currTime
  }

  render() {
    return (
      <View style={navStyles.header}>
        <Text style={navStyles.titleText}>
        Heat Map
        </Text>
        <Text style={navStyles.subTitleText}>
        Last updated: {this.getTime()}
        </Text>
      </View>
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