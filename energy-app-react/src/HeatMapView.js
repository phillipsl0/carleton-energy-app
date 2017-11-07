import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
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
        latitudeDelta: 0.00475503,
        longitudeDelta: 0.004325397,
      }
    };
    // Holder for previous state to help control scrolling
    this.prev_state = {
      region: {
        // Carleton's coordinates
        latitude: 44.46107356,
        longitude: -93.1542989,
        latitudeDelta: 0.00475503,
        longitudeDelta: 0.004325397,
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  // Called when location/zoom are changed with new location/zoom
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
      <View style={styles.container}>
        <MapView style={styles.map}
          showsTraffic={false}
          showsBuildings={true}
          zoomEnabled={false} // stops user from zooming
          loadingEnabled={true} // shows loading indicator while map loads
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
        <View style={{ flex: 1 }}>
          <Text>
            Latitude: {this.state.region.latitude}{'\n'}
            Longitude: {this.state.region.longitude}{'\n'}
            LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
            LongitudeDelta: {this.state.region.longitudeDelta}
          </Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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