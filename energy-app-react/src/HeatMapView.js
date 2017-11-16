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
      polygons: {
        polygon: {
          coordinates: [],
          id: "Music Hall"
        }
      },
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
      polygons: {
        polygon: {
          coordinates: [
            {latitude: 44.461520, longitude: -93.153344},
            {latitude: 44.461528, longitude: -93.153488},
            {latitude: 44.461251, longitude: -93.153488},
            {latitude: 44.461245, longitude: -93.153342}
          ],
          id: "Music Hall"
        }
      },
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
      this.refs.map.animateToRegion(this.prev_state.region);
      //this.setState(this.prev_state.region);
    }
  }

  render() {
    let coords = this.state.polygons.polygon.coordinates
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
            ref="map"
            provider = { PROVIDER_GOOGLE } // show buildings on OS
            style={styles.map}
            showsTraffic={false}
            //zoomEnabled={false} // stops user from zooming
            
            loadingEnabled // shows loading indicator while map loads
            loadingIndicatorColor="#666666"
            loadingBackgroundColor="#eeeeee"
            
            region={this.state.region}
            onRegionChange={this.onRegionChange}>
              <MapView.Polygon
                key="Old Music Hall"
                coordinates={[
                  {latitude: 44.461528, longitude: -93.153344}, // NE
                  {latitude: 44.461528, longitude: -93.153509}, // NW
                  {latitude: 44.461245, longitude: -93.153505}, // SW
                  {latitude: 44.461245, longitude: -93.153342} // SE
                ]}
                //coordinates={ coords }
                strokeWidth={5}
                strokeColor="yellow"
                fillColor="yellow"
              />
          </MapView> 
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