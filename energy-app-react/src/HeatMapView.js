import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
/*
Google API Key:
AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI 
*/
const apiGoogleKey = 'AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI';
var {screen_height, screen_width} = Dimensions.get('window');

/*
Using tutorial: https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
*/

class HeatMapView extends Component {
  constructor(props) {
    super(props);
    // Turn fixed regions into state
    this.state = {
      // Initial region is Carleton's coordinates
      region: {
        // Carleton's coordinates
        latitude: 44.46107356,
        longitude: -93.1542989,
        latitudeDelta: 0.003861, //0.00475503 previously
        longitudeDelta: 0.003916, //0.004325397 previously
      }
    };
    // Holder for previous state to help control scrolling
    this.prev_state = {
      region: {
        // Carleton's coordinates
        latitude: 44.46107356,
        longitude: -93.1542989,
        latitudeDelta: 0.003861, //0.00475503 previously
        longitudeDelta: 0.003916, //0.004325397 previously
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  // Tracks map position as user scrolls and zooms
  onRegionChange(region) {
    // Check to make sure region is within bounds of Carleton
    if (((region.latitude <= 44.46316089) && (region.latitude >= 44.45690153)) && ((region.longitude <= -93.14903207) && (region.longitude >= -93.15727215))) {
      this.setState({ region });
      this.prev_state.region = region;
    // Limits to previous state
    } else {
      this.setState(this.prev_state.region);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'white', height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Text>
            Latitude: {this.state.region.latitude}{'\n'}
            Longitude: {this.state.region.longitude}{'\n'}
            LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
            LongitudeDelta: {this.state.region.longitudeDelta}
          </Text>
        </View>
        <View style={styles.container}>
          <MapView
            provider = { PROVIDER_GOOGLE }
            style={styles.map}
            showsTraffic={false}
            //showsBuildings={true}
            zoomEnabled={false} // stops user from zooming
            loadingEnabled={true} // shows loading indicator while map loads
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          /> 
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screen_width,
    height: screen_height
  }
});

export default HeatMapView;