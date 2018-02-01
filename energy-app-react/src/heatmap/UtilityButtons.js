import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Heading, Overlay, TouchableHighlight } from 'react-native';
import { getCurrentBuildingUtilityConsumption, getUtilitiesList } from './../helpers/ApiWrappers.js';
import { Button } from 'react-native-elements'

const UTILITIES = getUtilitiesList();

class UtilityButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    }
  }

  render() {
    console.log("Utility selected: ", this.props.selected);
    return (
        <Button
          key={this.props.utility}
          title={this.props.utility}
          onPress={() => this.props.onPress(this.props.utility)}
          backgroundColor={this.props.selected ==  this.props.utility ? '#0B5091' : 'white'}
          color={this.props.selected ==  this.props.utility ? 'white' : '#0B5091'}
        />
      )
  }
}


// Generates horizontal buttons that fill the screen, side by side
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
  }
});

export default TopUtilities;