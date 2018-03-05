/* EnergyMapTimestampjs
 * Written by Veronica Child for Energy App Comps, 2018
 * Generates time in 24 hour format for energy map update
 */

import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


@connect(
    state => ({
        ui: state.ui,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_GRAPH_DATA'}),
    }),
)
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
    const { ui } = this.props;
    const { width, height } = ui.layout;
    var marginRight = "0%";

    if (height < 600) {
        marginRight = '10%';
    }

    return (
      <View style={[styles.container, { marginRight: marginRight}]}>
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