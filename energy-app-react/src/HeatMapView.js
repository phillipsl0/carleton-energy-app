import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
/*
Google API Key:
AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI 
*/
const apiGoogleKey = 'AIzaSyA2Q45_33Ot6Jr4EExQhVByJGkucecadyI';
var {screen_height, screen_width} = Dimensions.get('window');

/*
Using tutorials:
https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
Polygon onPress: https://snack.expo.io/H1L9ClUGW
*/

class HeatMapView extends Component {
  constructor(props) {
    super(props);
    
    // Turn fixed regions into state
    this.state = {
      polygons: [
        {
          coordinates: [
            {latitude: 44.461528, longitude: -93.153344}, // NE
            {latitude: 44.461528, longitude: -93.153509}, // NW
            {latitude: 44.461245, longitude: -93.153505}, // SW
            {latitude: 44.461245, longitude: -93.153342} // SE
          ],
          id: "Old Music Hall",
          open: false,
          color: "yellow" // change based on data
        },
        {
          coordinates: [
            {latitude: 44.46012211, longitude: -93.15711826}, //NE
            {latitude: 44.46012211, longitude: -93.15734357}, //NW
            {latitude: 44.45973158, longitude: -93.15734357}, //SW
            {latitude: 44.45973158, longitude: -93.15711826} //SE
          ],
          id: "Musser",
          open: false,
          color: "blue",
        },
        {
          coordinates: [
            {latitude: 44.46060358, longitude: -93.15181822}, //NE - lower theater
            {latitude: 44.4606055, longitude: -93.15172836}, //SE - lower theater
            {latitude: 44.46075865, longitude: -93.15172836}, //NE - upper theater
            {latitude: 44.46075865, longitude: -93.1519644}, //NW - upper theater
            {latitude: 44.46072993, longitude: -93.1519644}, //SW - lower theater
            {latitude: 44.46072993, longitude: -93.15201804}, //NW - upper outer
            {latitude: 44.46066484, longitude: -93.15201938}, //SW - upper outer
            {latitude: 44.46066389, longitude: -93.1519644}, //NW - upper inner
            {latitude: 44.4603997, longitude: -93.1519644}, //SW - lower inner
            {latitude: 44.4603997, longitude: -93.15200865}, //NW - lower inner
            {latitude: 44.46032408, longitude: -93.15200865}, //SW - lowest
            {latitude: 44.46032408, longitude: -93.15181822} //SE - lowest
          ],
          id: "Norse",
          open: false,
          color: "lightgreen",
        },
        {
          coordinates: [
            {latitude: 44.45949419, longitude: -93.15014988}, //NE
            {latitude: 44.45949419, longitude: -93.15048516}, //NW
            {latitude: 44.45923, longitude: -93.15048516}, //SW
            {latitude: 44.45923, longitude: -93.15014988} //SE
          ],
          id: "Watson",
          open: false,
          color: "lightblue",
        },
      ],
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
      // Update region if within bounds
      this.prev_state.region = region;
    // If user scrolls beyond Carleton's region, revert back to previous state
    } else {
      this.refs.map.animateToRegion(this.prev_state.region);
      //this.setState(this.prev_state.region);
    }
  }

  /* iOS Bug: onPress doesn't work if provider=... enabled!! */
  // See issue: https://github.com/airbnb/react-native-maps/issues/1447
  onPolygonPress(polygon) {
    console.log('onPress');
  }

  toggle(polygon) {
    console.log('onPress', polygon.id);

    // if (polygon.open) {
    //   polygon.marker.hideCallout();
    // } else {
    //   polygon.marker.showCallout();
    // }

    // polygon.open = !polygon.open;
  }

  render() {
    //let coords = this.state.polygons.polygon.coordinates
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
              {this.state.polygons.map((polygon, index) => (
                /* Renders polygons from list */
                <View key={polygon.id}>
                  <Polygon
                    coordinates={polygon.coordinates}
                    // sets color + fill + width
                    strokeWidth={5}
                    strokeColor={polygon.color}
                    fillColor={polygon.color}
                    onPress={() => this.toggle(polygon)}
                  />
                </View>
              ))}
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