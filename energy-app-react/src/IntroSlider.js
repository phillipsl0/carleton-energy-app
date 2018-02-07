import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

// List of icons: https://oblador.github.io/react-native-vector-icons/
// Slides shown in intro
const slides = [
  {
    key: 'somethun',
    title: 'Quick setup, good defaults',
    text: 'React-native-app-intro-slider is easy to setup with a small footprint and no dependencies. And it comes with good default layouts!',
    icon: 'ios-images-outline',
    color: '#63E2FF',
    type: 'ionicon'
  },
  {
    key: 'somethun1',
    title: 'Super customizable',
    text: 'The component is also super customizable, so you can adapt it to cover your needs and wants.',
    icon: 'ios-options-outline',
    color: '#A3A1FF',
    type: 'ionicon'
  },
  {
    key: 'somethun2',
    title: "There's a heatmap!",
    text: "Feel free to use it",
    icon: 'ios-sunny-outline',
    color: '#29ABE2',
    type: 'ionicon'
  },
];

// Documentation: https://github.com/Jacse/react-native-app-intro-slider
export default class IntroSlider extends Component {
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
      <View style={styles.mainContent}>
      { this.state.visible &&
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
        />
      }
      </View>
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