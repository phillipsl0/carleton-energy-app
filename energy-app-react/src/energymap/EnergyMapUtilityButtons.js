import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Heading, Overlay, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements'
import { moderateScale } from './../helpers/Scaling';
import CurrFont from './../styling/CurrentFont';
const defaultFont = CurrFont+'-regular';

//const UTILITIES = getUtilitiesList();
// const UTILITIES = ['Gas', 'Electric', 'Heat', 'Water'];
const UTILITIES = ['Total', 'Gas', 'Electric', 'Water'];


// Class for individual buttons
class UtilityButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    }
  }

  render() {
    const selected = this.props.selected.toLowerCase();
    const utility = this.props.utility.toLowerCase();

    return (
        <Button
          key={utility}
          title={this.props.utility}
          onPress={() => this.props.onPress(utility)}
          backgroundColor={selected == utility ? '#0B5091' : 'white'}
          color={selected ==  utility ? 'white' : '#0B5091'}
          textStyle={ styles.text }
          buttonStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#e1e8ee' }} // style based off of UtilitiesMiniCards
        />
      )
  }
}


// Generates all horizontal buttons that fill the screen, side by side
class TopUtilities extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onUtilitySelect, selected } = this.props;
    return (
      <View style={styles.container}>
        {UTILITIES.map(utility => (
          <View style={styles.buttonContainer} key={utility + " bottom view"}>
            <UtilityButton
              utility={utility}
              onPress={() => onUtilitySelect(utility)}
              selected={selected}
            />
          </View>
        ))}
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    position: 'absolute'
  },
  buttonContainer: {
    flex: 1,
  },
  activeButton: {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'blue',
  },
  inactiveButton: {
  	textAlign: 'center',
    color: 'blue',
    backgroundColor: '#ffffff'
  },
  text: {
    fontFamily: defaultFont,
    fontSize: moderateScale(10),

  }
});

export default TopUtilities;