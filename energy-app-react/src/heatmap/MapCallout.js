import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, } from 'react-native';
import { Button } from 'react-native-elements';


//Callout styling tutorial: https://rationalappdev.com/santas-map-app-with-react-native/
// Open source icons: https://material.io/icons/#ic_local_florist

/*
            <Image
              style={styles.infoIcon}
              source={require('./../assets/infoCircleIcon.png')}
            />
*/

export default class MapCallout extends Component {
  render() {
    const { name, image, number } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.number}>{number}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, }}>
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
    padding: 15,
    width: 135,
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
  },
  // Wedge icon
  icon: {
    fontSize: 30,
    color: '#0B5091',
  }
});