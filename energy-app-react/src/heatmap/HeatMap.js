import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Callout } from 'react-native-maps';

import buildings from './../Buildings'
import { getCurrentBuildingUtilityConsumption, getUtilitiesList } from './../helpers/ApiWrappers.js';
import HeatMapView from './HeatMapView'
import BottomUtilities from './Utilities';
import IndividualBuilding from './../IndividualBuilding'
import MapCallout from './MapCallout';


class HeatMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      utilityShown: 'electricity',
    };
  }

  componentWillMount() {
    let region = {
        latitude: 44.4606925434,
        longitude: -93.1533574685,
        latitudeDelta: 0.005223853, //0.00475503 > 0.003861 previously
        longitudeDelta: 0.0086313486, //0.004325397 > 0.003916 previously
    }
    this.onRegionChange(region);
    console.log("Component mounted", this.state.mapRegion);
  }

  componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
  }

  updateUtility = (utilitySelected) => {
    console.log("Utility selected:", utilitySelected);
    this.setState({ utilityShown: utilitySelected});
    console.log("Displaying utility: ", this.state.utilityShown);
  }

  onRegionChange(region) {
        this.setState({
            mapRegion: region,
        });
  }

  // Show callout when building polygon is pressed
  toggleCallout(polygon) {
    console.log('onPress', polygon.name);
    this.setState({lastBuildingPressed: polygon.name})

    if (polygon.open) {
      polygon.marker.hideCallout();
    } else {
      polygon.marker.showCallout();
    }

    polygon.open = !polygon.open;
  }

  render() {
    return (
        <View style={styles.container}>
            <HeatMapView
              key={this.state.utilityShown} // key change needed to rerender map
              displayUtility={this.state.utilityShown}
              onRegionChange={this.onRegionChange.bind(this)}
              //toggleCallout={this.toggleCallout.bind(this)}
            />
            <BottomUtilities onUtilitySelect={this.updateUtility} />
        </View>
    );
  }
}

const HeatMapStack = StackNavigator({
  HeatMapView: {
    screen: HeatMap,
    navigationOptions: ({ navigation }) => ({
      title: "Heat Map",
      headerTintColor: 'white',
      headerStyle: navStyles.header,
    })
  },
  // HeatBuildingView: {
  //   screen: IndividualBuilding,
  //   path: 'buildings/:name',
  //   navigationOptions: ({ navigation }) => ({
  //     title: `${navigation.state.params.item.name}`,
  //     headerTintColor: 'white',
  //     headerStyle: navStyles.header,
  //   }),
  // },
});

const navStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0B5091',
    }
})


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});


export default HeatMapStack;