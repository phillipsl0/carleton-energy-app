/* MapCallout.js
 * Written by Veronica Child for Energy App Comps, 2018
 * Callout on Energy Map that displays name of building and current utility consumption.
 * Directs to Individual Building Card associated with building name when tapped
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, } from 'react-native';
import { Button } from 'react-native-elements';
import { getUnits } from './../helpers/General';

export default class MapCallout extends Component {
  render() {
    const { name, image, number, utility } = this.props;
    
    var units = getUnits(utility);


    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text>
            <Text style={styles.number}>{number}</Text>
            <Text style={styles.unit}> {units}</Text>
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, }}>
            <Text style={styles.icon}> > </Text>
          </View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  // Callout bubble
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  // Building name
  name: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  // Building number
  number: {
    fontSize: 30,
    color: '#0B5091',
  },
  // Wedge icon
  icon: {
    fontSize: 30,
    color: '#0B5091',
  },
  // Unit next to number
  unit: {
    fontSize: 16,
    color: '#0B5091',
  }
});