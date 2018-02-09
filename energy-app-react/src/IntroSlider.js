import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

// List of icons: https://oblador.github.io/react-native-vector-icons/
// Slides shown in intro
const slides = [
  {
    key: 'Welcome',
    title: "Welcome to our comps",
    text: "You can see Carleton's energy usage! Ever wondered how much energy the wind turbine is using at any given point? Now you can find out! Yay comps! Jeff is awesome! Martha is amazing!",
    icon: 'tree',
    color: '#00b33c',
    type: 'entypo'
  },
  {
    key: 'Buildings',
    title: "Compare buildings energy usage",
    text: 'Ever wondered what buildings use the most energy? Burton or Sayles? Watson or Cassat? Check out the building comparison screen!',
    icon: 'ios-options-outline',
    color: '#A3A1FF',
    type: 'ionicon'
  },
  {
    key: 'Heatmap',
    title: "There's a heatmap!",
    text: "See which buildings are using the most energy on campus in this moment. Red is bad! Green is good! Yay sustainability!",
    icon: 'ios-sunny-outline',
    color: '#29ABE2',
    type: 'ionicon'
  },
];

// Documentation: https://github.com/Jacse/react-native-app-intro-slider
export default class IntroSlider extends Component {
  constructor(props) {
    super(props);
  }

  // Renders slide
  _renderItem = props => (
    <View
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
        backgroundColor: props.color
      }]}
    >
      <Icon
        style={{ backgroundColor: 'transparent' }}
        name={props.icon}
        size={200}
        color="white"
        type={props.type}
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );

  // Renders next button
   _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="ios-arrow-round-forward-outline"
          color="rgba(255, 255, 255, .9)"
          size={35}
          style={{ backgroundColor: 'transparent' }}
          type="ionicon"
        />
      </View>
    );
  }

  // Handles done press on intro screen
  _onDone = () => {
    //console.log("Done button was pressed!")
    this.props.onDone(true);
  }
  
  // Renders checkmark button at final slide
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="ios-checkmark-outline"
          color="rgba(255, 255, 255, .9)"
          size={35}
          style={{ backgroundColor: 'transparent' }}
          type="ionicon"
        />
      </View>
    );
  }

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        showSkipButton
        onDone={this._onDone}
        onSkip={this._onDone}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});